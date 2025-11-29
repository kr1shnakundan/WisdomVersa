import { apiConnector } from "../apiconnector";
import { settingsEndPoints } from "../apis";
import toast from "react-hot-toast";
import {logout} from './authAPI'


const {CHANGE_PASSWORD_API , UPDATE_DISPLAY_PICTURE_API ,DELETE_PROFILE_API , UPDATE_PROFILE_API} = settingsEndPoints


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