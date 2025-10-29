const User = require("../models/User")
const RatingAndReview = require("../models/RatingAndReview")
const {mongoose } = require("mongoose");
const Course = require("../models/Course")

exports.createRating = async(req,res)=>{
    try{
        //get userId
        const userId = req.user.id;

        //fetch from body
        const {rating , review , courseId } = req.body

        //check if the user is enrolled or not
        const courseDetails= await Course.findOne({_id:courseId,
            studentEnrolled:{$elemMatch:{$eq:userId}}
        });

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`course not found for user`
            })
        }

        //check for already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        });
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:`already reviewed by the user`
            })
        }

        //create rating 
        const ratingReview = await RatingAndReview.create({
                rating,review,course:courseId , user:userId
        })

        //update course
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{ratingAndReview:ratingReview._id}
            },{new:true}
        );
        console.log("updateCourseDetails : " ,updatedCourseDetails);

        return res.status(200).json({
            success:true,
            message:`rating successfully created`
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:`error in creating rating`
        })
    }
}

//get average rating
exports.getAverageRating = async(req,res) =>{
    try{
        // const userId = req.user.id  <---------- i commented it because the to see the average rating,we don't to be user
        //fetch the rating and review 
        const { courseId } = req.body

        //find rating and review for this
        const ratingReview = await RatingAndReview.findOne({
            course:courseId,
            // user:userId
        })
        if(!ratingReview){
            return res.status(400).json({
                success:false,
                message:`rating and review for this course is not found`
            });
        }

        const result= await RatingAndReview.aggregate([
            {
                $match:{course:new mongoose.Types.ObjectId(courseId)}
            },{
                $group:{
                    _id:null , 
                    averageRating : { $avg:"$rating"}
                }
            }
        ])

        //return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        //if no rating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    } catch(error){
        console.log("Error in getAverageRating: ",error);
        return res.status(400).json({
            success:false,
            message:`error while getting average rating`
        })
    }
}

//get all the rating
exports.getAllRatings = async(req,res) =>{
    try{
        // const userId = req.user.id
        // const {rating , courseId} = req.body

        const allReviews = await RatingAndReview.find({})
        .populate({
            path : "user",
            select:"firstName ,lastName,email,image"
        })
        .populate({
            path : "course",
            select:"courseName"
        }).exec();

        return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });


    } catch(error){
        console.log("Error in getAllRatings: ",error);
        return res.status(500).json({
            success:false,
            message:`error in getting all the ratings`
        })
    }
}