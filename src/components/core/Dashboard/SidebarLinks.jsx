import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import { resetCourseState } from '../../../slices/courseSlice'

// NEED TO ADD RESETCOURSESTATE<---------------------

const SidebarLinks = ({link , iconName , onLinkClick}) => {
    const Icon =  Icons[iconName]
    const dispatch = useDispatch();
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const handleClick = () => {
      dispatch(resetCourseState()) // Uncomment when needed<------------------------------
      if (onLinkClick) {
        onLinkClick(); // Close mobile menu
      }
    }
  return (

    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
        <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50
          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
          `}
        >

        </span>
        <div className={`flex  gap-2 items-center font-semibold  ${matchRoute(link.path) ? "text-lg" : "text-medium"}`}>
            <Icon className="text-lg" />
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLinks



// import React, { forwardRef } from "react"
// import * as Icons from "react-icons/vsc"
// import { NavLink, matchPath, useLocation } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { resetCourseState } from "../../../slices/courseSlice"

// const SidebarLinks = forwardRef(({ link, iconName, onLinkClick }, ref) => {
//   const Icon = Icons[iconName]
//   const location = useLocation()
//   const dispatch = useDispatch()

//   const isActive = matchPath({ path: link.path }, location.pathname)

//   const handleClick = () => {
//     dispatch(resetCourseState())
//     onLinkClick?.()
//   }

//   return (
//     <NavLink
//       ref={ref}
//       to={link.path}
//       onClick={handleClick}
//       data-active={isActive ? "true" : "false"}
//       className={`px-8 py-2 text-sm font-medium transition-all duration-200
//         ${isActive
//           ? "text-yellow-50 bg-yellow-800/20"
//           : "text-richblack-300 hover:bg-richblack-700"}
//       `}
//     >
//       <div className="flex items-center gap-2 font-semibold">
//         <Icon className="text-lg" />
//         <span>{link.name}</span>
//       </div>
//     </NavLink>
//   )
// })

// export default SidebarLinks
