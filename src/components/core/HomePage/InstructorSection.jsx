import React from 'react'
import instructorImg from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-20 items-center '>
                    <div className='lg:w-[50%]  shadow-[-20px_-20px_0_0_rgb(255,255,255)]'>
                        
                        <img src={instructorImg}></img>
                    </div>
                    <div className='lg:w-[50%] flex flex-col gap-10 '>
                        <div className='lg:w-[50%] text-4xl font-semibold'>
                            Become an 
                            <HighlightText text={"instructor"} />
                        </div>
                        <div className=' font-medium text-[16px] w-[90%] text-richblack-300 text-justify'>
                            Instructors from around the world teach millions of students on WisdomVersa. We provide the tools and skills to teach what you love.
                        </div>
                        <div className='w-fit '>
                            <CTAButton active={true} linkTo={"/signup"}>
                                <div className='flex items-center gap-3 '>
                                    Start Teaching Today 
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                        </div>

                        
                    </div>
                </div>
  )
}

export default InstructorSection