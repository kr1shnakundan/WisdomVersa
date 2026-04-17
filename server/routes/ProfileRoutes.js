const express = require("express")
const router = express.Router()

const {auth, isStudent, isAdmin ,isInstructor, requireRecentAuthFromToken } = require("../middlewares/authMiddleware")

const {updateProfile, 
    deleteAccount, 
    getUserDetails, 
    updateDisplayPicture, 
    getEnrolledCourses,
    instructorDashboard,
    deleteGoogleAccount} = require("../controllers/ProfileController")
    // console.log("S-2: profileRoutes.....")

router.put("/updateProfile",auth ,  updateProfile)
router.delete("/deleteAccount" , auth , deleteAccount)
router.get("/getUserDetails",auth ,getUserDetails)
router.put("/updateDisplayPicture",auth ,updateDisplayPicture)
router.get("/getEnrolledCourses",auth ,getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
router.delete("/deleteGoogleAccount",requireRecentAuthFromToken,deleteGoogleAccount)

module.exports = router


//...........Incomplete