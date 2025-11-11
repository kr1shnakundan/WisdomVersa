import React from 'react'
import Iconbtn from './Iconbtn'

function ConfirmationModal ({modalData}) {
  return (
    <div className='text-richblack-5'>
        <div>
            <h2>{modalData?.text1}</h2>
            <p>{modalData?.text2}</p>
            <div>
                <Iconbtn
                onClick={modalData?.btn1Handler}
                text={modalData?.btn1Text.text}
                
                />
                    
    
                <button
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