import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
    return(
        <>
            <h2 className="text-richblack-50 text-3xl font-semibold mt-5">Edit Profile</h2>
            <div>
                <ChangeProfilePicture />
                <EditProfile />
                <UpdatePassword/>
                <DeleteAccount/>
            </div>
        </>
    )
}