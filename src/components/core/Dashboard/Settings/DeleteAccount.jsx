
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { deleteProfile } from "../../../../services/operations/SettingsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteAccount(){
    const [confirmationModal, setConfirmationModal] = useState(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)

    // Handler that receives password from modal
    const deleteProfileHandler = (password) => {
        if(!password || !password.trim()){
            toast.error("Password is required to delete account")
            return
        }
        dispatch(deleteProfile(password, token, navigate));
        setConfirmationModal(null);
    }

    return(
        <>
            <div className="text-richblack-5 my-10 flex flex-col sm:flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 py-8 px-5 sm:px-12">
                <section className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                    <FiTrash2 className="text-pink-200 text-3xl" />
                </section>
                <section className="flex flex-col space-y-2 mt-3">
                    <h3 className="text-lg font-semibold text-richblack-5">Delete Account</h3>
                    <div className="md:w-4/5 text-pink-25 flex md:flex-row flex-col gap-2">
                        <p className="whitespace-nowrap font-semibold text-pink-300">Warning : </p>
                        <p>
                            This account may contain Paid Courses. 
                            Deleting your account is permanent and will remove all the content associated with it.
                            Proceed only if you fully understand the consequences.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you Sure?",
                                text2: "Your account will be deleted permanently. Please enter your password to confirm.",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: deleteProfileHandler,
                                btn2Handler: () => setConfirmationModal(null),
                                requirePassword: true
                            })
                        }
                        className="w-fit cursor-pointer italic md:pl-20 text-pink-300"
                    >
                        Delete My Account
                    </button>
                </section>
            </div>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </>
    )
}