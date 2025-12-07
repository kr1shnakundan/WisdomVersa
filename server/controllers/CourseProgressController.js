const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
exports.updateCourseProgress = async(req,res)=>{
    const { courseId, subsectionId } = req.body
    const userId = req.user.id

    try{
       
        // Check if the subsection is valid
        const subsection = await SubSection.findById(subsectionId)
        if (!subsection) {
            return res.status(404).json({ error: "Invalid subsection" })
        }

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })
        if (!courseProgress) {
            // If course progress doesn't exist, create a new one
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        } else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subsectionId)) {
                return res.status(400).json({ error: "Subsection already completed" })
            }
            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subsectionId)
            await courseProgress.save()
        }
        return res.status(200).json({ message: "Course progress updated" })

    } catch(error){
        console.log("updateCourseProgress error : " ,error)
        return res.status(500).json({
            success:false,
            message:`error occured while updating course Progress `
        })
    }
}

//Need to be checked<----------------------------------------------------------------
exports.markCourseAsComplete = async(req,res)=>{

    const { courseId } = req.body
    const userId = req.user.id
    try{
        let courseProgressDetails = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })
        if (!courseProgressDetails) {
            return res.status(404).json({
                success: false,
                message: "Course progress does not exist for this user/course"
            });
        }

        if(courseProgressDetails.isCompleted){
            
            return res.status(400).json({
                success:false,
                message:"This Course is already Completed. "
            })
            
        }

        courseProgressDetails.isCompleted = true;
        await courseProgressDetails.save();

        return res.status(200).json({
            success:true,
            message:"Course is marked as Completed",
            data: courseProgressDetails
        })

    } catch(error){
        console.log("Error in markCourseAsComplete" ,error)
        return res.status(500).json({
            success:false,
            message:"Unable to mark Course As Complete"
        })
    }
}


exports.unenrollFromCourse = async (req, res) => {
  const { courseId } = req.body
  const userId = req.user.id

  try {
    // Validate required fields
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      })
    }

    let courseProgressDetails = await CourseProgress.findOneAndDelete({
                                        courseID: courseId,
                                        userId: userId,
    })
    

    //THIS is causing error when  we click unenroll icon in EnrolledCourse in dashboard.<---------------------
    if(!courseProgressDetails){
        console.log("Error in courseProgressDetails: ",courseProgressDetails)
        return res.status(400).json({
            success:false,
            message:"Unable to delete courseProgress"
        })
    } 
    
    let userUpdate = await User.findByIdAndUpdate(
        userId,
        { $pull: { courses: courseId } },
        { new: true }
    )

    if (!userUpdate) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    let courseUpdate = await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentEnrolled: userId } },
        { new: true }
    )

    if (!courseUpdate) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Delete course progress and update both schemas in parallel
    // const [courseProgress, userUpdate, courseUpdate] = await Promise.all([
 
    //   CourseProgress.findOneAndDelete({
    //     courseID: courseId,
    //     userId: userId,
    //   }),
      
  
    //   User.findByIdAndUpdate(
    //     userId,
    //     { $pull: { courses: courseId } },
    //     { new: true }
    //   ),
      
   
    //   Course.findByIdAndUpdate(
    //     courseId,
    //     { $pull: { studentEnrolled: userId } },
    //     { new: true }
    //   )
    // ])


    // if (!courseProgress) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "You are not enrolled in this course",
    //   })
    // }

 
    // if (!userUpdate) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   })
    // }


    // if (!courseUpdate) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Course not found",
    //   })
    // }

    return res.status(200).json({
      success: true,
      message: "Successfully unenrolled from the course",
      data: {
        courseId: courseId,
        userId: userId,
        removedProgress: true,
        remainingCoursesCount: userUpdate.courses.length,
        remainingStudentsCount: courseUpdate.studentEnrolled.length,
      },
    })

  } catch (error) {
    console.error("Error in unenrollFromCourse:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while unenrolling from course",
      error: error.message,
    })
  }
}