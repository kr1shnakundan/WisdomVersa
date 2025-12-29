const mongoose = require('mongoose')
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")


//Need of check<-------------
exports.updateCourseProgress = async(req, res) => {
    const { courseId, subSectionId  } = req.body;
    const userId = req.user.id;
    
    try {
        // Validate required fields
        if (!courseId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Course ID and Subsection ID are required"
            });
        }

        // Check if the subsection is valid
        const subsection = await SubSection.findById(subSectionId);
        if (!subsection) {
            return res.status(404).json({ 
                success: false,
                error: "Invalid subsection" 
            });
        }

        // Check if already completed BEFORE updating (more efficient)
        const existingProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
            completedVideos: subSectionId
        });

        if (existingProgress) {
            return res.status(200).json({
                success: true,
                message: "Subsection already completed",
                data: existingProgress,
                alreadyCompleted: true
            });
        }

        // Use $addToSet with upsert to handle both create and update
        const courseProgress = await CourseProgress.findOneAndUpdate(
            {
                courseId: courseId,
                userId: userId
            },
            {
                $addToSet: { completedVideos: subSectionId }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );

        return res.status(200).json({ 
            success: true,
            message: "Course progress updated successfully",
            data: courseProgress
        });

    } catch(error) {
        console.log("updateCourseProgress error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating course progress",
            error: error.message
        });
    }
}

exports.markCourseAsComplete = async(req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id;
    
    try {
        // Fetch the course with all sections and subsections
        const course = await Course.findById(courseId)
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            });
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        
        // Check if already completed
        const existingProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
            isCompleted: true
        });
        
        if (existingProgress) {
            return res.status(400).json({
                success: false,
                message: "This Course is already Completed."
            });
        }
        
        // Collect all subsection IDs (videos) from the course
        const allSubSectionIds = [];
        
        if (course.courseContent && course.courseContent.length > 0) {
            course.courseContent.forEach(section => {
                if (section.subSection && section.subSection.length > 0) {
                    section.subSection.forEach(subSection => {
                        allSubSectionIds.push(subSection._id);
                    });
                }
            });
        }
        
        // Update course progress with upsert
        const courseProgressDetails = await CourseProgress.findOneAndUpdate(
            {
                courseId: courseId,
                userId: userId
            },
            {
                isCompleted: true,
                completedVideos: allSubSectionIds
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );
        
        return res.status(200).json({
            success: true,
            message: "Course is marked as Completed",
            data: courseProgressDetails
        });
        
    } catch(error) {
        console.log("Error in markCourseAsComplete", error);
        return res.status(500).json({
            success: false,
            message: "Unable to mark Course As Complete"
        });
    }
}


exports.unenrollFromCourse = async (req, res) => {
  const { courseId } = req.body
  const userId = req.user.id
  
  // Start a session for transaction
  const session = await mongoose.startSession()
  
  try {
    // Start transaction
    session.startTransaction()
    
    // Validate required fields
    if (!courseId) {
      await session.abortTransaction()
      session.endSession()
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      })
    }

    // Check if user is actually enrolled in the course first
    const user = await User.findById(userId).session(session)
    if (!user) {
      await session.abortTransaction()
      session.endSession()
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (!user.courses.includes(courseId)) {
      await session.abortTransaction()
      session.endSession()
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    // Delete course progress
    let courseProgressDetails = await CourseProgress.findOneAndDelete(
      {
        courseId: courseId,
        userId: userId,
      },
      { session }
    )

    if (!courseProgressDetails) {
      await session.abortTransaction()
      session.endSession()
      console.error("Error in courseProgressDetails: ", courseProgressDetails)
      return res.status(404).json({
        success: false,
        message: "Course progress not found. Unable to unenroll.",
      })
    }

    // Update user document - Remove from BOTH courses and courseProgress arrays
    let userUpdate = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          courses: courseId,
          courseProgress: courseProgressDetails._id,
        },
      },
      { new: true, session }
    )

    if (!userUpdate) {
      await session.abortTransaction()
      session.endSession()
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Update course document
    let courseUpdate = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { studentEnrolled: userId } },
      { new: true, session }
    )

    if (!courseUpdate) {
      await session.abortTransaction()
      session.endSession()
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()

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
    // Rollback transaction on error
    await session.abortTransaction()
    session.endSession()
    
    console.error("Error in unenrollFromCourse:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while unenrolling from course",
      error: error.message,
    })
  }
}