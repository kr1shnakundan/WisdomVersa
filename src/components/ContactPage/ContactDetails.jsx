import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon2 from "react-icons/hi2"
import * as Icon3 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@wisdomversa.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "River View 1st Block 1st Cross, Koni , Bilaspur-495009",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className='lg:w-[40%] flex flex-col gap-6 bg-richblack-800 p-6  h-[390px] rounded-xl'>
        {
            contactDetails.map((contact,i)=>{
                let Icon = Icon1[contact.icon] || Icon2[contact.icon] || Icon3[contact.icon]
                return(
                    <div key={i} className='p-3 text-richblack-100 '>
                        <div className='flex gap-2'>
                            <Icon size={25} />
                           <h2 className='text-lg font-semibold text-richblack-5'> {contact.heading}</h2>
                        </div>
                        <div className='text-sm text-richblack-200 px-8'>
                            {contact.description}
                        </div>
                        <div className='text-sm text-richblack-200 font-semibold px-8'>
                            {contact.details}
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ContactDetails