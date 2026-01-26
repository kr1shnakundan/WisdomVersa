import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { courseEndpoints } from '../../../services/apis'

const {SEARCH_API} = courseEndpoints

export function UseSearchData () {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  // const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    let cancelled = false

    async function load () {
      try {
        // setStatus('Loading search data...')
        const res = await fetch(SEARCH_API, { headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error(`API error: ${res.status}`)
        const data = await res.json()

        if (cancelled) return
        setCourses(data.courses || [])
        setCategories(data.categories || [])
        // setStatus(`Courses: ${(data.courses || []).length}, Categories: ${(data.categories || []).length}`)
      } catch (e) {
        console.error(e)
        // if (!cancelled) setStatus('Failed to load search data.')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const combined = useMemo(() => {
    const catAsItems = categories.map(c => ({
      id: c.id,
      label: c.categoryName,
      kind: 'category'
    }))

    const courseAsItems = courses.map(c => ({
      id: c.id,
      label: c.courseName,
      price: c.price,
      createdAt: c.createdAt,
      kind: 'course',
      categoryId: c.categoryId,
      categoryName: c.categoryName
    }))

    return [...catAsItems, ...courseAsItems]
  }, [courses, categories])

  const createFuse = (filters) => {
    const keys = ['label', 'categoryName']

    if (filters.price) {
      keys.push('price')
    }

    if (filters.created_At) {
      keys.push('createdAt')
    }

    return new Fuse(combined, {
      isCaseSensitive: false,
      includeScore: true,
      shouldSort: true,
      threshold: 0.35,
      keys
    })
  }

  return {
    courses,
    categories,
    // status,
    combined,
    createFuse
  }
}
