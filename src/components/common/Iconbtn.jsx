// import React from 'react'

// const Iconbtn = () => {
    
//   return (
//     <div>

//     </div>
//   )
// }

// export default Iconbtn

import React from 'react'

export default function Iconbtn ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,

}) {
    return(
        <button
        disabled={disabled}
        onClick={onclick}
        className={`flex  items-center ${
            outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}
             rounded-md cursor-pointer  gap-2 px-5 py-2 font-semibold text-richblack-900 ${customClasses}
        `}
        type={type}
        >
        {
            children ? (
                <>
                    <span className={`${outline ? "text-yellow-50" : "text-richblack-900"}`}>{text}</span>
                    {children}
                </>
            ) : 
            (
                {text}
            )
        }
        </button>
    )
}
