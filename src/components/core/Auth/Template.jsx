import React from 'react'
import Signup from '../../../pages/Signup'
import { FaGoogle } from 'react-icons/fa'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import Frame from '../../../assets/Images/frame.png'

const Template = ({heading ,desc1 , desc2 ,image , formType , setIsLoggedIn}) => {
  return (
    // add "loading" here.....Spinner
    <div className='w-11/12 max-w-[1160px] mx-auto flex flex-col lg:flex-row text-richblack-5 lg:gap-y-0 gap-y-7 py-12  gap-x-12'>
        <div className=' w-11/12 max-w-[480px]  lg:mx-0 mx-auto '>
            <h1 className='text-4xl font-semibold tex-[1.875rem] leading-[2.375rem] '>{heading}</h1>
            <div className=' leading-[1.625rem] text-[1.125rem] mt-4 pr-5'>
                <span className='text-richblack-100'>{desc1}</span>
                <span className='text-blue-100 text-sm italic'>{desc2}</span>
            </div>
            
            {formType === "signup" ? <SignupForm /> : <LoginForm /> }
            <div className='flex flex-col items-center my-4 gap-x-2 mr-8'>
                <div className='h-[1px] w-full  border border-richblack-700'></div>
                <div className=' text-richblack-700 font-medium leading-[1.375rem]'>OR</div>
                <div className='h-[1px] w-full border border-richblack-700'></div>
            </div>

            <div className=' w-[95%] flex flex-row items-center justify-center gap-x-2 mr-8 mt-10 py-[12px] 
                             rounded-[8px] text-richblack-900 bg-yellow-50 border  border-richblack-700
                             hover:bg-yellow-25 hover:scale-95 transition-all duration-200'>
                <FaGoogle/>
                <div className=' '>Signup with Google</div>
            </div>
        </div>
        <div className='relative w-11/12 max-w-[450px] mx-auto lg:mt-0 mt-11'>
            <img className='relative' src={Frame} alt="" loading='lazy'/>
            {/* <img className='absolute inset-0 translate-x-[5%] translate-y-[5%] -z-10' src={Frame} alt="" loading='lazy' /> */}
            <img className='absolute -top-4 right-4 ' src={image} alt="formImage" loading='lazy' />
        </div>
    </div>
  )
}

export default Template