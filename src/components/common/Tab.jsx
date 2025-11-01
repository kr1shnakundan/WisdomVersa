import React from 'react'

export default function Tab  ({tabData,field , setfield}) {
  return (
    <div className='flex justify-between items-center bg-richblack-800 text-richblack-5 p-1 gap-1 rounded-full
                    my-6 w-[50%] shadow-[inset_0_-1px_0_rgba(255,255,255,0.18)] max-w-max'>
        {
            tabData.map((tab) =>(
               
                <button key={tab.id} 
                onClick={()=> setfield(tab.type)}
                className={`px-5 py-2 mx-auto rounded-full transition-all duration-200 ${field === tab.type ? "bg-richblack-900" : "bg-transparent text-richblack-200"}`}
                >
                    {tab?.tabName}

                </button>
                
            ))
        }
    </div>
  )
}
