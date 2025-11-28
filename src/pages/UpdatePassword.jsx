import { AiOutlineCheck, AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";


function UpdatePassword(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state) =>state.auth)
    const [formData ,setFormData] = useState({
        password : "",
        confirmPassword : ""
    })
    const ValidationItem =({isValid ,text}) =>{
        return (<div className="flex items-center gap-2 text-sm">
                        {isValid ? (
                            <AiOutlineCheck className="w-4 h-4 text-blue-400" />
                        ) : (
                            <AiOutlineClose className="w-4 h-4 text-pink-400" />
                        )}
                        <span className={isValid ? 'text-blue-400' : 'text-pink-400'}>
                            {text}
                        </span>
                </div>
        )
    }

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {password , confirmPassword} = formData

    const doPasswordsMatch = (password === confirmPassword && password !== "");

    const validations ={
        minLength:password.length >=8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    const isPasswordValid = Object.values(validations).every(Boolean);

    const disable = (!isPasswordValid || password !== confirmPassword)

    const handleOnChange = (e) =>{
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name] : e.target.value
        })
        )
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();

        if(!doPasswordsMatch){
            toast.error("password ≠ confirmPassword")
        }

        if(!isPasswordValid){
            toast.error("password invalid")
            return
        }

        const token = location.pathname.split("/").at(-1)

        // Debug logs
        console.log("Full pathname:", location.pathname)
        console.log("Split array:", location.pathname.split("/"))
        console.log("Extracted token:", token)

        
        dispatch(resetPassword(password , confirmPassword,token , navigate))

    }
    return(
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div className="spinner"></div>
                ) 
                :(
                    <div className="flex flex-col gap-2 p-5 md:w-[500px]">
                        <h1 className="text-richblack-5 text-[1.875rem] leading-[2.375rem] font-semibold">
                            Choose new password
                        </h1>
                        <p className="text-richblack-100 my-1 text-[1.125rem] leading-[1.625rem] px-1">
                            Allmost done ! Enter your new password and you are all set.
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            <label className="w-full relative " htmlFor="">
                                <p className="relative mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]">
                                    New Password
                                    <sup className="absolute top-[-15%] text-pink-200 pl-[4px] text-lg">*</sup>
                                </p>
                                <input
                                required
                                type={showPassword ? "text" : "password"}
                                value={password}
                                name="password"
                                onChange={handleOnChange}
                                placeholder="Enter new password"
                                style={{
                                    boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"
                                }}
                                className='relative form-style !pr-10 w-full mb-7'
                                
                                />
         
                                <span className='absolute top-[75%] right-5 cursor-pointer z-10 text-richblack-200'
                                onClick={()=>setShowPassword((prev) =>!prev)}>
                                    {
                                        showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                                    }
                                </span>

                            </label>
                            <label className='w-full relative' htmlFor="" >
                                <p className='relative text-richblack-5 text-[0.875rem] leading-[1.375rem] mb-1 '>
                                    Confirm Password
                                    <sup className="absolute top-[-15%] text-pink-200 pl-[4px] text-lg">*</sup>
                                </p>
                                <input
                                required
                                type={showConfirmPassword ? "text" :"password"}
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={handleOnChange}
                                placeholder="Enter password again"
                                style={{
                                    boxShadow : "inset 0px -1px 0px rgba(255,255,255,0.18)"
                                }}
                                className="relative form-style !pr-10 w-full mb-7"
                                />
                                <span className='absolute top-[80%] right-5 cursor-pointer z-10 text-richblack-200'
                                onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                    {
                                        showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye/>
                                    }
                                </span>

                            </label>

                            {confirmPassword && (
                                <p className={`text-sm mt-2 ${doPasswordsMatch ? 'text-blue-400' : 'text-pink-400'}`}>
                                    {doPasswordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                                </p>
                            )}

                            {/* THIS IS TO SHOW THE USER WHETHER HIS PASSWORD HAS FOLLOWING ? */}
                            <div className="bg-black-900 text-richblack-5 rounded-lg p-4 py-2">
                                <p className="text-sm font-medium  mb-2">Password must contain:</p>

                                <div className="flex justify-between mb-4">
                                    <div>
                                        <ValidationItem isValid={validations.minLength} text="At least 8 characters" />
                                        <ValidationItem isValid={validations.hasUppercase} text="At least 1 uppercase letter" />
                                        <ValidationItem isValid={validations.hasLowercase} text="At least 1 lowercase letter" />
                                    </div>
                                    <div>
                                        <ValidationItem isValid={validations.hasNumber} text="At least 1 number" />
                                        <ValidationItem isValid={validations.hasSpecialChar} text="At least 1 special character" />
                                    </div>
                                </div>
                               
                               
                            </div>


                            <button className={`shadow-[inset_0_-1px_0_rgba(255,255,255,0.18)] p-3 ${disable ? "bg-pure-greys-200 hover:bg-pure-greys-500" : " bg-yellow-25 hover:bg-yellow-50"} 
                            rounded-lg w-full text-richblack-900 hover:scale-95  transition-all duration-200`}
                            disabled ={disable}>
                                Reset Password
                            </button>
                        </form>
                        <div className='mt-6 flex items-center justify-between'>
                            <Link to={"/login"}
                            className="flex items-center gap-x-2 text-richblack-5 hover:text-blue-100"
                            >
                            <BiArrowBack/> Back to Login
                            </Link>
                        </div>
                    </div>
                )
            }

        </div>
    )
}


export default UpdatePassword