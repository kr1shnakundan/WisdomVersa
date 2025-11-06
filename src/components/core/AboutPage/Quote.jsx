import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div>
        {/* ADD QUOTE IMAGE/ICON */}
         <div className=' mx-auto text-center font-semibold text-richblack-5 text-xl md:text-4xl py-5 pb-20'>
                We are passionate about revolutionizing the way we learn. Our innovative platform 
                <HighlightText text={"combines technology "} />,
                <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
                    expertise
                </span>
                , and community to create an 
                <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>
                   
                   {" "} unparalleled educational experience.
                </span>
            </div>
    </div>
  )
}

export default Quote