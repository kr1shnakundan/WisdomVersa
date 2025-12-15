import React, { useState } from 'react'
import Iconbtn from './Iconbtn'

function ConfirmationModal({modalData}) {
    // Local state for password if required
    const [localPassword, setLocalPassword] = useState("");
    
    const handleBtn1Click = () => {
        if (modalData?.requirePassword) {
            // Pass the password to the handler
            modalData?.btn1Handler?.(localPassword);
        } else {
            modalData?.btn1Handler?.();
        }
    };

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
                <h2 className="text-2xl font-semibold text-richblack-5">
                    {modalData?.text1}
                </h2>
                <div className='mt-3 mb-5 leading-6 text-richblack-200'>
                    {modalData?.text2}
                </div>
                
                {/* Conditional password input */}
                {modalData?.requirePassword && (
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-richblack-5">
                            Enter your password to confirm:
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={localPassword}
                            onChange={(e) => setLocalPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            autoFocus
                        />
                    </div>
                )}
                
                <div className='flex flex-col sm:flex-row gap-4'>
                    <Iconbtn
                        customClasses={`mx-auto sm:mx-0`}
                        onclick={handleBtn1Click}
                        text={modalData?.btn1Text}
                    />
                    <button
                        className='bg-pure-greys-300 mx-auto sm:mx-0 px-5 py-3 rounded-md cursor-pointer text-richblack-900 font-semibold'
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