
import { retry } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ChangePassword from "../../../../services/operations/SettingsAPI";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";

export default function UpdatePassword() {
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
    const [showOldPassword , setShowOldPassword]= useState(false)
    const [showNewPassword , setShowNewPassword] = useState(false)
    const [showConfirmNewPassword , setShowConfirmNewPassword] = useState(false)

    const {
      register,
      handleSubmit,
      formState : {errors},
      watch,  //<---- this for enable and disable the update button
      reset  //<---- this for reset the form after successfull change
    } = useForm()

     // Watch all password fields
    const oldPassword = watch("oldPassword");
    const newPassword = watch("newPassword");
    const confirmNewPassword = watch("confirmNewPassword");

    const disable = !oldPassword || !newPassword || !confirmNewPassword

    const submitPasswordForm = async (data) =>{
        try{

            // Check if old password and new password are the same
            if (data.oldPassword === data.newPassword) {
                toast.error("Current password And New Password Can't Be Same");
                return;
            }
            const success = await ChangePassword (token , data)
            if(success){
                reset();
                setShowOldPassword(false);
                setShowNewPassword(false);
                setShowConfirmNewPassword(false);
            }
        } catch(error){
            console.log("Error message from change Password : " ,error.message)
        }
    }
    return(
        <div>
            <form  onSubmit={handleSubmit(submitPasswordForm)}
            className="text-richblack-5 px-5 mt-4 border border-richblack-700 rounded-lg bg-richblack-800"
            >
                <h3 className="mt-5 text-xl font-semibold">Password</h3>
                <div className="mt-5 text-richblack-5">
                    {/* Current Password Field */}
                    <label htmlFor="oldPassword" className="w-full">
                        <p className="text-[0.875rem] leading-[1.375rem] mb-1 relative">
                            Current Password
                            <sup className="absolute top-[-15%] pl-1 text-pink-200 text-lg">*</sup>
                        </p>
                    
                        <div className="relative w-full lg:w-[46%]">
                            <input 
                                required
                                type={showOldPassword ? "text" : "password"} 
                                name="oldPassword"  //<--- this is used in register
                                id="oldPassword" //<---- this is used in label
                                placeholder="Enter old Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)"
                                }}
                                className="w-full px-4 pr-12 bg-richblack-700 py-3 rounded-lg placeholder:text-richblack-300"
                                {...register ("oldPassword" , {required:true})}
                            />
                            <span 
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                                onClick={() => setShowOldPassword((prev) => !prev)}
                            >
                                {showOldPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> 
                                : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                            </span>
                            {errors.oldPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter Your Old Password.
                                </span>
                            )}
                        </div>
                    </label>

                    {/* New Password and Confirm Password Fields */}
                    <div className="flex flex-col lg:flex-row justify-between lg:gap-16 md:gap-6 my-5">
                        {/* New Password */}
                        <label htmlFor="newPassword" className="w-full">
                            <p className="relative text-[0.875rem] leading-[1.375rem] mb-1">
                                New Password
                                <sup className="text-lg pl-1 text-pink-200 absolute top-[-15%]">*</sup>
                            </p>
                            
                            <div className="relative w-full">
                                <input 
                                    required
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="Enter new Password" 
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)"
                                    }}
                                    className="w-full px-4 pr-12 py-3 rounded-lg bg-richblack-700 placeholder:text-richblack-300"
                                    {...register ("newPassword",{required:true})}
                                />
                                <span 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                >
                                    {showNewPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> 
                                    : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                                </span>
                                {errors.newPassword && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please Enter New Password.
                                    </span>
                                )}
                            </div>
                        </label>

                        {/* Confirm Password */}
                        <label htmlFor="confirmNewPassword" className="w-full">
                            <p className="relative text-[0.875rem] leading-[1.375rem] mb-1">
                                Confirm Password
                                <sup className="text-lg pl-1 text-pink-200 absolute top-[-15%]">*</sup>
                            </p>
                            
                            <div className="relative w-full">
                                <input 
                                    required
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    name="confirmNewPassword"
                                    id="confirmNewPassword"
                                    placeholder="Confirm Password" 
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)"
                                    }}
                                    className="w-full px-4 pr-12 py-3 rounded-lg bg-richblack-700 placeholder:text-richblack-300"
                                    {...register ( "confirmNewPassword" , {required:true})}
                                />
                                <span 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                                    onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                                >
                                    {showConfirmNewPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> 
                                    : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                                </span>
                                {errors.confirmNewPassword && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please Confirm Password.
                                    </span>
                                )}
                            </div>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                    type="submit"
                    className={`${disable ? "bg-pure-greys-200 hover:bg-pure-greys-500" : " bg-yellow-25 hover:bg-yellow-50"} text-richblack-900 px-7 py-3 rounded-full 
                    cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
                    border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd]`}
                    
                    >
                        Update
                    </button>
                    
                     <button
                     type="button"
                      onClick={() => {
                         navigate("/dashboard/my-profile")
                        }}
                    className={`bg-richblack-700 text-richblack-50 px-7 py-3 rounded-full 
                    cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
                    border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd]`}
                    >
                        Cancel
                    </button>
                    
                </div>
            </form>
        </div>
    )
}