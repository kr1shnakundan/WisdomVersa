import { useEffect, useMemo, useRef, useState } from 'react'
import { TbPointerSearch } from 'react-icons/tb'
import { UseSearchData } from './UseSearchData'
import { MdOutlineClose } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import FilterBar from './FilterSearch'
import { FaSearch } from 'react-icons/fa'

const MAX_SUGGESTIONS = 7

// helpers
const normalize = s => String(s || '').trim().toLowerCase()

export default function CourseCategorySearch () {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [message, setMessage] = useState('')
  const [filters, setFilters] = useState({
    category: false,
    created_At: false,
    price: false
  })

  const wrapRef = useRef(null)
  const navigate = useNavigate()

  // for setting the input button in focus on clicking cross icon
  const inputRef = useRef(null)

  const { courses, categories, createFuse, combined } = UseSearchData()

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const filterResults = useMemo(() => {
    const q = query.trim()
    if (!q || !combined.length) {
      return []
    }

    const fuse = createFuse(filters)
    if (!fuse) return []

    let searchResult = fuse.search(q).slice(0, MAX_SUGGESTIONS).map(r => r.item)
    if (filters.category) {
      searchResult = searchResult.filter(item => {
        if (item.kind === 'category') return true
        return normalize(item.categoryName) && normalize(item.categoryName).includes(normalize(q))
      })
    }

    if (filters.price) {
      searchResult = searchResult.filter(item => {
        if (item.kind === 'category') return false
        return item.price !== undefined && item.price !== null
      })

      searchResult.sort((a, b) => {
        return a.price - b.price
      })
    }

    if (filters.created_At) {
      searchResult = searchResult.filter(item => {
        if (item.kind === 'category') return false
        return item.createdAt !== undefined && item.createdAt !== null
      })

      searchResult.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        return dateB - dateA
      })
    }

    return searchResult
  }, [query, combined, filters, createFuse])

  useEffect(() => {
    function onDocMouseDown (e) {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  function pick (item) {
    setQuery(item.label)
    setOpen(false)
    setActiveIndex(-1)
    setMessage('')

    if (item.kind === 'course') navigate(`/courses/${item.id}`)
    if (item.kind === 'category') navigate(`/catalog/${item.label}`)
  }

  function findExactMatch (q) {
    const nq = normalize(q)

    const exactCourse = courses.find(c => normalize(c.courseName) === nq)
    if (exactCourse) return { kind: 'course', id: exactCourse.id, label: exactCourse.courseName }

    const exactCategory = categories.find(c => normalize(c.categoryName) === nq)
    if (exactCategory) return { kind: 'category', id: exactCategory.id, label: exactCategory.categoryName }

    return null
  }

  function onEnter () {
    const q = query.trim()
    if (!q) return

    const exact = findExactMatch(q)

    if (exact) {
      pick(exact)
      setMessage('')

      // if (exact.kind === 'course') navigate(`/course/${exact.id}`)
      // else navigate(`/catalog/${exact.id}`)

      // For now just show confirmation:
      setMessage(`Found ${exact.kind}: ${exact.label}`)
      setOpen(false)
      return
    }

    // Not found: show message + keep dropdown open with related suggestions
    if (filterResults.length > 0) {
      setMessage('Could not find exact course/category. Showing close matches...')
      setOpen(true)
      setActiveIndex(-1)
    } else {
      setMessage('Could not find course/category.')
      setOpen(false)
    }
  }

  function onKeyDown (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnter()
      return
    }

    if (!open) return

    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => Math.min(prev + 1, filterResults.length - 1))
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => Math.max(prev - 1, 0))
    }
  }

return (
  <div className='w-full max-w-2xl' ref={wrapRef}>
    <div className='flex items-center'>
      <div className='relative w-[250px]'>
        <div className='flex w-[250px] items-center gap-1 border rounded-full border-richblack-700 bg-richblack-800'>
          <input
            className='w-full rounded-full outline-none bg-transparent my-2 px-4 text-sm text-richblack-5
           placeholder:text-richblack-400 placeholder:text-sm'
            placeholder='course or category...'
            value={query}
            ref={inputRef}
            onChange={e => {
              setQuery(e.target.value)
              setOpen(true)
              setActiveIndex(-1)
              setMessage('')
            }}
            onFocus={() => {
              setOpen(true)
              setMessage('')
            }}
            onKeyDown={onKeyDown}
          />
          {
          query.length > 0 ? (
            <MdOutlineClose
              size={18}
              className='text-richblack-300 hover:text-richblack-100 cursor-pointer transition-colors'
              onClick={() => {
                setQuery('')
                focusInput()
              }}
            />
          ) : (<div className='px-2'></div>)
        }
          <FaSearch
            size={40}
            onClick={onEnter}
            className='text-richblack-300 hover:text-richblack-100 cursor-pointer border-l border-richblack-700 ml-1 px-2 transition-all duration-200 ease-in-out hover:scale-105'
          />
        </div>

        {open && query.length >0 && (
          <div className='absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg bg-richblack-800 border border-richblack-700 shadow-xl'>

            {message && (
              <div className='z-10 border-b border-richblack-700 m-2 px-4 py-2 text-sm text-richblack-300'>
                {message}
              </div>
            )}

            {filterResults.length > 0
              ? (
                  filterResults.map((item, idx) => (
                    <button
                      type='button'
                      key={`${item.kind}:${item.id}`}
                      className={[
                        'w-full px-4 py-3 text-left transition-colors',
                        idx === activeIndex ? 'bg-richblack-700' : 'hover:bg-richblack-700'
                      ].join(' ')}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => pick(item)}
                    >
                      <div className='flex items-center justify-between gap-4'>
                        <div className='font-medium text-richblack-5'>{item.label}</div>
                        <span className='text-xs text-richblack-400 bg-richblack-900 px-2 py-1 rounded'>
                          {item.kind === 'course' ? 'COURSE' : 'CATEGORY'}
                        </span>
                      </div>

                      {item.kind === 'course' && item.categoryName && (
                        <div className='text-sm text-richblack-300 mt-1'>Category: {item.categoryName}</div>
                      )}
                      {item.kind === 'course' && filters.price && item.price && (
                        <div className='text-sm text-richblack-300 mt-1'>Price: ₹{item.price}</div>
                      )}
                      {item.kind === 'course' && filters.created_At && item.createdAt && (
                        <div className='text-sm text-richblack-300 mt-1'>Created: {new Date(item.createdAt).toLocaleDateString()}</div>
                      )}
                    </button>
                  ))
                )
              : (query !== '' && (
                <div className='px-4 py-3 text-sm text-richblack-400'>No results</div>
                )
                )}
          </div>
        )}

      </div>
      <FilterBar onFilterChange={handleFilterChange} setOpen={setOpen} />
    </div>
  </div>
)
}