import React from 'react'
import Template from '../components/core/Auth/Template'
import image1 from '../assets/Images/signup.webp'

const Signup = () => {
  return (
    <div className='bg-richblack-900'>
        <Template 
            heading={"Join the millions learing to code with WisdomVersa for free"}
            desc1={"Build skills for today , tommorow and beyond."}
            desc2={" Education to future-proof your career."}
            image={image1}
            formType={"signup"}
            // setIsLoggedIn={setIsLoggedIn}
        />

    </div>
  )
}

export default Signup