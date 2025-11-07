import React from 'react'

import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FooterLink2 } from '../../data/footer-links';

import { FaFacebook , FaGoogle , FaTwitter , FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className=' bg-richblack-800 text-richblack-400 border-t border-richblack-600'>
        <div className='w-11/12 mx-auto pb-10 max-w-maxContent'>
            <div className=' py-20  flex flex-col lg:flex-row border-b border-richblack-700  justify-between'>
                <div className='flex flex-row justify-between lg:pl-3 pl-20 lg:border-r lg:border-richblack-700 lg:w-[48%] lg:pr-5 pb-10 gap-3 '>
                    <div className=' flex flex-col w-[30%] lg:pl-0 gap-4 mb-7'>
                        <img src={Logo} alt="wisdomversa Logo" className='object-contain w-[50%]'/>
                        <h1 className='text-richblack-50 text-[16px] font-semibold'>Company</h1>
                        <div className='flex flex-col gap-2'>
                            {["About","Careers","Affiliates"].map((ele,i) =>{
                                return(
                                    <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 '>
                                    <Link to={ele.toLowerCase()} >{ele}</Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex flex-row text-lg gap-3'>
                            <FaFacebook/>
                            <FaGoogle/>
                            <FaTwitter/>
                            <FaYoutube/>
                        </div>
                    
                    </div>
                    <div className='w-[48%] lg:pl-0  lg:w-[30%] mb-7'>
                        <h1 className='text-[16px] font-semibold text-richblack-50'>Resources</h1>
                        <div className='flex flex-col gap-2 mt-2'>
                            {Resources.map((ele,i)=>{
                                return(
                                    <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 '>
                                        <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                    </div>
                                )
                            })}
                        </div>
                        <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                            Support
                        </h1>
                        <div className=' hover:text-richblack-50 cursor-pointer transition-all duration-200 text-[14px]'>
                            <Link to={"/help-center"} >Help Center</Link>
                        </div>
                    </div>
                    <div className=' w-[48%] lg:pl-0 mb-7 lg:w-[30%] '>
                        
                        <h1 className='text-richblack-50 text-[16px] font-semibold'>Plans</h1>
                        <div className='flex flex-col gap-2 mt-2'>
                            {Plans.map((ele,i)=>{
                                return(
                                    <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 '>
                                        <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                    </div>
                                )
                            })}
                        </div>
                        
                        
                        <h1 className='text-richblack-50 text-[16px] font-semibold mt-7'>Community</h1>
                        <div className='flex flex-col gap-2 mt-2'>
                            {Community.map((ele,i)=>{
                                return(
                                    <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 '>
                                        <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                    </div>
                                )
                            })}
                        </div>
                        
                    </div>
                </div>
                {/* section-2 */}
                <div className='flex flex-row lg:w-[48%]  justify-evenly'>
                    {FooterLink2.map((ele,index)=>{
                        return(
                            <div key={index} className=''>
                                <h1 className='text-[16px] text-richblack-50 font-semibold'>{ele.title}</h1>
                                <div className='flex flex-col gap-2 mt-2'>
                                    {ele.links.map((subelement,i)=>{
                                        return(
                                            <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 '>
                                                <Link to={subelement.link}>{subelement.title}</Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='flex flex-row items-center justify-between mt-5 text-sm'>

                <div className='flex  flex-row gap-4'>
                    {BottomFooter.map((ele,i) =>{
                        return(
                            <div key={i} className={`${
                                BottomFooter.length - 1 === i
                                    ? "":
                                    " border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"} px-3`}>
                            <Link to={ele.split(" ").join("-").toLowerCase()} >{ele}</Link>
                            </div>
                        )
                    })}
                </div>

                <p className='text-center'>Made with ❤️ By Krishna Kundan © 2025 </p>
            </div>
        </div>
        
    </div>
  )
}

export default Footer