import React from 'react'

const TimelineFeature = ({
    logo,
    heading,
    subheading
}) => {
  return (
    <div className='relative lg:h-[60px] '>
        <div className='relative flex flex-row items-center justify-evenly gap-6 '>
            <div className='relative flex  '>
            
                <div className=" relative z-0 w-14 h-14 bg-white rounded-full shadow-md"></div>
                <div className=' absolute w-6 h-6 top-[12px] right-[16px] z-10 '>
                    <img src={logo} />
                </div>
            </div>
            <div className='flex flex-col gap-[2px] '>
                <div className='text-lg text-richblack-800 font-semibold'>
                    {heading}
                </div>
                <div className='text-sm text-richblack-700'>
                    {subheading}
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default TimelineFeature