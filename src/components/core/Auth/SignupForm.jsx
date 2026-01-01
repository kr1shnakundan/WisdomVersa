import React, { useState } from 'react'

import { AiOutlineEye ,AiOutlineEyeInvisible ,AiTwotoneInfoCircle } from 'react-icons/ai'

import CTAButton from '../HomePage/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { setSignupData } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux'

import { ACCOUNT_TYPE } from '../../../utils/constant'
import toast from 'react-hot-toast'
import { sendOtp } from '../../../services/operations/authAPI'
import Tab from '../../common/Tab'


const SignupForm = () => {

  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const location = useLocation();
  const [showCreatePassword , setShowCreatePassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);

  // student or instructor
  const [accountType, setAccountType] = useState(
     location.state?.accountType || ACCOUNT_TYPE.STUDENT
  )
    // const setIsLoggedIn = props.setIsLoggedIn
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) =>{
    setFormData((prevData) =>({
      ...prevData ,
      [e.target.name]:e.target.value
    }))
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    
    if(password !== confirmPassword){
      toast.error("Password do not Match")
      return
    }

    const signupData ={
      ...formData,
      accountType

    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email ,navigate))
    

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)

  }

  
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      {/* TAB */}
      {/* <Tab tabData = {tabData} field = {accountType} setfield = {setAccountType} /> */}
      <Tab tabData={tabData} field={accountType} setfield={setAccountType} />

      {/* FORM */}
      <form onSubmit={handleOnSubmit} className='bg-richblack-900 text-richblack-200'>
        {/* <div>
          <p>Student</p>
          <p>Instructors</p>
        </div> */}
        <div className='w-full py-8 pr-8 flex flex-col gap-9 '>
          <div className='flex flex-row gap-5'>
            <label className='w-full '>
                <p className='relative text-[0.875rem] mb-1 text-richblack-5 leading-[1.375rem] '>
                  First Name
                  <sup className=' absolute top-[-15%]  text-pink-200 pl-[4px] text-lg'>*</sup>
                </p>
              <input 
              required
              type="text"
              value={firstName}
              name='firstName'
              onChange={handleOnChange}
              placeholder='Enter first name'
              style={{
                boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)" 
              }}
              className=' w-full p-3 bg-richblack-800 text-richblack-5 rounded-lg'
              />
            </label>
            <label className='w-full'>
                <p className='relative text-[0.875rem] mb-1 text-richblack-5 leading-[1.375rem]'>
                  Last Name 
                  <sup className='absolute top-[-15%] text-pink-200 pl-[4px] text-lg'>*</sup>
                </p>
                <input
                  required
                  type="text"
                  name='lastName'
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder='Enter last name'
                  style={{
                    boxShadow: " inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                  }}
                  className='bg-richblack-800 text-richblack-5 p-3 rounded-lg w-full'
                  />
            </label>
          </div>
          <label className='w-full'>
            <p className='relative text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem] '>
              Email Address
              <sup className='absolute top-[-15%] text-pink-200 pl-[4px] text-lg'>*</sup>
            </p>
            <input
            required
            type="email"
            value={email}
            name='email'
            onChange={handleOnChange}
            placeholder='Enter email Address'
            style={{
              boxShadow:"inset 0px -1px 0px rgba(255, 255 , 255 , 0.18)"
            }}
            className='bg-richblack-800 text-richblack-5 p-3 rounded-lg w-full '
            />
          </label>
          {/* <label>
            <p>
              Phone Number
              <sup>*</sup>
            </p>
            <div>
              
            </div>
          </label> */}
          <label className='w-full relative '>
            <div className='flex flex-row gap-2 items-center'>
              <p className='relative text-richblack-5 text-[0.875rem] leading-[1.375rem] mb-1 '>
                Create Password
                <sup className='absolute top-[-15%] text-lg pl-1 text-pink-200'>*</sup>
                
              </p>
              <AiTwotoneInfoCircle/>
            </div>
            
            <input
            type={showCreatePassword ? "text" : "password"}
            value={password}
            name='password'
            onChange={handleOnChange}
            required
            placeholder='Enter Password'
            style={{
              boxShadow:"inset 0px -1px 0px rgba(255, 255 , 255 , 0.18)"
            }}
            className='bg-richblack-800 text-richblack-5 p-3 rounded-lg w-full relative'
            />
            <span className='absolute top-[55%] right-[5%] cursor-pointer z-10'
            onClick={() => setShowCreatePassword((prev) => !prev)}>
              {showCreatePassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> 
              : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
            </span>
          </label>
          <label className='w-full relative '>
            <p className='relative text-richblack-5 text-[0.875rem] leading-[1.275rem] mb-1'>
              Confirm Password
              <sup className='absolute top-[-15%] text-lg pl-1 text-pink-200'>*</sup>
            </p>
            <input
            required
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            name='confirmPassword'
            onChange={handleOnChange}
            placeholder='Enter Password'
            style={{
              boxShadow:"inset 0px -1px 0px rgba(255, 255 , 255 , 0.18)"
            }}
            className=' bg-richblack-800 text-richblack-5 p-3 rounded-lg w-full' 
            />
            <span className='absolute top-[55%] right-[5%] cursor-pointer z-10'
            onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
            </span>
          </label>
          {/* <CTAButton active={true} linkTo={"/"}>
            Create Account
          </CTAButton> */}
          <button type='submit' className='shadow-[inset_0_-1px_0_rgba(255,255,255,0.18)] bg-yellow-50 text-black p-3 rounded-lg w-full
                              hover:scale-95 hover:ease-out duration-200 transition-all hover:bg-yellow-25'>
            Create Account
          </button>
          

            
        </div>
      </form>
    </div>
    
  )
}

export default SignupForm