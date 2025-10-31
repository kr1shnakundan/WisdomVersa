const BASE_URL = "http://localhost:4000/api/v1"


//authorization api
export const endpoints = {
    SENDOTP_API:BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASS_API : BASE_URL + "/auth/reset-password",



}


//category api
export const category = {
    CATEGORY_URL: BASE_URL +  "/course/showAllCategories",
}