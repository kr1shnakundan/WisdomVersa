const mongoose = require("mongoose")
const Course = require("../models/Course");
const User = require("../models/User");
// const Tags = require("../models/Tags");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary} = require("../utils/ImageUploader");
const Category = require("../models/Category");
const { convertSecondsToDuration } = require("../utils/secToDuration")
require("dotenv").config();
const CourseProgress = require("../models/CourseProgress")
const RatingAndReview = require("../models/RatingAndReview")


//for authorized user , who has buyed this course
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    }).populate({
        path: "instructors",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    console.log("error in getFullCourseDetails : " ,error);
    return res.status(500).json({
      success: false,
      message: `error in getFullCourseDetails ${error.message}`,
    })
  }
}
exports.createCourse = async(req,res) =>{
    try{
        //get userId from user
        const userId = req.user.id;

        //get all the required field from req body
        let{
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag:_tag,
            category,
            status,
            instructions:_instructions
        } = req.body;

        //get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;

        //convert the tag and instructions from stringify array to array
        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        console.log("tag:", tag)
        console.log("instructions:", instructions)

        // console.log("createCourse: " , courseName , courseDescription , price , whatYouWillLearn ,
        //     category , tag.length , instructions.length ,thumbnail
        // )

        //validates
        if(!courseName || !courseDescription || !price || !whatYouWillLearn || !category
            || !tag.length || !instructions.length  
        ){
            return res.status(400).json({
                success:false,
                message:`please enter all the credentials carefully`
            });
        }

        

        //check for instructor
        const instructorDetail = await User.findById(userId)
        if(!instructorDetail){
            return res.status(401).json({
                success:false,
                message:`instructor detail can't be fetched`
            });
        }

        //check for category details
        const categoryDetail = await Category.findById(category);
        if(!categoryDetail){
            return res.status(400).json({
                success:false,
                message:`categoryDetail cannot be found`
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);

        //create new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructors:instructorDetail._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag,
            category:categoryDetail._id,
            status:status,
            thumbnail:thumbnailImage.secure_url,
            instructions:instructions
        })
        
        //add the new course to user shcema
        await User.findByIdAndUpdate(
            {_id:instructorDetail._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
        )

        //Update the Category ka schema
        await Category.findByIdAndUpdate(
            category,{ 
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
        )

        //return response
        res.status(200).json({
            success:true,
            message:`course created successfully`,
            data:newCourse
        })

    } catch(error){
        console.log("error in createCourse: " ,error);
        return res.status(500).json({
            success:false,
            message:`error occured while creatignCourse`
        })
    }
}

//get all courses handler function
exports.getAllCourse = async(req,res)=>{
    try{
        const allCourses = await Course.find({},{courseName:true,courseDescription:true,price:true,
            studentEnrolled:true,whatYouWillLearn:true,instructors:true,thumbnail:true,ratingAndReview:true})
            .populate("instructors").exec();

            return res.status(200).json({
                success:true,
                message:`all courses fetched successfully`,
                data:{
                    allCourses
                }
            })
        
    } catch(error){
        console.log("getAllCourse error : " ,error);
        return res.status(500).json({
            success:false,
            message:`all courses cannnot be fetched`
        })
    }
}

//get course detail for general user which excludes video url
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructors",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",       
        populate: {
          path: "subSection",        
          select: "-videoUrl",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .exec();

    console.log("CourseDetails:", courseDetails);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Cannot find courseDetails for courseId: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;

    // calculate total duration
    courseDetails.courseContent.forEach((section) => {
      if (section.subSection && section.subSection.length > 0) {
        section.subSection.forEach((sub) => {
          const timeDurationInSeconds = parseInt(sub.timeDuration) || 0;
          totalDurationInSeconds += timeDurationInSeconds;
        });
      }
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      message: `Course details for courseId ${courseId} successfully fetched`,
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (error) {
    console.log("Error in getCourseDetails:", error);
    return res.status(500).json({
      success: false,
      message: `Error while getting single course details`,
    });
  }
};


//get instructor's course details
exports.getInstructorCourses = async(req,res) =>{
    try{
        const instructorId = req.user.id;

        const courseDetails = await Course.find({instructors:instructorId})
        .sort({createdAt:-1})        

        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`no course find for the instuctor`
            });
        }

        const coursesWithDuration = courseDetails.map((course) => {
            let totalDurationInSeconds = 0;
            
            course.courseContent.forEach((section) => {
                if (section.subSection && section.subSection.length > 0) {
                    section.subSection.forEach((sub) => {
                        const timeDurationInSeconds = parseInt(sub.timeDuration) || 0;
                        totalDurationInSeconds += timeDurationInSeconds;
                    });
                }
            });

            const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
            
            // Return course with its duration
            return {
                ...course.toObject(), // Convert Mongoose document to plain object
                totalDuration
            };
        });

        return res.status(200).json({
            success:true,
            message:`instructor's detail successfully fetched`,
            data: coursesWithDuration
        })

    } catch(error){
        console.log("getInstructorCourse error : " ,error)
        return res.status(500).json({
            success:false,
            message:`error in finding th Instructor's course details`
        })
    }
}

// //delete course
// exports.deleteCourse = async(req,res) =>{
//     try{
//         const {courseId} = req.body

//         const courseDetails = await Course.findById(courseId)
//         if(!courseDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:`unable to find course for courseId : ${courseId}`
//             })
//         }

//         //delete course from students enrolled for this course
//         const studentEnrolled = courseDetails.studentEnrolled;
//         for(const studentId of studentEnrolled){
//             await User.findByIdAndUpdate(studentId , {
//                 $pull:{courses:courseId}
//             },{new:true});
//         }

//         //delete section of this course
//         const courseSection = courseDetails.courseContent
//         for(const sectionId of courseSection){
//             const sectionDetails = await Section.findById(sectionId)
//             if(sectionDetails){
//                 const courseSubSection = sectionDetails.subSection || []
//                 for(const subSectionId of courseSubSection){
//                     await subSection.findByIdAndDelete(subSectionId);
//                 } 
//             }

//             await Section.findByIdAndDelete(sectionId);
            
//         }


//           // Delete all ratings and reviews for this course (if they exist)
//         const ratingsExist = await RatingAndReview.findOne({ course: courseId }).session(session);
//         if(ratingsExist) {
//             const deleteResult = await RatingAndReview.deleteMany({ course: courseId }, { session });
//             if(!deleteResult.acknowledged) {
//                 throw new Error("Failed to delete ratings and reviews");
//             }
//         }

//         // Remove course from instructor
//         await User.findByIdAndUpdate(
//             courseDetails.instructors,
//             { $pull: { courses: courseId } },
//             { new: true }
//         )

//         // Remove course from category
//         await Category.findByIdAndUpdate(
//             courseDetails.category,
//             { $pull: { course: courseId } },
//             { new: true }
//         )


//         // Delete the course
//         await Course.findByIdAndDelete(courseId)

//         //why not delete the rating and review for this course
//         res.status(200).json({
//             success:true,
//             message:`course successfully deleted for courseId: ${courseId}`
//         })

//     } catch(error){
//       console.log("Errrror in delete course in course controller : ",error)
//         return res.status(500).json({
//             success:false,
//             message:`error in deleting the course`
//         })
//     }
    
// }


exports.deleteCourse = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const {courseId} = req.body
        const courseDetails = await Course.findById(courseId).session(session)
        
        if(!courseDetails){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                message: `unable to find course for courseId : ${courseId}`
            })
        }
        
        // Delete course from students enrolled for this course
        const studentEnrolled = courseDetails.studentEnrolled;
        for(const studentId of studentEnrolled){
            await User.findByIdAndUpdate(
                studentId,
                { $pull: {courses: courseId} },
                { new: true, session }
            );
        }
        
        // Delete sections and subsections of this course
        const courseSection = courseDetails.courseContent
        for(const sectionId of courseSection){
            const sectionDetails = await Section.findById(sectionId).session(session)
            if(sectionDetails){
                const courseSubSection = sectionDetails.subSection || []
                for(const subSectionId of courseSubSection){
                    await SubSection.findByIdAndDelete(subSectionId, { session });
                } 
            }
            await Section.findByIdAndDelete(sectionId, { session });
        }
        
        // Delete all ratings and reviews for this course (if they exist)
        const ratingsExist = await RatingAndReview.findOne({ course: courseId }).session(session);
        if(ratingsExist) {
            const deleteResult = await RatingAndReview.deleteMany({ course: courseId }, { session });
            if(!deleteResult.acknowledged) {
                throw new Error("Failed to delete ratings and reviews");
            }
        }
        
        // Remove course from instructor
        await User.findByIdAndUpdate(
            courseDetails.instructors,
            { $pull: { courses: courseId } },
            { new: true, session }
        )
        
        // Remove course from category
        await Category.findByIdAndUpdate(
            courseDetails.category,
            { $pull: { course: courseId } },
            { new: true, session }
        )
        
        // Delete the course
        await Course.findByIdAndDelete(courseId, { session })
        
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        
        res.status(200).json({
            success: true,
            message: `course successfully deleted for courseId: ${courseId}`
        })
        
    } catch(error) {
        // Rollback the transaction on error
        await session.abortTransaction();
        session.endSession();
        
        console.log("Error in delete course in course controller : ", error)
        return res.status(500).json({
            success: false,
            message: `error in deleting the course`,
            error: error.message
        })
    }
}

//edit course
exports.editCourse = async(req,res) =>{
    try{
        //fetch the data
        const{courseId } = req.body
        const updates = {...req.body}
        console.log("updates : " , updates)
        console.log("req.body : " , req.body)

        const courseDetails = await Course.findById(courseId)
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`course not found while editing course`
            })
        }

        // Check if trying to unpublish a course with enrolled students
        if(updates.status && 
           courseDetails.status === "Published" && 
           updates.status === "Draft" && 
           courseDetails.studentEnrolled && 
           courseDetails.studentEnrolled.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot save course as draft. ${courseDetails.studentEnrolled.length} students are currently enrolled in this course.`,
                enrolledStudents: courseDetails.studentEnrolled.length
            })
        }

        if(req.files){
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            courseDetails.thumbnail = thumbnailImage.secure_url
        }

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    courseDetails[key] = JSON.parse(updates[key])
                } else{
                    courseDetails[key] = updates[key]
                }
            }
        }
        await courseDetails.save();

        const updatedCourse = await Course.findOne({_id:courseId})
            .populate({
                path:"instructors",
                populate:{
                    path:"additionalDetails"
                }
            })
            .populate("ratingAndReview")
            .populate("category")
            .populate({
                path:"courseContent",
                populate:({
                    path:"subSection"
                })
            }).exec();

            res.status(200).json({
                success:true ,
                message:`course edited successfully`,
                data:updatedCourse
            })

    } catch(error){
        console.log("Error in editCourse: " , error);
        return res.status(500).json({
            success:false,
            message:`error in edit course`
        })
    }
}

