import { use } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints} from "../apis";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


const dispatch = useDispatch();


export function sendOTP (email ,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true,
            })
            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP send successfully")
            navigate("/verify-email")
        } catch(error){
            console.log("Error in sendOTP fuction in authAPI.JS : ",error);
            toast.error("error in sending OTP , please try again")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
} 


export function signUp (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("SignUp Successful")
            navigate("/login")

        } catch(error){
            console.log("Error in signUp in authAPI.js : ",error)
            toast.error("signUp failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function login (email , password , navigate){
    
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",LOGIN_API , {
                email,
                password
            })

            console.log("response of login is : ", response)

            console.log("response success data........",response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("login Successful")

            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
            ? response.data.user.image 
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({...response.data.user , image:userImage}))
            
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            
            navigate("/dashboard/my-profile")
        } catch(error){
            console.log("Error in logIn in authAPI.js : ",error)
            toast.error("login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
    
}

export function logout (navigate) {
    return (dispatch)=>{
       
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCard())

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        toast.success("Logged Out")
        navigate("/")
    }
}