const BASE_URL = "http://localhost:4000/api/v1"


//authorization api
export const endpoints = {
    SENDOTP_API:BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASS_API : BASE_URL + "/auth/reset-password",

    GETME_API : BASE_URL + "/profile/getUserDetails"
}


//category api
export const category = {
    CATEGORY_URL: BASE_URL +  "/course/showAllCategories",
}

//contactUs api
export const contactusEndpoints = {
    CONTACT_US_URL : BASE_URL + "/reach/contact"
}