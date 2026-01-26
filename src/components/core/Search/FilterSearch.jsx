// import React, { useEffect, useRef, useState } from 'react'
// import { FaSliders } from 'react-icons/fa6'

// const FilterBar = ({ onFilterChange }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [selected, setSelected] = useState({
//     category: false,
//     created_At: false,
//     price: false
//   })

//   const filterRef = useRef()
//   const buttonRef = useRef()

//   const handleChange = (e) => {
//     const newSelected = {
//       ...selected,
//       [e.target.name]: e.target.checked
//     }
//     setSelected(newSelected)

//     if (onFilterChange) {
//       onFilterChange(newSelected)
//     }
//   }

//   const handleClearAll = () => {
//     const clearedFilters = {
//       category: false,
//       created_At: false,
//       price: false
//     }
//     setSelected(clearedFilters)
//     setIsOpen(false)
//     if (onFilterChange) {
//       onFilterChange(clearedFilters)
//     }
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (filterRef.current && !filterRef.current.contains(event.target) &&
//             buttonRef.current && !buttonRef.current.contains(event.target)
//       ) {
//         setIsOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return (
//     <div className='relative'>
//       <button
//         ref={buttonRef}
//         onClick={(e) => [

//           setIsOpen(!isOpen)
//         ]}
//         className={`m-2 p-2 text-richblack-300 hover:text-richblack-100 focus:outline-none rounded ${isOpen && 'bg-richblack-700 text-richblack-100 bg:richblack-800'}`}
//       >
//         <FaSliders />
//       </button>
//       {isOpen && (
//         <div className='relative'>
//           {/* Triangular div */}
//           <div className='absolute left-4 -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-richblack-800 z-20' />
//           <div
//             className='absolute w-[150px] left-0 right-0 top-full z-10 bg-richblack-800 border border-richblack-700
//                 p-2 rounded-lg shadow-xl'
//             ref={filterRef}
//           >
//             <label className='flex gap-2 items-center'>
//               <input
//                 type='checkbox'
//                 name='category'
//                 checked={selected.category}
//                 onChange={handleChange}
//               />
//               <span>Category</span>
//             </label>
//             <label className='flex items-center gap-2'>
//               <input
//                 type='checkbox'
//                 name='created_At'
//                 checked={selected.created_At}
//                 onChange={handleChange}
//               />
//               <span>Created At</span>
//             </label>
//             <label className='flex gap-2 items-center'>
//               <input
//                 type='checkbox'
//                 name='price'
//                 checked={selected.price}
//                 onChange={handleChange}
//               />
//               <span>Price</span>
//             </label>
//             <button
//               className='mt-1'
//               onClick={handleClearAll}
//             >
//               Clear All
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default FilterBar


import React, { useEffect, useRef, useState } from 'react'
import { FaSliders } from 'react-icons/fa6'

const FilterBar = ({ onFilterChange ,setOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState({
    category: false,
    created_At: false,
    price: false
  })

  const filterRef = useRef()
  const buttonRef = useRef()

  const handleChange = (e) => {
    const newSelected = {
      ...selected,
      [e.target.name]: e.target.checked
    }
    setSelected(newSelected)

    if (onFilterChange) {
      onFilterChange(newSelected)
    }
  }

  const handleClearAll = () => {
    const clearedFilters = {
      category: false,
      created_At: false,
      price: false
    }
    setSelected(clearedFilters)
    setIsOpen(false)
    if (onFilterChange) {
      onFilterChange(clearedFilters)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        onClick={(e) => {
          setIsOpen(!isOpen);
          setOpen(false);
        }}
        className={`m-2 p-2 text-richblack-300 hover:text-richblack-100 focus:outline-none rounded transition-all duration-200 ${isOpen ? 'bg-richblack-700 text-richblack-100' : 'hover:bg-richblack-800'}`}
      >
        <FaSliders size={18} />
      </button>
      {isOpen && (
        <div className='relative'>
          {/* Triangular div */}
          <div className='absolute right-4 -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-richblack-800 z-20' />
          <div
            className='absolute w-[180px] right-0 top-full z-10 bg-richblack-800 border border-richblack-700
                p-4 rounded-lg shadow-xl'
            ref={filterRef}
          >
            <div className='space-y-3'>
              <label className='flex gap-3 items-center cursor-pointer group'>
                <input
                  type='checkbox'
                  name='category'
                  checked={selected.category}
                  onChange={handleChange}
                  className='w-4 h-4 accent-caribbeangreen-200 cursor-pointer'
                />
                <span className='text-richblack-5 text-sm group-hover:text-caribbeangreen-200 transition-colors'>Category</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  name='created_At'
                  checked={selected.created_At}
                  onChange={handleChange}
                  className='w-4 h-4 accent-caribbeangreen-200 cursor-pointer'
                />
                <span className='text-richblack-5 text-sm group-hover:text-caribbeangreen-200 transition-colors'>Created At</span>
              </label>
              <label className='flex gap-3 items-center cursor-pointer group'>
                <input
                  type='checkbox'
                  name='price'
                  checked={selected.price}
                  onChange={handleChange}
                  className='w-4 h-4 accent-caribbeangreen-200 cursor-pointer'
                />
                <span className='text-richblack-5 text-sm group-hover:text-caribbeangreen-200 transition-colors'>Price</span>
              </label>
            </div>
            <button
              className='mt-4 w-full py-2 px-3 bg-richblack-700 hover:bg-richblack-600 text-richblack-100 text-sm rounded transition-colors border border-richblack-600'
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
