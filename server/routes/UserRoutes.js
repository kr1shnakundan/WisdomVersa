const express = require("express")
const router = express.Router()

const{auth} = require("../middlewares/authMiddleware")
const { login, signup, changePassword, sendotp } = require("../controllers/Auth")
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword")

//*************************************************************************************** */
//                             Authentication Route
//*************************************************************************************** */
router.post("/login", login)
router.post("/signup",signup)
router.post("/changepassword",auth , changePassword)
router.post("/sendotp", sendotp)

///////////////////////////////////////////////////////////////////////////////////////////
//                                   Reset Password                                     //
//////////////////////////////////////////////////////////////////////////////////////////
router.post("/reset-password-token",resetPasswordToken)
router.post("/reset-password",resetPassword)

module.exports = router