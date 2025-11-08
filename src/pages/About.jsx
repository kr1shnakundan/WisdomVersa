import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import aboutUs1 from '../assets/Images/aboutus1.webp'
import aboutUs2 from '../assets/Images/aboutus2.webp'
import aboutUs3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import foundingStory from '../assets/Images/FoundingStory.png'
import StatsComponents from '../components/core/AboutPage/Stats'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import LearningGrid from '../components/core/AboutPage/LearningGrid'


const About = () => {

    //CAN I MAKE THE IMAGE APPEAR IN FLEX-COL IN MOBILE VIEW. ............?
  return (
    <div>
        <section className='bg-richblack-700'>
            <div className='text-richblack-5 w-11/12 max-w-maxContent mx-auto flex flex-col text-center justify-between gap-10 relative 
                        h-[618px]'>
                <header className='w-[70%] flex flex-col items-center mx-auto gap-5'>
                    <p className='p-1 mt-16 mb-4'>About us</p>
                    <h1 className='text-4xl font-semibold mx-auto'>
                        Driving Innovation in Online Education for a 
                        <HighlightText className='' text={"Brighter Future"} />
                    </h1>
                    <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>
                        WisdomVersa is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>

                </header>
                <div className="sm:h-[70px] lg:h-[150px] "></div>
                <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%]
                                grid-cols-3  gap-3 lg:gap-5 '>
                    <img src={aboutUs1} alt="aboutus1"  />
                    <img src={aboutUs2} alt="aboutus1"  />
                    <img src={aboutUs3} alt="aboutus1" />
                </div>
            </div>
        </section>


        <section className='border-b border-richblack-700'>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between text-richblack-500 '>
                <div className=' h-[150px]'></div>
                <Quote />
            </div>
        </section>

        <section>
            <div className='flex flex-col w-11/12 max-w-maxContent text-richblack-500 mx-auto '>
                <div className='flex mx-auto flex-col lg:flex-row px-32 py-24 max-w-maxContent text-richblack-5 gap-24 items-center justify-between '>
                    <div className='flex flex-col gap-6 text-richblack-300 lg:w-[50%] mx-auto '>
                        <h2 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text text-4xl font-semibold lg:w-[75%]'>Our Founding Story</h2>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. 
                            It all began with a group of educators, technologists, and lifelong learners who recognized 
                            the need for accessible, flexible, and high-quality learning opportunities in a rapidly 
                            evolving digital world.
                        </p>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges 
                            of traditional education systems. We believed that education should not be confined to the 
                            walls of a classroom or restricted by geographical boundaries. We envisioned a platform 
                            that could bridge these gaps and empower individuals from all walks of life to unlock their 
                            full potential.
                        </p>
                    </div>
                    <div className=''>
                        <img src={foundingStory} 
                        className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                        alt="fonding story" 
                        />
                    </div>
                </div>
                <div className='text-richblack-5 flex lg:flex-row flex-col px-32 py-24 gap-24 items-center justify-between  '>
                    <div className='mx-auto lg:w-[48%] flex flex-col gap-10'>
                        <h2 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>Our Vision</h2>
                        <p className='lg:w-[95%] text-richblack-300 text-base font-medium'>
                            With this vision in mind, we set out on a journey to create an e-learning platform that 
                            would revolutionize the way people learn. Our team of dedicated experts worked tirelessly 
                            to develop a robust and intuitive platform that combines cutting-edge technology with 
                            engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>
                    <div className='mx-auto lg:w-[48%] flex flex-col gap-10 '>
                        <h2 className=' lg:w-[75%] bg-gradient-to-b from-[#FF512F] to-[#F09819] text-4xl font-semibold
                                        text-transparent bg-clip-text'>
                            Our Mission
                        </h2>
                        <p className='text-richblack-300 lg:w-[95%] text-base font-medium'>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant 
                            community of learners, where individuals can connect, collaborate, and learn from one 
                            another. We believe that knowledge thrives in an environment of sharing and dialogue, 
                            and we foster this spirit of collaboration through forums, live sessions, and networking 
                            opportunities.
                        </p>
                    </div>
                </div>
            </div>
            
        </section>

        
        
        <StatsComponents/>

        <section className='mx-auto w-11/12 max-w-maxContent flex flex-col mt-20 gap-10 items-center'>
            <LearningGrid />
            <ContactFormSection/>
        </section>
         
         {/* <section>
                    ----------------- ReviewSection remaining
         </section> */}
        <section>
            <Footer/>
        </section>
           
        
    </div>
  )
}

export default About