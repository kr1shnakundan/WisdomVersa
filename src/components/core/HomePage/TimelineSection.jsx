import React from 'react'
import TimelineFeature from './TimelineFeature';
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const TimelineSection = () => {
  return (
    <div className='text-richblack-900 bg-pure-greys-5  flex items-center justify-center'>
        <div className='w-11/12 pb-20 max-w-maxContent mt-14 '>
            <div className='flex lg:flex-row flex-col gap-10 lg:gap-0 pb-20 '>
                <div className='relative w-[40%] mx-10 flex flex-col gap-2 items-start'>
                    <TimelineFeature 
                    logo={logo1}
                    heading={"Leadership"}
                    subheading={"Fully commited to the success company"}
                    />
                    <div className=" ml-6 border-l-2 border-dotted border-richblack-700 h-10"></div>

                    <TimelineFeature 
                    logo={logo2}
                    heading={"Responsibility"}
                    subheading={"Students will always be our top priority"}
                    />

                    <div className=" ml-6 border-l-2 border-dotted border-richblack-700 h-10"></div>

                    <TimelineFeature 
                    logo={logo3}
                    heading={"Flexibility"}
                    subheading={"The ability to switch is an important skills"}
                    />

                    <div className=" ml-6 border-l-2 border-dotted border-richblack-700 h-10"></div>

                    <TimelineFeature 
                    logo={logo4}
                    heading={"Solve the Problem"}
                    subheading={"Code your way to a solution"}
                    />

                </div>

                <div className='relative'>
                    <div className='w-[90%] shadow-[20px_20px_rgba(255,255,255,1),_-30px_0px_40px_-10px_rgba(37,99,235,0.6),_30px_0_40px_-10px_rgba(37,99,235,0.6)] object-cover  lg:h-fit'>
                        <img src={timelineImage}></img>
                    </div>
                    <div className='flex lg:flex-row flex-col absolute left-[20%]  lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] uppercase justify-evenly bg-caribbeangreen-700  lg:h-24 items-center py-5  gap-4 lg:gap-0 lg:py-10 '>
                        <div className=' ml-5 flex gap-5 items-center lg:border-r border-caribbeangreen-500 px-5'>
                           
                            <div className='font-bold text-white text-4xl leading-[44px] tracking-[-0.02em]'> 10 </div>
                            <div className='text-caribbeangreen-300 text-sm lg:w-[50%]'>YEARS EXPERIENCE</div>
                        </div>
                        {/* <div className=" ml-6 border-l-2 border-1 border-caribbeangreen-500 h-10"></div> */}
                        <div className='flex gap-4 items-center px-5'>
                            
                            <div className='font-bold text-4xl text-white leading-[44px] tracking-[-0.02em]'>250</div>
                            <div className='text-caribbeangreen-300 text-sm lg:w-[50%]'>TYPES OF COURSES</div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default TimelineSection;