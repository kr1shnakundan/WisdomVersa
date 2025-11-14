import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

// NEED TO ADD RESETCOURSESTATE<---------------------

const SidebarLinks = ({link , iconName}) => {
    const Icon =  Icons[iconName]
    const dispatch = useDispatch();
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
  return (
    // <NavLink
    // to={link.path}
    // // onClick={()=>dispatch(resetCourseState())}<------------------------------
    // className={`${matchRoute ?
    //     "bg-yellow-800 text-yellow-50": "bg-opacity-0 text-richblack-300"
    // }`}>

    <NavLink
      to={link.path}
    //   onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
        <span
        className={`${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
        >

        </span>
        <div>
            <Icon />
            {link.name}
        </div>
    </NavLink>
  )
}

export default SidebarLinks