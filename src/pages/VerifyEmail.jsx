import { BiArrowBack } from "react-icons/bi";
import OTPInput from "react-otp-input";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RxCountdownTimer } from "react-icons/rx";
import { Link } from "react-router-dom";


function VerifyEmail (){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {signupData , loading} = useSelector((state) => state.auth)
    const [otp , setOtp] = useState("")

   useEffect (()=>{
    // Only allow access of this route when user has filled the signup form
    if(!signupData) {
        navigate("/signup");
    }
   
   },[]);

   const handleVerifyAndSignup = (e) =>{
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData

        dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ));
   };   
    
    return (
        <div className="grid bg-richblack-900 place-items-center min-h-[calc(100vh-3.5rem)]">
            {
                loading ? <div className="spinner"></div>
                : (
                    <div className="flex flex-col gap-6 text-richblack-5 p-8 md:w-[500px]">
                        <h1 className="text-3xl mb-3 font-semibold ">
                            Verify email
                        </h1>
                        <p className="text-richblack-100 text-[1.125rem] leading-[24px] ">
                            A verification code has been sent to you. Enter the code below
                        </p>
                        <form action="" onSubmit={handleVerifyAndSignup}>

                            <OTPInput
                            value={otp}
                            numInputs={6}
                            onChange={setOtp}
                            inputType="number"
                            renderSeparator = {<span>-</span>}
                            renderInput={(props)=>(
                                <input
                                {...props}
                                 style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] mb-5 border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5
                                        focus:text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                            />
                            <button type="submit" 
                            className="w-full shadow-[inset_0_-1px_0_rgba(255,255,255,0.18)] mb-2 p-3 bg-yellow-25 rounded-full text-richblack-900 hover:bg-yellow-50 hover:scale-95 transition-all duration-200">
                                Verify email
                            </button>
                        </form>
                        <div className="flex justify-between items-center mb-10">
                            <Link to={"/login"}
                            className="flex items-center gap-x-2 text-richblack-5 text-sm hover:text-blue-100"
                            >
                                <BiArrowBack/> Back to Login
                            </Link>
                            <button onClick={() => dispatch(sendOtp(signupData.email,navigate))}
                            className="text-blue-100 text-sm  "
                            >
                               <RxCountdownTimer/> Resend it
                            </button>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail;