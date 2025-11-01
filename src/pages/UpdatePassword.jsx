import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function UpdatePassword(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state) =>state.auth)
    const [formData ,setFormData] = useSelector({
        password : "",
        confirmPassword : ""
    })
    const ValidationItem =({isValid ,text}) =>{
        <div className="flex items-center gap-2 text-sm">
            {isValid ? (
                <Check className="w-4 h-4 text-green-500" />
            ) : (
                <HiX className="w-4 h-4 text-gray-400" />
            )}
            <span className={isValid ? 'text-green-600' : 'text-gray-600'}>
                {text}
            </span>
      </div>
    }

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {password , confirmPassword} = formData

    const doPasswordsMatch = password === confirmPassword && password !== "";

    const validations ={
        minLength:password.length >=8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    const isPasswordValid = Object.value(validations).every(Boolean);

    const handleOnChange = (e) =>{
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name] : e.target.value
        })
        )
    }

    handleOnSubmit = (e) =>{
        e.preventDefault();

        if(doPasswordsMatch){
            toast.error("password ≠ confirmPassword")
        }

        if(!isPasswordValid){
            toast.error("password invalid")
            return
        }

        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password , confirmPassword,token , navigate))

    }
    return(
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div className="spinner"></div>
                ) 
                :(
                    <div>
                        <h1 className="text-richblack-5 text-[1.875rem] leading-[2.375rem] font-semibold">
                            Choose new password
                        </h1>
                        <p className="text-richblack-100 my-4 text-[1.125rem] leading-[1.625rem]">
                            Allmost done ! Enter your new password and you are all set
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            <label className="w-full relative" htmlFor="">
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
                                className='relative form-style !pr-10'
                                
                                />
         
                                <span className='absolute top-[45%] right-5 cursor-pointer z-10'
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
                                className="relative form-style !pr-10"
                                />
                                <span className='absolute top-[45%] right-5 cursor-pointer z-10'
                                onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                    {
                                        showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye/>
                                    }
                                </span>

                            </label>

                            {confirmPassword && (
                                <p className={`text-sm mt-2 ${doPasswordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                                    {doPasswordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                                </p>
                            )}

                            {/* THIS IS TO SHOW THE USER WHETHER HIS PASSWORD HAS FOLLOWING ? */}
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
                                <ValidationItem isValid={validations.minLength} text="At least 8 characters" />
                                <ValidationItem isValid={validations.hasUppercase} text="At least 1 uppercase letter" />
                                <ValidationItem isValid={validations.hasLowercase} text="At least 1 lowercase letter" />
                                <ValidationItem isValid={validations.hasNumber} text="At least 1 number" />
                                <ValidationItem isValid={validations.hasSpecialChar} text="At least 1 special character" />
                            </div>


                            <button className='shadow-[inset_0_-1px_0_rgba(255,255,255,0.18)] p-3 bg-yellow-50 rounded-lg w-full text-richblack-900hover:scale-95 hover:bg-yellow-25 transition-all duration-200'
                            disabled ={!isPasswordValid || password !== confirmPassword}>
                                Reset Password
                            </button>
                        </form>
                        <div className='mt-6 flex items-center justify-between'>
                            <Link to={"/login"}
                            className="flex items-center gap-x-2 text-richblack-5"
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