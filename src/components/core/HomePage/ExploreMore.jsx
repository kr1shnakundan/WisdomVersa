import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]

const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>(course.tag === value));
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }
  return (
    <div className='flex flex-col  items-center '>
        <div className='text-4xl font-semibold text-center '>
            Unlock the 
            <HighlightText text={"Power of Code"} />
        </div>
        <div className='text-richblack-300 mx-auto text-center text-lg mt-3 mb-20'>
            Learn to Build Anything You Can Imagine
        </div>
        <div className=' hidden lg:flex items-center justify-between  text-richblack-300 bg-richblack-800 gap-5 -mt-5 font-medium   mx-auto rounded-full
                        w-max p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {/* TabSection */}
            {tabsName.map((ele,i) =>{
                return (

                    <div key={i} 
                        onClick={()=>setMyCards(ele)}
                        className={`px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 text-[16px] flex flex-row items-center gap-2
                                    ${currentTab === ele? "bg-richblack-900 text-richblack-5 font-medium": "text-richblack-200"
              } `}>
                        {ele}
                    </div>
                )
            })}
        </div>
        <div className="hidden lg:block lg:h-[300px]"></div>

        <div className='flex flex-col lg:flex-row  gap-10 justify-center  items-center  mb-7 lg:mb-0 lg:px-0 px-3 
                        lg:absolute lg:gap-0 lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[25%]'>
            {courses.map((ele,i)=>{
                return(
                    <CourseCard
                        key={i}
                        cardData={ele}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                )
            })}
        </div>
        
    </div>
  )
}

export default ExploreMore