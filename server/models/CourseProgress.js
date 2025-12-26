const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }],
    // NEW FIELD
    isCompleted: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model("CourseProgress",courseProgress);