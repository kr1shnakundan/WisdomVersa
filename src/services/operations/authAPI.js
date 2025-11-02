
import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints} from "../apis";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASS_API,
} = endpoints





export function sendOtp (email ,navigate){
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
            console.log("response.data.message for sendOtp is : ",response.data.message)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success(response.data.message)
            navigate("/verify-email")
        } catch(error){
            console.log("Error in sendOTP fuction in authAPI.JS : ",error);


            //---------------------------- SEND THE ERROR TOAST
            // toast.error("error in sending OTP , please try again")
            if(error.response){
                toast.error(error.response.data.message || "Server error occured")
            } else if(error.request){
                toast.error("no request from server")
            } else {
                toast.error(error.message || "Error in sending OTP ")
            }
            console.log("Error in sendOTP function:", error);
            console.log("Response data:", error.response?.data); // This shows backend error
            console.log("Request payload:", error.config?.data); // This shows what you sent
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

            toast.success(response.data.message)
            navigate("/login")

        } catch(error){
            console.log("Error in signUp in authAPI.js : ",error)
            toast.error("singup failed")
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
        dispatch(resetCart())

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        toast.success("Logged Out")
        navigate("/")
    }
}

export function getPasswordResetToken(email , setEmailSent){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{
                email
            })

            if(!response.data.success){
                console.log("Error while fetching the reset token from server : ",response.message)
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch(error){
            console.log("Error in getPasswordResetToken in authAPI.js : ",error)
            toast.error("Error occured while getting PasswordResetToken")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function resetPassword ( password , confirmPassword , token,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST" , RESETPASS_API , {password,confirmPassword,token})

            console.log("Response of resetPassword : " , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Reset successfully")
            navigate("/login")

        } catch(error){
            console.log("Reset Password error in authAPI : ",error)
            toast.error("Unable to reset password")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}