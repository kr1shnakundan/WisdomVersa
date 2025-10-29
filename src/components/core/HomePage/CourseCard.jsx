import React from 'react'
import { HiUsers } from 'react-icons/hi'
import { ImTree } from 'react-icons/im'

const CourseCard = ({cardData , currentCard , setCurrentCard}) => {
  return (
    <div onClick={() =>setCurrentCard(cardData?.heading)} className= {`
      ${currentCard === cardData.heading  ? "bg-white text-richblack-500 shadow-[12px_12px_rgba(225,225,0,1)] shadow-yellow-50" 
        : "bg-richblack-800 text-richblack-400"
       } w-[360px] lg:w-[28%] h-[300px] box-border cursor-pointer `}> {/*py-5 px-7*/}
        <div className=' border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6  flex flex-col gap-3 '>
            <div className={`text-xl font-semibold  ${currentCard === cardData.heading ? 
              "text-richblack-800 " : "text-richblack-25"
            }`}>{cardData?.heading}</div>
            <div>{cardData?.description}</div>
        </div>
        <div className={`flex flex-row items-center justify-between  py-3 px-6 font-medium text-sm
          ${currentCard === cardData.heading ? "text-blue-300" : " text-richblack-300"}`}>
            <div className='flex flex-row items-center justify-between gap-2 '>
              <HiUsers/>
              {cardData?.level}
            </div>
            <div className='flex flex-row items-center justify-between gap-2  '>
              <ImTree/>
              <div className=''>
                  {cardData?.lessionNumber}
                  {" "}
                  Lessons
              </div>
              
              </div>
        </div>
        
    </div>
  )
}

export default CourseCard