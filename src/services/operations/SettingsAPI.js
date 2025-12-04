import { apiConnector } from "../apiconnector";
import { settingsEndPoints } from "../apis";
import toast from "react-hot-toast";
import {logout} from './authAPI'
import { setUser } from "../../slices/profileSlice";
import { setLoading } from "../../slices/authSlice";
import {setLoading as setProfileLoading} from "../../slices/profileSlice"


const {CHANGE_PASSWORD_API , UPDATE_DISPLAY_PICTURE_API ,DELETE_PROFILE_API , UPDATE_PROFILE_API} = settingsEndPoints

export  function updateDisplayPicture(token , formData){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setProfileLoading(true))
        try{

            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                }
            )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
            )
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify(response.data.data))

        } catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        dispatch(setProfileLoading(false))
        toast.dismiss(toastId)
    }
}

// export function updateProfile(token , data){
//     return async(dispatch)=>{
//         const toastId = toast.loading(<div className="flex gap-1 items-center">
//                                             <div className="spinner"></div>
//                                             Loading...
//                                         </div>)
//         dispatch(setProfileLoading(true))
//         try{
//             const response = await apiConnector("PUT" , UPDATE_PROFILE_API , data ,{
//                 Authorization : `Bearer${token}`
//             } )

//             if(!response.data.success){
//                 throw new Error (response.data.message)
//             }

//             toast.success("Profile Updated Successfully")
//             dispatch(setUser(response.data.data))
//         } catch(error){
//             console.log("Error in updateProfile : ",error)
//             toast.error(error?.response?.data?.message || error.message || "Failed to update profile")
//         }
//         finally {
//             dispatch(setProfileLoading(false))
//             toast.dismiss(toastId)
//         }
//     }
// }


export default async function ChangePassword(token , formData){
    const toastId = toast.loading(<div className="flex gap-2 items-center justify-center">
                                        <div  className="spinner"></div>
                                        <p>Loading</p>
                                </div>)
    try{
        const response = await apiConnector("POST",CHANGE_PASSWORD_API ,formData ,
            {
                Authorization : `Bearer${token}`,
            }
        )

        if(!response.data.success){
            throw new Error (response.data.message)
        }
        toast.success("Password Changed Successfully ")
        toast.dismiss(toastId)
        return true; //<------- added this to reset the form in updatePassword.jsx
    } catch(error){
        console.log("Error in changePassword in settingAPI ... : ",error )
        toast.error(error.response.data.message)
        toast.dismiss(toastId)
        return false;

    }

}

export function deleteProfile (token , navigate){
    return async (dispatch)=>{
        const toastId = toast.loading(<div className="flex items-center justify-center gap-2">
                                    <div className="spinner"></div>
                                    <p>Loading...</p>
                                </div>)
    try{
        const response = await apiConnector("DELETE",DELETE_PROFILE_API , null ,{
            Authorization : `Bearer${token}`
        })

        if(!response.data.success){
            throw new Error (response.data.message)
        }

        dispatch(logout(navigate))
    } catch(error){
        console.log("Error while deleting Profile : ",error)
        toast.error(error.response.data.messge || "unable to delete Account")
    }
    toast.dismiss(toastId)
    }
}