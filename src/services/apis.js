const BASE_URL = "http://localhost:4000/api/v1"


//authorization api
export const endpoints = {
    SENDOTP_API:BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASS_API : BASE_URL + "/auth/reset-password",

    GETUSERDETAILS_API : BASE_URL + "/profile/getUserDetails"
}


//category api
export const category = {
    CATEGORY_URL: BASE_URL +  "/course/showAllCategories",
}

//contactUs api
export const contactusEndpoints = {
    CONTACT_US_URL : BASE_URL + "/reach/contact"
}

export const profileEndPoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

export const settingsEndPoints = {
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changepassword",
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}