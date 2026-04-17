import React from 'react'

const Error = () => {
  return (
    <div className='flex items-center justify-center text-3xl text-richblack-5 h-screen'>
        <div className='flex flex-col items-center gap-5'>
          Error - 404 Not Found
          <button>
            <a href="/" className='text-pink-500 underline'>Go Back Home</a>
          </button>
        </div>
    </div>
  )
}

export default Error