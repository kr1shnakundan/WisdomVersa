import React from 'react'
import { useSelector } from 'react-redux'
import Iconbtn from '../../common/Iconbtn'
import { FaRegEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
    const {user} = useSelector((state) =>state.profile)

    const navigate = useNavigate();

     // Generate fallback image if user.image is empty or invalid
    const userImage = user?.image && user.image.trim() !== ""
        ? user.image
        : `https://api.dicebear.com/9.x/notionists/svg?seed=Sophia`;

  return (
    <div className='bg-richblack-900'>
        <div className='text-richblack-5 w-11/12 mx-auto min-h-[calc(100vh - 3.5rem)] flex flex-col gap-14 px-10 py-10'>
            <h2 className='text-4xl font-semibold  '>My Profile</h2>
            <div className='bg-richblack-800 rounded-md border border-richblack-700 px-10 py-7 flex flex-col gap-5 sm:flex-row  items-center justify-between'>
                <div className='bg-richblack-800  flex flex-col lg:flex-row gap-4 items-center'>
                    <img src={userImage} alt={`${user?.firstName}`}
                    className='w-[80px] aspect-square object-cover rounded-full' 
                    />
                    <div className=''>
                        <p className='px-5 lg:px-0 text-lg font-semibold'>{user?.firstName} {" "} {user?.lastName}</p>
                        <p className='text-sm text-richblack-300'>{user?.email}</p>
                    </div>
                    
                </div>
                
                    <Iconbtn onclick={()=>{
                        navigate("/dashboard/settings#change-profile-picture")
                    }}>
                        Edit
                        <FaRegEdit/>
                    </Iconbtn>
                
            </div>
            <div className='bg-richblack-800 rounded-md border border-richblack-700 px-10 py-7 min-h-[180px] flex flex-col gap-5 sm:gap-16'>
                <div className='flex  gap-4 items-start sm:items-center justify-between'>
                    <h3 className='text-lg font-semibold mx-auto sm:mx-0'>About</h3>
                     <Iconbtn
                     customClasses='hidden sm:flex'
                     onclick={()=>{
                        navigate("/dashboard/settings#edit-about")
                     }}>
                        Edit
                        <FaRegEdit/>
                    </Iconbtn>
                    
                </div>
                <p className='text-richblack-400'>
                    {
                        user?.additionalDetails?.about ?? "Write something about Yourself"
                    }
                </p>

                <Iconbtn
                    customClasses='sm:hidden mx-auto'
                    onclick={()=>{
                    navigate("/dashboard/settings#edit-about")
                    }}
                >
                    Edit
                    <FaRegEdit/>
                </Iconbtn>
                
            </div>
            {/* <div className='bg-richblack-800 rounded-md border border-richblack-700 px-10 py-7 flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold mx-auto sm:mx-0'>Personal Details</h3>
                     <Iconbtn
                     customClasses={`hidden sm:flex`}
                     onclick={()=>{
                        navigate("/dashboard/settings#edit-profile")
                     }}>
                        Edit
                        <FaRegEdit/>
                    </Iconbtn>
                    
                </div>
              <div className='w-[70%] flex flex-col gap-5 p-5 mt-5'>
                    <div className='flex md:flex-row flex-col justify-between'>
                        <div >
                            <p className='text-richblack-600 mb-2 text-sm'>First Name</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className='text-richblack-600 mb-2 text-sm'>Last Name</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                        </div>
                    </div>
                   
                    <div className='flex md:flex-row flex-col justify-between'>
                        <div>
                            <p className='text-richblack-600 mb-2 text-sm'>Email</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                        </div>
                        <div>
                            <p className='text-richblack-600 mb-2 text-sm'>Phone Number</p>
                            <p className={`text-sm font-medium ${user?.additionalDetails?.contactNumber ? "text-richblack-5" 
                                : "text-richblack-300"
                            }`}>
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col justify-between'>
                        <div>
                            <p className='text-richblack-600 mb-2 text-sm'>Gender</p>
                            <p className={`text-sm font-medium ${user?.additionalDetails?.gender ? "text-richblack-5" 
                                : "text-richblack-300"
                            }`}>
                                {user?.additionalDetails?.gender?? "Add Gender"}
                            </p>
                        </div>
                        <div>
                            <p className='text-richblack-600 mb-2 text-sm'>Date of Birth</p>
                            <p className={`text-sm font-medium ${user?.additionalDetails?.dateOfBirth ? "text-richblack-5" 
                                : "text-richblack-300"
                            }`}>
                                {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
                            </p>
                        </div>
                    </div>
              </div>
                

              
                <Iconbtn
                    customClasses={` sm:hidden mx-auto`}
                    onclick={()=>{
                    navigate("/dashboard/settings#edit-profile")
                    }}>
                    Edit
                    <FaRegEdit/>
                </Iconbtn>
                
            </div> */}


            <div className='bg-richblack-800 rounded-md border border-richblack-700 px-10 py-7 flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold mx-auto sm:mx-0'>Personal Details</h3>
                    <Iconbtn
                    customClasses='hidden sm:flex'
                    onclick={()=>{
                        navigate("/dashboard/settings#edit-profile")
                    }}
                    >
                    Edit
                    <FaRegEdit/>
                    </Iconbtn>
                </div>
                
                <div className='w-full flex flex-col gap-5 p-5 mt-5'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-20 lg:gap-x-40'>
                    <div>
                        <p className='text-richblack-600 mb-2 text-sm'>First Name</p>
                        <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                    </div>
                    <div>
                        <p className='text-richblack-600 mb-2 text-sm'>Last Name</p>
                        <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                    </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-20 lg:gap-x-40'>
                    <div>
                        <p className='text-richblack-600 mb-2 text-sm'>Email</p>
                        <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                    </div>
                    <div>
                        <p className='text-richblack-600 mb-2 text-sm'>Phone Number</p>
                        <p className={`text-sm font-medium ${user?.additionalDetails?.contactNumber ? "text-richblack-5" : "text-richblack-300"}`}>
                        {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                        </p>
                    </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-20 lg:gap-x-40'>
                    <div>
                        <p className='text-richblack-600 mb-2 text-sm'>Gender</p>
                        <p className={`text-sm font-medium ${user?.additionalDetails?.gender ? "text-richblack-5" : "text-richblack-300"}`}>
                        {user?.additionalDetails?.gender ?? "Add Gender"}
                        </p>
                    </div>
                    <div>
                        <p className='text-richblack-600 mb-2 text-sm'>Date of Birth</p>
                        <p className={`text-sm font-medium ${user?.additionalDetails?.dateOfBirth ? "text-richblack-5" : "text-richblack-300"}`}>
                        {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
                        </p>
                    </div>
                    </div>
                </div>

                {/* DUPLICATE BTN FOR MOBILE VIEW */}
                <Iconbtn
                    customClasses='sm:hidden mx-auto'
                    onclick={()=>{
                    navigate("/dashboard/settings#edit-profile")
                    }}
                >
                    Edit
                    <FaRegEdit/>
                </Iconbtn>
                </div>

        </div>
    </div>
  )
}

export default MyProfile