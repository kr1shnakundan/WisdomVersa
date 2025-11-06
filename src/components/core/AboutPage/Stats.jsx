import React from 'react'

const stats = [
    {count: "5K" , label: "Active Students"},
    {count: "10+" , label: "Mentors"},
    {count: "200+" , label: "Courses"},
    {count: "50+" , label: "Awards"}
]

const StatsComponents = () => {
  return (
    <div className='bg-richblack-800 border-b border-richblack-700'>
        <div className='mx-auto text-richblack-300 w-11/12 flex justify-between items-center py-20 px-32 gap-2'>
            {/* <div className='text-center '>
                <p className='text-richblack-5 text-3xl font-semibold my-2'>5K</p>
                <p>Active Students</p>
            </div>
            <div className='text-center'>
                <p className='text-richblack-5 text-3xl font-semibold my-2'>10K</p>
                <p>Mentors</p>
            </div>
            <div className='text-center'>
                <p className='text-richblack-5 text-3xl font-semibold my-2'>200+</p>
                <p>Courses</p>
            </div>
            <div className='text-center'>
                <p className='text-richblack-5 text-3xl font-semibold my-2'>50+</p>
                <p>Awards</p>
            </div> */}

            {
                stats.map((component , i) =>(
                    <div key={i} className='text-center py-10'>
                        <h2 className='text-richblack-5 text-3xl font-semibold my-2'>
                            {component.count}
                        </h2>
                        <p className='font-semibold text-[16px]'>
                            {component.label}
                        </p>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default StatsComponents