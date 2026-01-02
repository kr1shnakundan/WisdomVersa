const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:false,
        trim:true,
        default:"",
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:false,
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[
        {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course"
    }
],
    image:{
        type:String,
       
    },
    courseProgress:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
        }
    ],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date,
    },
    googleId: {  // NEW FIELD ADDED DURING GOOGLE SIGN IN BUTTON
        type: String,
    },
});



module.exports = mongoose.model("User",userSchema);