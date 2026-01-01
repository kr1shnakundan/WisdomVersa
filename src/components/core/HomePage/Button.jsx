import React from 'react'
import { Link } from 'react-router-dom'

const  Button = ({children , active , linkTo ,state}) => {
  return (
    <Link 
    state={state}
    to={linkTo}
    >
        <div className={` text-center text-[13px] px-6 py-3 sm:text-[16px] rounded-md font-bold shadow-[2px_2px_6px_0px_rgba(225,225,225,0.3)]
        ${active? "bg-yellow-50 text-black" : "bg-richblack-800"}
        hover:shadow-none hover:scale-95 transition-all duration-200`}>

            {children}
        </div>
    </Link>
  );
};

export default Button