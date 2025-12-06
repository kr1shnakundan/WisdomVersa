import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditAbout from "./EditAbout";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {

    const location = useLocation();
    useEffect(() => {
        // Scroll to section when hash changes
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [location]);
    return(
        <>
            <h2 className="text-richblack-50 text-3xl font-semibold mt-5">Edit Profile</h2>
            <div
            className="flex flex-col gap-11"
            >
               <div id="change-profile-picture">
                    <ChangeProfilePicture />
                </div>
                <div id="edit-about">
                    <EditAbout />
                </div>
                <div id="edit-profile">
                    <EditProfile />
                </div>
                <div id="update-password">
                    <UpdatePassword />
                </div>
                <div id="delete-account">
                    <DeleteAccount />
                </div>
            </div>
        </>
    )
}