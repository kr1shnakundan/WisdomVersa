import React from 'react'
import ContactDetails from '../components/ContactPage/ContactDetails'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'

const Contact = () => {
  return (
    <div className='text-richblack-5 '>
        <div>
            <section className='w-11/12 max-w-maxContent mt-10 mx-auto flex flex-col lg:flex-row gap-5 px-5'>
                <ContactDetails />
                <div className='lg:w-[55%] mx-auto px-5 flex flex-col gap-8 border border-richblack-600 rounded-lg py-8'>
                    <div className='px-4'>
                        <h2 className='text-4xl font-semibold text-richblack-5'>
                            Got a Idea? We’ve got the skills. Let’s team up
                        </h2>
                        <p className='text-richblack-300 py-3'>
                            Tall us more about yourself and what you’re got in mind.
                        </p>
                    </div>
                    <ContactUsForm />
                </div>

            </section>

            <section>
                <h2 className='text-center text-4xl font-semibold mt-32'>Reviews from other learners</h2>
                {/* -----------------------------------ADD REVIEW section  */}
            </section>

        </div>
        <Footer/>
    </div>
  )
}

export default Contact