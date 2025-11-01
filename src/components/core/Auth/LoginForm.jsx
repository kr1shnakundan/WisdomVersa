import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';


const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword , setShowPassword] = useState(false);
  const [formData , setFormData] = useState({
    email:"",
    password:""
  })

  const {email , password } = formData;

  const handleOnChange = (e) =>{
    setFormData((prevData) =>({
      ...prevData , 
      [e.target.name] : e.target.value
    }))
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(email,password , navigate))
  }
  return (
    <div className=''>
      <form onSubmit={handleOnSubmit} className='bg-richblack-900 text-richblack-200 flex flex-col 
                                                py-8 pr-8 gap-9 w-full'>
        <label htmlFor="" className='w-full'>
          <p className='relative text-richblack-5 text-[0.875rem] leading-[1.375rem] mb-1 '>
            Email Address
            <sup className='absolute top-[-15%] text-pink-200 pl-1 text-lg'>*</sup>
          </p>
          <input
          required
          type="text"
          name='email'
          value={email}
          onChange={handleOnChange}
          placeholder='Enter email address'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255 , 255 , 255 , 0.18)"
          }}
          className='bg-richblack-800 text-richblack-5 rounded-lg p-3 w-full '
          />
        </label>
        <label htmlFor="" className='w-full relative'>
          <p className='relative text-richblack-5 text-[0.875rem] leading-[1.375rem] mb-1 '>
            Password
            <sup className='absolute top-[-15%] text-pink-200 pl-1 text-lg'>*</sup>
          </p>
          <input 
          required
          type= {showPassword ? "text" : "password"}
          name='password'
          value={password}
          onChange={handleOnChange}
          placeholder='Enter Password'
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255 , 255 , 255 , 0.18)"
          }}
          className='bg-richblack-800 text-richblack-5 rounded-lg p-3 w-full'
          />
          <span className='absolute top-[45%] right-5 cursor-pointer z-10'
          onClick={() => setShowPassword((prev)=>!prev)}>
            {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
          </span>
          
          <Link to={"/forgot-password"}
          className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
            Forgot Password
          </Link>
        </label>
        <button className='shadow-[inset_0_-1px_0_rgba(255,255,255,0.18)] p-3 bg-yellow-50 rounded-lg w-full text-richblack-900
                            hover:scale-95 hover:bg-yellow-25 transition-all duration-200 '>
          Sign In
        </button>

      </form>
    </div>
  )
}

export default LoginForm