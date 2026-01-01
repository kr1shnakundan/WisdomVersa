import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import Banner from "../assets/Images/banner.mp4"

import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import instructorImg from '../assets/Images/Instructor.png'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../utils/constant'

const Home = () => {

    const {token} = useSelector((state)=>state.auth)
  return (
    <div >
        {/* section-1 */}
        <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent
        items-center text-white  justify-between">
            {/* become a instructor */}
            <Link 
             state={{ accountType: ACCOUNT_TYPE.INSTRUCTOR }}
            to={token ? "/dashboard/Instructor" : "/signup"}
            >
                <div  className='mt-16 p-1 group mx-auto rounded-full bg-richblack-800
                 text-richblack-200 transition-all duration-200 hover:scale-95 w-fit 
                font-bold drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none '>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all
                    group-hover:bg-richblack-900 '>
                    <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>

                </div>
            </Link>

            {/* heading */}
            <div className='mt-5 text-4xl text-center font-semibold'>
                Empower Your Future with
                <HighlightText text = {"Coding Skills"}/>
            </div>
            
            {/* semiHeading */}
            <div className='w-[90%] text-center text-lg font-bold  mt-3 text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            {/* learn more and try demo button */}
            <div className='flex flex-row mt-8 gap-7'>
                <CTAButton active={true} linkTo={"/about"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkTo={token ? "/bookDemo" : "/signup"}>
                    Book a Demo
                </CTAButton>
            </div>

            {/* video */}
            <div className='shadow-blue-200 mx-3 w-[90%] my-10 shadow-[10px_-5px_50px_-5px] '>
                <video className='shadow-[20px_20px_rgba(225,225,225)]'
                muted
                loop
                autoPlay
                >
                    <source  src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* coding potential and animation section-1 */}
            <div>
                <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your 
                        <HighlightText text={"coding potential "} />
                        with our online courses.
                    </div>
                }
                subheading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={{
                    btnText:"Try it Yourself",
                    link : token ? "/dashboard/my-courses" : "/signup",
                    active: true
                }}
                ctabtn2={{
                    btnText : "Learn More",
                    link:"/catalog/ai",
                    active:false
                }}
                codeColor={`text-yellow-25`}
                // codeblock={`<!DOCTYPE html> \n <html>\n <head>\n<title>First web</title>\n</head>\n<body>\n<h1>Hello dear!</h1>\n</body>\n</html>\n`}
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

                backgroundGradient={
                // <div className="absolute codeblock-1 w-72 h-48 bg-gradient-to-br from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF] rounded-full blur-[60px] opacity-30  "></div>
                    <div className='absolute codeblock1'></div>
            }

                />
            </div>
            {/* codeBlock-2 */}
            <div>
                <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={"coding in seconds"}/>

                    </div>
                }
                subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={{
                    btnText:"Continue Lesson ",
                    link:token ? "/dashboard/enrolled-courses" : "/login",
                    active:true
                }}
                ctabtn2={{
                    btnText:"Learn More",
                    link:"/catalog/c++",
                    active:false
                }}
                codeColor={"text-yellow-25"}
                codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}

                backgroundGradient={
                // <div className="absolute codeblock2 w-72 h-48 bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] rounded-full blur-[50px] opacity-30 "></div>
                <div className='absolute codeblock2'></div>
                // <div className="absolute w-80 h-40 bg-gradient-to-tr from-blue-400 via-cyan-400 to-green-300 rounded-full blur-[34px] opacity-20"></div>

                }
                />


            </div>

            <ExploreMore />
        </div>

        {/* section-2 -with background image*/}
        <div className='homePage_bg h-[320px] bg-pure-greys-5 text-richblack-900'>
            {/* <div className='flex flex-col w-11/12 '> */}
            {/* <div className="lg:h-[150px]"></div> <----- why error in my code at this */}
                <div className='w-11/12 mx-auto max-w-maxContent h-full flex flex-row gap-8 items-center justify-center pt-10 pb-20'>
                    <CTAButton active={true} linkTo={"/catalog/ml"}>
                        <div className='flex flex-row gap-3 items-center'>
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={false} linkTo={token ? "/catalog/dev" : "/signup"}>
                        <div className='text-white'>
                            Learn More
                        </div> 
                    </CTAButton>
                </div>
            {/* </div> */}
        </div>

        {/* section-2 - with white backgroundColor */}
        <div className='bg-pure-greys-5 text-richblack-900 '>
            <div className='w-11/12 max-w-maxContent mx-auto gap-8'>

                <div className='flex flex-col justify-between lg:pt-20 lg:flex-row  lg:gap-0 mt-[-100px] pb-10  gap-7 mx-10'>
                    <div className='lg:w-[45%] font-semibold text-4xl pt-10 '>
                        Get the skills you need for a {" "}
                        <HighlightText text={"job that is in demand"} />
                    </div>
                    <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                        <div className='text-richblack-700 text-[16px] '>
                            The modern WisdomVersa is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkTo={"/about"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>

            </div>
        </div>

        <TimelineSection/>

        <LearningLanguageSection/>
        
        
        
        {/* section-3 */}
        <div className='bg-richblack-900 text-white '>
            <div className='w-11/12 relative mx-auto my-20 flex max-w-maxContent flex-col items-center justify-between gap-8'>
                {/* instructor section */}
                <InstructorSection/>
                <h1 className='text-4xl font-semibold pt-20'>Reviews from other learners</h1>
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <ReviewSlider />
                </div>

            </div>
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Home