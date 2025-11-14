import React from 'react'
import Iconbtn from './Iconbtn'

function ConfirmationModal ({modalData}) {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
            <h2 className="text-2xl font-semibold text-richblack-5">
              {modalData?.text1}
            </h2>
            <p className='mt-3 mb-5 leading-6 text-richblack-200 '>
              {modalData?.text2}
            </p>
            <div className='flex gap-4'>
                <Iconbtn
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
                
                />
                    
    
                <button
                className='bg-pure-greys-300 px-5 py-3 rounded-md cursor-pointer text-richblack-900 font-semibold'
                onClick={modalData?.btn2Handler}
                >
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal