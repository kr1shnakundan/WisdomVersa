const express = require("express")
const router = express.Router()

const {auth , isAdmin,isStudent , isInstructor} = require("../middlewares/authMiddleware")

//courseController Imports
const {createCourse ,
    getAllCourse,
    getCourseDetails,
    getInstructorCourses,
    getFullCourseDetails,
    editCourse,
    deleteCourse,
} = require("../controllers/CourseController")

//import category controller
const {createCategory ,
    showAllCategories,
    categoryPageDetails
} = require("../controllers/CategoryController")

//import section controller
const {createSection ,
    updateSection,
    deleteSection
} = require("../controllers/SectionController")

//import sub-section controller

const {createSubSection ,
    updateSubSection,
    deleteSubSection
} = require("../controllers/subSectionController")


//import rating 
const {
    createRating ,
    getAverageRating,
    getAllRatings
} = require("../controllers/RatingAndReviewController")

//importing course progress
const {
    updateCourseProgress,
    markCourseAsComplete,
    unenrollFromCourse
} = require("../controllers/CourseProgressController")


//course can only be created by instructor
router.post("/createCourse",auth , isInstructor,createCourse)
router.post("/editCourse",auth , isInstructor, editCourse)

//only instructor can make changes in section
router.post("/addSection",auth , isInstructor,createSection)
router.post("/deleteSection",auth , isInstructor,deleteSection)
router.post("/updateSection",auth , isInstructor,updateSection)

//only instructor can make changes in subSection
router.post("/addSubSection",auth , isInstructor,createSubSection)
router.post("/updateSubSection",auth , isInstructor,updateSubSection)
router.post("/deleteSubSection",auth , isInstructor,deleteSubSection)

router.get("/getInstructorCourses",auth , isInstructor , getInstructorCourses)

router.post("/getFullCourseDetails",auth , getFullCourseDetails)
//...............................................why somewhere get and somewhere post?
router.get("/getCourseDetails",getCourseDetails)

router.get("/getAllCourses",getAllCourse)

router.delete("/deleteCourse",deleteCourse)

router.post("/updateCourseProgress",auth , isStudent,updateCourseProgress)

router.post("/markCourseComplete",auth , isStudent , markCourseAsComplete)

router.post("/unenrollCourse",auth ,isStudent , unenrollFromCourse)


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

//category can only be created by admin
router.post("/createCategory",auth , isAdmin,createCategory)
router.get("/showAllCategories",showAllCategories)
router.post("/getCategoryPageDetails",categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating",auth , isStudent,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getAllRatings",getAllRatings)


module.exports = router
