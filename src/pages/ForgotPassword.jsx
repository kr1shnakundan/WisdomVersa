import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import CTAButton from '../components/core/HomePage/Button'
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

function ForgotPassword  ()  {
    const [email , setEmail] = useState("");
    const [emailSent , setEmailSent] = useState(false);
    const {loading} = useSelector((state) =>state.auth)
    const dispatch = useDispatch();

    const handleOnSubmit = (e) =>{
       e.preventDefault();
       dispatch(getPasswordResetToken(email , setEmailSent))
    }
  return (
    <div className='grid min-h-[calc(100vh - 3.5rem)] place-items-center h-screen'>
        {
            loading ? (
                <div className='spinner'></div>
            ) :
            (
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className='text-richblack-5 text-[1.875rem] leading-[2.375rem] font-semibold '>
                        {
                            emailSent ? "Check Email" : "Reset Your Email"
                        }
                    </h1>
                    <p className='text-richblack-100 my-4 text-[1.125rem] leading-[1.625rem '>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                            : `We have sent the reset email to ${email}`
                        }
                    </p>
                    
                    <form onSubmit={handleOnSubmit}>
                        {!emailSent &&  
                            <label htmlFor="" className='w-full'>
                                <p className='relative mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>
                                    Email Address 
                                    <span className='absolute top-[-15%] text-pink-200 pl-[4px] text-lg'>*</span>
                                </p>
                                <input
                                required
                                type="text"
                                name='email'
                                value={email}
                                placeholder='Enter your email'
                                onChange={(e)=>setEmail(e.target.value)}
                                style={{
                                    boxShadow : "inset 0px -1px 0px rgba(255,255,255,0.18)"
                                }}
                                className='bg-richblack-900 form-style w-full'
                                />

                            </label>
                        }
                        <button 
                        type='submit'
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                            {
                                emailSent ? "Resend email" : "Reset Password"
                            }
                        </button>
                    </form>
                           
                       
                    
                    {/* <CTAButton linkTo={handleOnSubmit}  action={true} /></CTAButton>*/}
                   

                    <div className='mt-6 flex items-center justify-between'>
                         <Link to={"/login"}>
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack/> Back to Login
                            </p>
                        </Link>
                    </div>
                    <div className="mt-6 p-4 bg-richblack-700 rounded-lg">
                        <p className="text-richblack-300 text-sm">
                            💡 <strong>Note:</strong> If you signed up using Google, you don't have a password. 
                            Please use the "Login with Google" button on the login page.
                        </p>
                    </div>
                   

                </div>
            )
        }
    </div>
    
  )
}

export default ForgotPassword