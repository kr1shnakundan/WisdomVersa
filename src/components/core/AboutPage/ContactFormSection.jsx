import React, { useState } from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='py-10 px-4 lg:w-[41%] text-richblack-200 '>
        <h2 className='text-center text-[2.25rem] leading-[2.75rem] mb-4 font-semibold text-richblack-5'>
            Get In Touch
        </h2>
        <p className='text-center mb-8'>
            We&apos;d love to here for you, Please fill out this form.
        </p>
        <div className='mx-auto mt-12'>
            <ContactUsForm />
        </div>
        

    </div>
  )
}

export default ContactFormSection