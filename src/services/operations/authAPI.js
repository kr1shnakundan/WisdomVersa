
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
  GETME_API,
  GETUSERDETAILS_API
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
                               <div className="flex gap-1 items-center justify-center">
                                 <div className="spinner"></div>
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
             : //`https://api.dicebear.com/9.x/notionists/svg?seed=Sophia`
             `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({...response.data.user , image:userImage}))
            
            localStorage.setItem("token", JSON.stringify(response.data.token))
            // localStorage.setItem("user", JSON.stringify(response.data.user))<----- REMOVED it due to security purpose
            
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
    // localStorage.removeItem("user");<-------- REMOVED IT
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


export function resetPassword ( password , confirmPassword,token ,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST" , RESETPASS_API , {password,confirmPassword , token})

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


//------------------------------------- getMe is incomplete
// export function getMe(navigate) {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...")
//         dispatch(setLoading(true))
//         try {
//             // Debug: Check localStorage
//             console.log("Raw token from localStorage:", localStorage.getItem("token"));
            
//             // Get token from localStorage
//             let token = localStorage.getItem("token");
            
//             // If token is stored as JSON string, parse it
//             if (token && token.startsWith('"')) {
//                 token = JSON.parse(token);
//             }
            
//             console.log("Processed token:", token);
//             console.log("Authorization header:", `Bearer ${token}`);
            
//             if (!token) {
//                 toast.error("No token found. Please login again.");
//                 navigate("/login");
//                 return;
//             }
            
//             const response = await apiConnector(
//                 "GET", 
//                 GETME_API, 
//                 null,
//                 {
//                     Authorization: `Bearer ${token}`
//                 }
//             )
            
//             console.log("Response of getMe: ", response)
            
//             if (!response.data.success) {
//                 throw new Error(response.data.message)
//             }
            
//             toast.success("User detail fetched successfully")
//             navigate("/abcd")
//         } catch (error) {
//             console.log("getMe error in authAPI: ", error)
//             console.log("Error response:", error.response?.data)
//             toast.error("Unable to find user")
//         }
//         dispatch(setLoading(false))
//         toast.dismiss(toastId)
//     }
// }

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