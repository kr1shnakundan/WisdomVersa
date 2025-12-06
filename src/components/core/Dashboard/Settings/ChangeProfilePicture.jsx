import {  useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import {FiUpload} from "react-icons/fi"


export default function ChangeProfilePicture (){

    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const dispatch = useDispatch();

    const {loading} = useSelector((state)=>state.auth)
    const [imageFile , setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const [error , setError] = useState(null);
    const fileInputref = useRef(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

   const handleClick = () => {
    fileInputref.current.click()
   }

   const handleFileChange = (e) => {
        const file = e.target.files[0]

        if(file){
            setError(null) // Purane errors clear karo

            //check file size
            if(file.size > MAX_FILE_SIZE){
                setError("File size must be less than 5MB")
                return // Aage mat badho
            }

            //check file type
            if(!file.type.startsWith(`image/`)){
                setError(`Please select the valid file type`)
                return
            }

            setImageFile(file) //file save kro
            previewFile(file) // Preview generate karo
        } 
    }

   //preview file to display it before upload
   const previewFile = (file) => {
    const reader = new FileReader()  //create file reader
    reader.readAsDataURL(file)       //file ko Base64 me convert kr do
    reader.onloadend = () =>{           //jb convert ho jaye to result ko preview kr do
        setPreviewSource(reader.result)
    }
   }

   const isDisable = !imageFile || loading

   // Add this handler function
    const handleCancel = () => {
        setImageFile(null)
        setPreviewSource(null)
        setError(null)
        // Reset the file input
        if(fileInputref.current){
            fileInputref.current.value = ""
        }
    }

   const handleFileUpload = async() =>{
    // Step 1: Check karo file selected hai ya nahi
    if(!imageFile){
        setError(`please select the image`)
        return
    }


    try{
        
        setError(null)

        // Step 2 : formdata bnao 
        const formData = new FormData()
        formData.append("displayPicture",imageFile)

        // Step 3: API call through Redux
        await dispatch(updateDisplayPicture(token, formData))
        
        // Success case
        console.log("Upload successful!")
        setImageFile(null)
        setPreviewSource(null)
        

        
    } catch(error){
        // Step 5: Error handle karo
        console.error("ERROR MESSAGE - ", error.message)
        setError(error.message)
    }
   }

   useEffect (() =>{
    if(imageFile){
        previewFile(imageFile)
    }
   },[imageFile])


    return(
        <div className="text-richblack-5 mt-16 bg-richblack-800 px-12 py-8 rounded-md border-[1px] border-richblack-700">
           <div className=" flex flex-col sm:flex-row gap-5 items-center ">
                <div className="relative ">
                    <img 
                        src={previewSource || user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="w-24 h-24 aspect-square rounded-full"
                    />
                    {/* Show X button only when preview is different from original */}
                    {previewSource && previewSource !== user?.image && (
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="absolute top-[4rem] right-[0rem] bg-richblack-700 hover:bg-richblack-600 
                            text-white rounded-full w-8 h-8 flex items-center justify-center 
                            border-2 border-richblack-50 transition-all duration-200"
                            title="Cancel selection"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <div className="">
                    <p className="text-lg sm:text-xl font-semibold">Change Profile Picture</p>
                    {error && (
                        <p className="">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row  sm:gap-7">
                        <input 
                        type="file" 
                        ref={fileInputref}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png ,image/gif , image/jpeg"
                        />


                        <button
                        onClick={handleClick}
                        disabled={loading}
                        className={`bg-richblack-700 text-richblack-50 px-7 py-3 rounded-full 
                        cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
                        border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd]`}
                        >
                            Select
                        </button>

                        {/* Upload Button */}
                        {/* <IconBtn
                            text={loading ? "Uploading..." : "Upload"}
                            onclick={handleFileUpload}
                            disabled={!imageFile || loading}
                            // Disabled jab: file nahi hai YA upload ho raha hai
                        >
                            {!loading && <FiUpload />}
                        </IconBtn> */}
                        <button
                            
                            onClick={handleFileUpload}
                            disabled={isDisable} // Disabled jab: file nahi hai YA upload ho raha hai
                            className={`${isDisable ? "bg-pure-greys-200 hover:bg-pure-greys-500" : " bg-yellow-25 hover:bg-yellow-50"}
                            text-richblack-900 px-7 py-3 rounded-full cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
                            border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd]
                            flex gap-2 items-center`}
                        >
                            {loading ? "Uploading..." : "Upload"}
                            {!loading && <FiUpload />}
                            
                        </button>
                    </div>
                </div>
           </div> 
        </div>
    )
}