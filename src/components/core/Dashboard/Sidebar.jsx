import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLinks from './SidebarLinks'
import { AiOutlineLogout } from 'react-icons/ai'
import { logout } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'


const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user ,loading : profileLoading}  = useSelector((state)=> state.profile)
    const {loading : authLoading} = useSelector((state)=> state.auth)

    //to keep the track of confirmation modal
    const [confirmationModal , setConfirmationModal] = useState(null);


    if(profileLoading || authLoading){
        console.log("profile or auth is loading -----")
        return (
            
            <div className='grid items-center h-[calc(100vh-3.5rem)] min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                <div className='spinner'></div>   
            </div>
        )
    }
  return (
    <>

        <div className='text-richblack-5'>
            <div>
                {
                    sidebarLinks.map((link)=>{
                        if(link.type && user?.accountType !== link.type) return null
                        return(
                            
                            <SidebarLinks key={link.id} link={link} iconName = {link.icon} />
                            
                        )
                    })
                }
            </div> 
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
            <div>
                <SidebarLinks 
                link={{name:"Settings" ,path:"/dashboard/settings"}}
                iconName={"VscSettingsGear"}

                />
            </div>
            <button
            onClick={()=>
                setConfirmationModal({
                    text1:"Are you Sure ? ",
                    text2:"You will be logged Out of your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler : () => dispatch(logout(navigate)),
                    btn2Handler : () => setConfirmationModal(null)


                })
            }
            >
                <div>
                    <AiOutlineLogout />
                    <span>Logout</span>
                </div>
            </button>
        </div>
        {
          confirmationModal &&  <ConfirmationModal modalData={confirmationModal} />
        }
    </>
  )
}

export default Sidebar