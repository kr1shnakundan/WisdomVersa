
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
  GETUSERDETAILS_API,
  GOOGLE_AUTH_API
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
        const toastId = toast.loading(
                               <div className="flex flex-col gap-1 items-center justify-center">
                                 <div>Loading...</div>
                               </div>
        )
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
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName || ''} ${response.data.user.lastName || ''}`

            

            const userWithImage = {...response.data.user, image: userImage}

            dispatch(setUser(userWithImage))

            
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(userWithImage)) //<----- earlier REMOVED it due to security purpose
            
            navigate("/dashboard/my-profile")
        } catch(error){
            console.log("Error in logIn in authAPI.js : ",error)
            toast.error("login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
    
}

// export function logout (navigate) {
//     return (dispatch)=>{
       
//         dispatch(setToken(null))
//         dispatch(setUser(null))
//         dispatch(resetCart())

//         localStorage.removeItem("token")
//         localStorage.removeItem("user")

//         toast.success("Logged Out")
//         navigate("/")
//     }
// }

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");  
    toast.success("Logged Out");
    navigate("/");
  };
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

            console.log("Response for getPassword reset token....<>",response)

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch(error){
            console.log("Error in getPasswordResetToken in authAPI.js : ",error)
            if (error?.response?.data?.isGoogleUser) {
                toast.error(
                error.response.data.message || 
                'This account uses Google Sign-In. Please use the "Login with Google" button.',
                { duration: 5000 }
                );
            }else {
                toast.error(
                error?.response?.data?.message || 
                'Failed to send reset email'
                );
            }
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function resetPassword ( password , confirmPassword,token ,navigate){
    return async (dispatch,getState) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST" , RESETPASS_API , {password,confirmPassword , token})

            console.log("Response of resetPassword : " , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Reset successfully")
            // navigate("/login")

             // Check if user is logged in
            const { auth } = getState() //auth redux call
            const isLoggedIn = auth?.token || auth?.user 
            
            if (isLoggedIn) {
                navigate("/dashboard/settings/#update-password")
            } else {
                navigate("/login")
            }

        } catch(error){
            console.log("Reset Password error in authAPI : ",error)
            toast.error("Unable to reset password")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getUserDetails() {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "GET", 
        GETUSERDETAILS_API
        // No headers needed - cookie sent automatically!
      );

      console.log("GETUSERDETAILS_API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
      
    } catch (error) {
      console.log("GETUSERDETAILS_API ERROR:", error);
    }
  };
}


export function googleAuth(googleUserData , navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", GOOGLE_AUTH_API, {
                email: googleUserData.email,
                firstName: googleUserData.given_name,
                lastName: googleUserData.family_name,
                picture: googleUserData.picture,
                googleId: googleUserData.sub,
            })

            console.log("GOOGLE AUTH API RESPONSE:", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Logged in successfully")
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            
            navigate("/dashboard/my-profile")
        }
        catch (error) {
        console.log("GOOGLE AUTH API ERROR:", error)
        toast.error(error?.response?.data?.message || "Google authentication failed")
        }
        dispatch(setLoading(false))
    } 
}