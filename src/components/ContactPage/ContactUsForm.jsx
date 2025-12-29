import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {apiConnector} from '../../services/apiconnector'
import { contactusEndpoints } from '../../services/apis'
import CountryCode from '../../data/countrycode.json'
import toast from 'react-hot-toast'

// ------------------------------- NEED TO CHECK TIME LOADING THIS ABOUT PAGE-------------------------------


const ContactUsForm = () => {
    const [loading , setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const submitContactUsForm = async(data) =>{
        setLoading(true)
       const toastId = toast.loading(
                            <div className='flex gap-1'>
                                <div className='spinner'></div>
                            </div>
                        )
        try{

            const response = await apiConnector("POST",contactusEndpoints.CONTACT_US_URL,data);

            console.log("response for contact us form is ---- > ",response);

            if (response.data.success) {
                toast.success(response.data.message);
                reset(); // Clear form
            } 

            setLoading(false);
        } catch(error){
            if (error.response) {
            // ⚠️ Server responded with error status (400, 500, etc.)
            const { status, data } = error.response;
            
            if (status === 400) {
                // Expected validation error - show user-friendly message
                toast.error(data.message, {
                    duration: 5000
                });
            } else if (status === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } else if (error.request) {
            // ❌ Network error - no response received
            toast.error('Failed to connect to server. Please check your connection.');
        } else {
            // ❌ Other errors
            console.error('Error:', error);
            toast.error('An unexpected error occurred.');
        }
            console.log("Error while fetching submitContactUsForm :",error.message);
            setLoading(false);
        }
        toast.dismiss(toastId);
        
    }

  return (
        <div>
            <form onSubmit={handleSubmit(submitContactUsForm)} className='flex flex-col gap-5 p-8 '>
                <div className='flex flex-col lg:flex-row gap-5'>

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstname" className="lable-style mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter first name"
                            className="form-style"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastName" className="lable-style mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter last name"
                            className="form-style"
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                            </span>
                        )}
                    </div>
                </div>
               <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='lable-style mb-1'>
                        Email Address
                    </label>
                    <input 
                    type="email" 
                    name='email'
                    id='email'
                    placeholder='Enter your email'
                    className='form-style'
                    {... register("email",{required:true})}
                    />
                    {errors.email && (
                        <span className='mt-1 text-[12px] text-yellow-100'>
                            Please fill email.
                        </span>
                    )}
               </div>
               <div className="flex flex-col gap-2">
                    <label htmlFor="phoneNo" className="lable-style">
                    Phone Number
                    </label>

                    <div className='flex gap-5'>
                        <div className='flex w-[81px] flex-col gap-2'>
                            <select
                            name='countrycode'
                            id="countrycode"
                            className='form-style'
                            defaultValue={"+91"}
                            {...register("countrycode",{required:true})}
                            >

                                {
                                    CountryCode.map((ele,i)=>{
                                        return (
                                        <option
                                        key={i} value={ele.code}
                                        >
                                            {ele.code}-{ele.country}
                                        </option>)
                                    }   )
                                }

                            </select>
                        </div>
                        <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                            <input 
                            type="number" 
                            name='phoneNo'
                            id='phoneNo'
                            placeholder='12345 67890'
                            className='form-style'
                            {...register("phoneNo",{
                               required: {
                                value:true,
                                message:"please enter the phone number here..."
                                },
                                maxLength: {value:12 , message:"Invalid phone number"},
                                minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                            />
                        </div>
                    </div>
                    {errors.phoneNo && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                        )
                    }
                </div> 

                
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="lable-style">
                    Message
                    </label>
                    <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="form-style"
                    {...register("message", { required: true })}
                    />
                    {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>
                    )}
                </div>   
                  
                <button
                    disabled={loading}
                    type="submit"
                    className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
                >
                    Send Message
                </button>  
                
            </form>
        </div>
  )
}

export default ContactUsForm