import React from 'react'
import HighlightText from './HighlightText'
import compareWithOthersImg from '../../../assets/Images/Compare_with_others.png'
import knowProgressImg from '../../../assets/Images/Know_your_progress.png'
import planCalendarImg from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'

const LearningLanguageSection = () => {  
  return (
    <div className='bg-pure-greys-5 text-richblack-900'>
      <div className='flex flex-col w-11/12 mx-auto items-center py-10'>
        <div className='text-4xl font-semibold mb-2 '>
          Your swiss knife for 
          <HighlightText text={"learning any language"} />
        </div>
        <div className='text-richblack-700 text-center w-[65%] text-lg font-bold'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-col lg:flex-row relative  mt-5 '>
            <img className='lg:absolute right-96 ' src={knowProgressImg}></img>
            <img className='relative' src={compareWithOthersImg}></img>
            <img className='lg:absolute left-3/4' src={planCalendarImg}></img>
        </div>
        <div>
          <CTAButton active={true} linkTo={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    
    </div>
  )
}

export default LearningLanguageSection;