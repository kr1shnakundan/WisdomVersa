import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { LuSave ,LuSaveOff } from "react-icons/lu";
import { updateProfile } from "../../../../services/operations/SettingsAPI";

export default function EditProfile (){
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const {
        register,
        watch,
        handleSubmit,
        formState : {errors}
    } = useForm();
    
    // Watch required fields
    const firstName = watch("firstName")
    const lastName = watch("lastName")
    const dateOfBirth = watch("dateOfBirth")
    const gender = watch("gender")

    // Check if all required fields are filled
    const disable = !firstName || !lastName || !dateOfBirth || !gender


    const submitProfileForm = async(data) =>{
        try{
            dispatch(updateProfile(token ,data))
        } catch(error){
            console.log("ERROR IN EDITPROFILE : ",error)
            toast.error(error.message)
        }
    }

    return(
        <div className="text-richblack-5 bg-richblack-800 border border-richblack-700 rounded-md p-5">

            <h2 className="sm:text-xl text-lg font-semibold mx-auto sm:mx-0">Profile Information</h2>
            <form onSubmit={handleSubmit(submitProfileForm)} className="my-5 space-y-5">
                
                <div className="flex lg:flex-row flex-col gap-5 ">
                    <label htmlFor="firstName" className="w-full">
                        <p className="lable-style mb-1 relative">
                            First Name
                            <sup className="absolute top-[-15%] pl-1 text-pink-200 text-lg">*</sup>
                        </p>
                        <input 
                        type="text" 
                        placeholder="Enter first Name"
                        id="firstName"
                        name="firstName"
                        className="form-style !bg-richblack-700 w-full "
                        {...register("firstName",{required:true})}
                        defaultValue={user?.firstName}
                        />
                        {errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your First Name.
                            </span>
                        )}
                    </label>
                     <label htmlFor="lastName" className="w-full">
                        <p className="lable-style mb-1 relative">
                            Last Name
                            <sup className="absolute top-[-15%] pl-1 text-pink-200 text-lg">*</sup>
                        </p>
                        <input 
                        type="text" 
                        placeholder="Enter Last Name"
                        id="lastName"
                        name="lastName"
                        className="form-style !bg-richblack-700 w-full "
                        {...register("lastName",{required:true})}
                        defaultValue={user?.lastName}
                        />
                        {errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your Last Name.
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex lg:flex-row flex-col gap-5 ">
                    <label htmlFor="dateOfBirth" className="w-full">
                        <p className="lable-style mb-1 relative">
                            Date Of Birth
                            <sup className="absolute top-[-15%] pl-1 text-pink-200 text-lg">*</sup>
                        </p>
                        <input 
                        type="date" 
                        placeholder="Enter date Of Birth"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="form-style !bg-richblack-700 w-full "
                        {...register("dateOfBirth", {
                        required: {
                            value: true,
                            message: "Please enter your Date of Birth.",
                        },
                        max: {
                            value: new Date().toISOString().split("T")[0],
                            message: "Date of Birth cannot be in the future.",
                        },
                        })}

                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.dateOfBirth.message}
                            </span>
                        )}
                    </label>
                     <label htmlFor="gender" className="w-full">
                        <p className="lable-style mb-1 relative">
                            Gender
                            <sup className="absolute top-[-15%] pl-1 text-pink-200 text-lg">*</sup>
                        </p>
                        <select 
                        type= "text"
                        name="gender" 
                        id="gender"
                        className="form-style !bg-richblack-700 w-full"
                        defaultValue={user?.additionalDetails?.gender }
                        {...register("gender", {required:true})}
                        >
                            {genders.map((ele,i)=>{
                                return(
                                    <option
                                    key={i} 
                                    value={ele}
                                    >
                                     {ele}   
                                    </option>
                                )
                            })}
                        </select>
                        {errors.gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your gender.
                            </span>
                        )}
                    </label>
                </div>
                
                <div className="flex lg:flex-row flex-col gap-5">
                    <label 
                    htmlFor="contactNumber"
                    className="w-full"
                    >
                        <p className="lable-style mb-1 relative">
                            Contact Number
                            {/* <sup className="absolute top-[-15%] pl-1 text-pink-200 text-lg">*</sup> */}
                        </p>
                        <input 
                        type="tel" 
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        className="form-style !bg-richblack-700 w-full"
                        {...register("contactNumber", {
                            // pattern: {              <---- More Robust
                            //     value: /^(\+?\d{1,3}[-.\s]?)?\d{10}$/,
                            //     message: "Please enter a valid Contact Number"
                            // },
                            maxLength: { value: 12, message: "Invalid Contact Number" },
                            minLength: { value: 10, message: "Invalid Contact Number" },
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.contactNumber.message}
                            </span>
                        )}
                    </label>

                    <label htmlFor="profession" className="w-full">
                        <p className="lable-style mb-1 relative">
                            Profession
                            {/* <sup className="absolute top-[-15%] pl-1 text-pink-200 text-lg">*</sup> */}
                        </p>
                        <input 
                        type="text" 
                        name="profession"
                        id="profession"
                        placeholder="Enter Your Profession"
                        className="form-style !bg-richblack-700 w-full"
                        defaultValue={user?.additionalDetails?.profession }
                        {...register("profession",{
                            maxLength: {
                                value: 50,
                                message: "Profession cannot exceed 50 characters."
                            }
                        })}
                        />
                        {errors.profession && (
                           <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.profession.message}
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <button
                    type="submit"
                    className={`${disable ? "bg-pure-greys-200 hover:bg-pure-greys-500 opacity-50 " 
                        : " bg-yellow-25 hover:bg-yellow-50"} text-richblack-900 px-6 py-3 rounded-full 
                    cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
                    border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd] flex items-center gap-1 justify-center `}
                    
                    >
                    {disable ? <LuSaveOff /> : <LuSave />}
                    Update
                    </button>
                    
                        <button
                        type="button"
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                    className={`bg-richblack-700 text-richblack-50 px-7 py-3 rounded-full 
                    cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
                    border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd]`}
                    >
                        Cancel
                    </button>
                    
                </div>
                
            </form>
        </div>
    )
}
