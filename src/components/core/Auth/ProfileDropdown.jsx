import React, { useRef, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard ,VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const ProfileDropdown = () => {
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef(null)
    
    // console.log("user in profileDropdown is : ",user);

    const [open , setOpen] = useState(false);
    // console.log("open is : ",open);

    // Generate fallback image if user.image is empty or invalid
    const userImage = user?.image && user.image.trim() !== ""
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`;

// https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}


    useOnClickOutside(ref,()=>setOpen(false));

    if (!user) return null  

  return (
    <button className='relative' onClick={()=>setOpen((prev) =>!prev)}>
        
        
            <div 
            // onClick={()=>setOpen((prev)=>!prev)}
            className='flex gap-1 items-center text-richblack-100 '
            >
                <img 
                className='aspect-square w-[30px] rounded-full object-cover'
                src={userImage} 
                alt={`${user?.firstName}`}
                />
                <AiOutlineCaretDown className='text-sm text-richblack-100' />
            </div>
            {
                open && (
                    <div 
                    className='text-richblack-100 absolute top-[100%] -right-2 z-[1000] divide-y-[1px] divide-richblack-700
                             overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
                    onClick={(e) => e.stopPropagation()}
                    ref={ref}
                    >
                        <Link 
                        onClick={()=>setOpen(false)}
                        to={"/dashboard/my-profile"}
                        className='flex px-[10px] py-3 items-center justify-center gap-1 w-full  text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'
                        >
                            <VscDashboard  className='text-lg'/> Dashboard
                        </Link>
                        <Link 
                        
                        onClick={()=>{
                            dispatch(logout(navigate))
                            setOpen(false)
                        }}
                        className='flex px-[10px] py-3 items-center justify-center gap-1 w-full  text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'
                        >
                            <VscSignOut className='text-lg'/> Log out
                        </Link>
                    </div>
                )
            }
       
    </button>
    
  )
}

export default ProfileDropdown