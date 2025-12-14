const express = require("express")
const router = express.Router()

const {auth, isStudent, isAdmin ,isInstructor } = require("../middlewares/authMiddleware")

const {updateProfile, 
    deleteAccount, 
    getUserDetails, 
    updateDisplayPicture, 
    getEnrolledCourses,
    instructorDashboard} = require("../controllers/ProfileController")
    // console.log("S-2: profileRoutes.....")

router.put("/updateProfile",auth ,  updateProfile)
router.delete("/deleteAccount" , auth , deleteAccount)
router.get("/getUserDetails",auth ,getUserDetails)
router.put("/updateDisplayPicture",auth ,updateDisplayPicture)
router.get("/getEnrolledCourses",auth ,getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router


//...........Incomplete