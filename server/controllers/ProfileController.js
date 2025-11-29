const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")

// exports.updateProfile = async(req,res) =>{
//     try{
//         //fetch data
//         const {
//             firstName ="",
//             lastName ="",
//             dateOfBirth ="",
//             about = "",
//             contactNumber = "",
//             gender = "",
//             profession = ""
//         } = req.body;

//         const id = req.user.id;

//         //find profile
//         const userDetails = await User.findById(id);
//         const profile = userDetails.additionalDetails;
//         const profileDetails = await Profile.findById(profile);
//         if(!profileDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:`unable to get profile details`
//             })
//         }

//         //update user detail
//         const user = await User.findByIdAndUpdate(id,{
//             firstName:firstName,
//             lastName:lastName
//         });
//         await user.save();

//         //update profile detail
//         profileDetails.dateOfBirth = dateOfBirth
//         profileDetails.about = about
//         profileDetails.contactNumber = contactNumber
//         profileDetails.gender = gender
//         profileDetails.profession = profession

//         await profileDetails.save();

//         const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

//         res.status(200).json({
//             success:true,
//             message:`profileDetais updated successfully`
//         })


//     } catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:`error occured in updateProfile`
//         });
//     }
// }


//delete account

// exports.updateProfile = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       dateOfBirth,
//       about,
//       contactNumber,
//       gender,
//       profession,
//     } = req.body;

//     const id = req.user.id;

//     // Find user and profile
//     const userDetails = await User.findById(id);
//     if (!userDetails) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const profile = await Profile.findById(userDetails.additionalDetails);
//     if (!profile) {
//       return res.status(400).json({
//         success: false,
//         message: "Unable to get profile details",
//       });
//     }

//     // ✅ Only update fields if provided
//     if (firstName !== undefined) userDetails.firstName = firstName;
//     if (lastName !== undefined) userDetails.lastName = lastName;
//     await userDetails.save();

//     if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
//     if (about !== undefined) profile.about = about;
//     if (contactNumber !== undefined) profile.contactNumber = contactNumber;
//     if (gender !== undefined) profile.gender = gender;
//     if (profession !== undefined) profile.profession = profession;
//     await profile.save();

//     const updatedUserDetails = await User.findById(id)
//       .populate("additionalDetails")
//       .exec();

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: updatedUserDetails,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error occurred in updateProfile",
//     });
//   }
// };

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      about,
      contactNumber,
      gender,
      profession,
    } = req.body;

    const userId = req.user.id;

    // 1️⃣ Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2️⃣ Update user only if data is provided
    if (firstName !== undefined && firstName.trim() !== "") {
      user.firstName = firstName;
    }
    if (lastName !== undefined && lastName.trim() !== "") {
      user.lastName = lastName;
    }

    // 3️⃣ Fetch profile
    const profile = await Profile.findById(user.additionalDetails);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // 4️⃣ Update profile fields (only provided ones)
    if (dateOfBirth !== undefined && dateOfBirth.trim () != " "){
        const parsedDate = new Date(dateOfBirth)
        if(isNaN(parsedDate.getTime())){
            return res.status(400).json({
                success:false,
                message:`Invalid date format for dateOfBirth`
            })
        }
        profile.dateOfBirth = parsedDate;
    };
    if (about !== undefined) profile.about = about;
    if (contactNumber !== undefined) profile.contactNumber = contactNumber;
    if (gender !== undefined) profile.gender = gender;
    if (profession !== undefined) profile.profession = profession;

    // 5️⃣ Save both safely
    await Promise.all([
      user.save({ validateBeforeSave: true }),
      profile.save(),
    ]);

    const updatedUser = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating profile",
    });
  }
};





exports.deleteAccount = async(req,res) =>{
    try{
        //find id of user
        const id = req.user.id;
        console.log("id for deleteAccount : " ,id);

        //find user detail with this user
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(400).json({
                success:false,
                message:`user detail not found`
            });
        }

        //remove details from profile 
        await Profile.findByIdAndDelete(user.additionalDetails);
        // await Profile.findByIdAndDelete({
        //     _id: new mongoose.Types.ObjectId(user.additionalDetails),
        // })

        //remove the studentId from course
        for(const courseId of user.courses){
            await Course.findByIdAndUpdate(courseId,{
                $pull:{studentEnrolled:id}
            },{new:true})
        }

        //delete the user
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

        //after returning response , delete courseProgress to clear the storage
        await CourseProgress.deleteMany({userId:id})


    } catch(error){
        return res.status(500).json({
            success:false,
            message:`error occured while deleting Account`
        })
    }
}

//get all user
exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()
    console.log("userDetails : " ,userDetails)
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//update display picture
exports.updateDisplayPicture = async(req,res)=>{
    console.log("inside updateDisplayPicture........")
    try{
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log("image in updateDisplayPicture : " ,image)
        const updatedProfile = await Profile.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )

    res.send({
        success:true,
        message:`image updated successfully`,
        data:updatedProfile

    })
    } catch(error){
        console.log("updateDisplayPicture error : " ,error),
        res.status(500).json({
            success:false,
            message:`error in updating display picture`
        })
    }
}

//get enrolled courses
exports.getEnrolledCourses = async(req,res) =>{
    try{
        const userId = req.user.id

        // Add validation
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }


        let userDetails = await User.findOne({
        _id: userId,
        })
        .populate({
            path: "courses",
            populate: {
            path: "courseContent",
            populate: {
                path: "subSections",
            },
            },
        })
        .exec()

        // Check if user exists BEFORE using it
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            })
        }

         // Check if user has any courses
        if (!userDetails.courses || userDetails.courses.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No enrolled courses found"
            })
        }

        
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0

        // ✅ Check if courseContent exists
        if (!userDetails.courses[i].courseContent || 
            !Array.isArray(userDetails.courses[i].courseContent)) {
            userDetails.courses[i].totalDuration = "0m"
            userDetails.courses[i].progressPercentage = 0
            continue
        }


        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[j]
            .subSections.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)

            SubsectionLength +=userDetails.courses[i].courseContent[j].subSections.length
        }
        let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
        } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
            Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
        }

        if (!userDetails) {
        return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
        })
        }
        return res.status(200).json({
        success: true,
        data: userDetails.courses,
        })
    } catch(error){
        console.log("getEnrolledCourses error : " ,error);
        return res.status(500).json({
            success:false,
            message:`error in geting enrolled courses`
        });
    }
}