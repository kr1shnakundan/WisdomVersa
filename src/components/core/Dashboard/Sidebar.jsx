import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLinks from './SidebarLinks'
import { AiOutlineLogout, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { VscSettingsGear } from 'react-icons/vsc'
import { logout } from '../../../services/operations/authAPI'
import { useNavigate, matchPath, useLocation } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {user, loading: profileLoading} = useSelector((state) => state.profile)
  const {loading: authLoading} = useSelector((state) => state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  if(profileLoading || authLoading){
    console.log("profile or auth is loading -----")
    return (
      <div className='grid items-center h-[calc(100vh-3.5rem)] min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800'>
        <div className='spinner'></div>   
      </div>
    )
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you Sure?",
      text2: "You will be logged Out of your Account",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => {
        dispatch(logout(navigate));
        closeMobileMenu();
      },
      btn2Handler: () => setConfirmationModal(null)
    });
  };

  // Separate instructor-specific links
  const instructorLinks = sidebarLinks.filter(link => link.type === "Instructor");
  const generalLinks = sidebarLinks.filter(link => !link.type || link.type !== "Instructor");


  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className='md:hidden fixed top-[4.5rem] left-4 z-10 p-2 rounded-md bg-richblack-800 text-richblack-25 border border-richblack-700'
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10
        h-[calc(100vh-3.5rem)] min-w-[220px]
        fixed md:sticky top-[3.5rem] left-0 z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className='flex flex-col mt-7 md:mt-0'>
          {generalLinks.map((link) => {
            if(link.type && user?.accountType !== link.type) return null
            return(
              <SidebarLinks 
                key={link.id} 
                link={link} 
                iconName={link.icon}
                onLinkClick={closeMobileMenu}
              />
            )
          })}
        </div> 

        {/* Instructor Section - Only visible for instructors */}
        {user?.accountType === "Instructor" && instructorLinks.length > 0 && (
          <>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
            
            <div className='flex flex-col'>
              <div className='px-8 py-2 text-xs font-semibold text-richblack-400 uppercase tracking-wider'>
                Instructor
              </div>
              {instructorLinks.map((link) => (
                <SidebarLinks 
                  key={link.id} 
                  link={link} 
                  iconName={link.icon}
                  onLinkClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}

        
        <div className="flex-1" />

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        <div className='flex flex-col'>
          <SidebarLinks 
            link={{name: "Settings", path: "/dashboard/settings"}}
            iconName="VscSettingsGear"
            onLinkClick={closeMobileMenu}
          />
        </div>

        <button
          onClick={handleLogout}
          className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
            matchRoute("/logout")
              ? "bg-yellow-800 text-yellow-50"
              : "bg-opacity-0 text-richblack-300"
          } hover:bg-richblack-700 hover:text-richblack-25`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
              matchRoute("/logout") ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className='flex items-center gap-x-2'>
            <AiOutlineLogout className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default Sidebar

// import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useLocation, useNavigate, matchPath } from "react-router-dom"
// import { sidebarLinks } from "../../../data/dashboard-links"
// import SidebarLinks from "./SidebarLinks"
// import CurvedActivePath from "./CurvedActivePath"
// import { AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
// import { logout } from "../../../services/operations/authAPI"
// import ConfirmationModal from "../../common/ConfirmationModal"

// const Sidebar = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [pathHeight, setPathHeight] = useState(0)
//   const [activeLinkWidth, setActiveLinkWidth] = useState(0)
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   const sidebarRef = useRef(null)
//   const linkRefs = useRef({})

//   const matchRoute = (route) =>
//     matchPath({ path: route }, location.pathname)

//   /* ----------------------------------------------------
//      Calculate curved path dimensions
//      ---------------------------------------------------- */
//   useEffect(() => {
//     const sidebar = sidebarRef.current
//     if (!sidebar) return

//     const activeLink = Object.values(linkRefs.current).find(
//       (el) => el?.dataset?.active === "true"
//     )

//     if (activeLink) {
//       const sidebarRect = sidebar.getBoundingClientRect()
//       const linkRect = activeLink.getBoundingClientRect()

//       // From bottom of sidebar → TOP of active link
//       const heightFromBottom =
//         sidebarRect.bottom - linkRect.top

//       setPathHeight(heightFromBottom)
//       setActiveLinkWidth(linkRect.width)
//     }
//   }, [location.pathname])

//   if (profileLoading || authLoading) {
//     return (
//       <div className="h-[calc(100vh-3.5rem)] min-w-[220px] bg-richblack-800" />
//     )
//   }

//   const instructorLinks = sidebarLinks.filter(
//     (l) => l.type === "Instructor"
//   )
//   const generalLinks = sidebarLinks.filter(
//     (l) => !l.type || l.type !== "Instructor"
//   )

//   const handleLogout = () => {
//     setConfirmationModal({
//       text1: "Are you sure?",
//       text2: "You will be logged out of your account.",
//       btn1Text: "Logout",
//       btn2Text: "Cancel",
//       btn1Handler: () => dispatch(logout(navigate)),
//       btn2Handler: () => setConfirmationModal(null),
//     })
//   }

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         onClick={() => setIsMobileMenuOpen((p) => !p)}
//         className="md:hidden fixed top-[4.5rem] left-4 z-50 p-2
//                    bg-richblack-800 border border-richblack-700 rounded"
//       >
//         {isMobileMenuOpen ? (
//           <AiOutlineClose className="text-xl" />
//         ) : (
//           <AiOutlineMenu className="text-xl" />
//         )}
//       </button>

//       {/* Mobile overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         ref={sidebarRef}
//         className={`
//           fixed md:sticky top-[3.5rem] left-0 z-40
//           h-[calc(100vh-3.5rem)] min-w-[220px]
//           bg-richblack-800 border-r border-richblack-700
//           flex flex-col py-10 relative
//           transition-transform duration-300
//           ${isMobileMenuOpen
//             ? "translate-x-0"
//             : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         {/* 🔥 Curved yellow indicator */}
//         <CurvedActivePath
//           height={pathHeight}
//           activeWidth={activeLinkWidth}
//         />

//         {/* General links */}
//         <div className="flex flex-col mt-6">
//           {generalLinks.map((link) => {
//             if (link.type && link.type !== user?.accountType) return null

//             return (
//               <SidebarLinks
//                 key={link.id}
//                 link={link}
//                 iconName={link.icon}
//                 onLinkClick={() => setIsMobileMenuOpen(false)}
//                 ref={(el) => (linkRefs.current[link.path] = el)}
//               />
//             )
//           })}
//         </div>

//         {/* Instructor section */}
//         {user?.accountType === "Instructor" && instructorLinks.length > 0 && (
//           <>
//             <div className="my-6 mx-auto h-px w-10/12 bg-richblack-700" />
//             {instructorLinks.map((link) => (
//               <SidebarLinks
//                 key={link.id}
//                 link={link}
//                 iconName={link.icon}
//                 onLinkClick={() => setIsMobileMenuOpen(false)}
//                 ref={(el) => (linkRefs.current[link.path] = el)}
//               />
//             ))}
//           </>
//         )}

//         <div className="flex-1" />

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="px-8 py-2 text-sm text-richblack-300
//                      hover:bg-richblack-700 hover:text-richblack-25
//                      flex items-center gap-2"
//         >
//           <AiOutlineLogout className="text-lg" />
//           Logout
//         </button>
//       </aside>

//       {confirmationModal && (
//         <ConfirmationModal modalData={confirmationModal} />
//       )}
//     </>
//   )
// }

// export default Sidebar
