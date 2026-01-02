// const express = requir("express");
// const otpGenerator = require("otp-generator");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// const OTP = require("../models/OTP");
// const Profile = require("../models/Profie");
// const mailSender = require("../utils/MailSender");

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const OTP = require("../models/OTP")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const mailSender = require("../utils/MailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const Profile = require("../models/Profile")
require("dotenv").config()

//function for signup 

exports.signup = async(req,res) =>{
    console.log("signUp me pahuch gya.................")
    try{
        //fetch the data
        const {
            firstName,
            lastName,
            accountType,
            email,
            password,
            confirmPassword,
            contactNumber,
            otp
        } = req.body;

        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword 
            || !otp || !accountType)
        {
                return res.status(401).json({
                    success:false,
                    message: `please enter all the information carefully`
                });
        }

        //match the password and confirm password
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:`password and confirmPassword not matching`
            });
        }
        
        
        //check if the email already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:`the user already exists`
            });
        }

        //find the most recent otp from dB
        const response = await OTP.find({email}).sort({createdAt: -1}).limit(1);

        //match the otp
        //otp not found in db/email
        if(response.length === 0){
            return res.status(400).json({
                success:false,
                message:`otp not found from email`
            });
        }

        //invalid otp
        else if(otp !== response[0].otp){
            return res.status(400).json({
                success:false,
                message:`please enter valid otp`
            })
        }

        //hash the password

        const hashPassword = await bcrypt.hash(password,10);

        //create the user
        let approved = ""
        approved === "Instructor" ? (approved =false) : (approved = true)
         // ---------------------------here approved will always be true. for changing it use gpt
         

        // let approved = true;
        // if (accountType === "Instructor") {
        // approved = false;
        // }


        //store in user
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
            profession:null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            accountType:accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            password:hashPassword,
            image:""
        })
    return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
    });
        
    } catch(error){
        console.log("error in signup:" ,error);
        res.status(500).json({
            success:false,
            message:`error occured while signUp`
        })
    }
}

//-----------------------------------------WITH TRANSACTION USED --------------------------------------

// exports.signup = async (req, res) => {
//     console.log("signUp me pahuch gya.................");
    
//     // Start a session for transaction
//     const session = await mongoose.startSession();
    
//     try {
//         // Start transaction
//         session.startTransaction();
        
//         // Fetch the data
//         const {
//             firstName,
//             lastName,
//             accountType,
//             email,
//             password,
//             confirmPassword,
//             contactNumber,
//             otp
//         } = req.body;
        
//         // Validate
//         if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType) {
//             await session.abortTransaction();
//             return res.status(401).json({
//                 success: false,
//                 message: `Please enter all the information carefully`
//             });
//         }
        
//         // Match the password and confirm password
//         if (password !== confirmPassword) {
//             await session.abortTransaction();
//             return res.status(400).json({
//                 success: false,
//                 message: `Password and confirmPassword not matching`
//             });
//         }
        
//         // Check if the email already exists (use session)
//         const existingUser = await User.findOne({ email }).session(session);
//         if (existingUser) {
//             await session.abortTransaction();
//             return res.status(401).json({
//                 success: false,
//                 message: `The user already exists`
//             });
//         }
        
//         // Find the most recent OTP from DB (use session)
//         const response = await OTP.find({ email })
//             .sort({ createdAt: -1 })
//             .limit(1)
//             .session(session);
        
//         // OTP not found in db/email
//         if (response.length === 0) {
//             await session.abortTransaction();
//             return res.status(400).json({
//                 success: false,
//                 message: `OTP not found for email`
//             });
//         }
        
//         // Invalid OTP
//         else if (otp !== response[0].otp) {
//             await session.abortTransaction();
//             return res.status(400).json({
//                 success: false,
//                 message: `Please enter valid OTP`
//             });
//         }
        
//         // Hash the password
//         const hashPassword = await bcrypt.hash(password, 10);
        
//         // Determine approved status
//         let approved = true;
//         if (accountType === "Instructor") {
//             approved = false;
//         }
        
//         // Create the profile (within transaction)
//         const profileDetails = await Profile.create([{
//             gender: null,
//             dateOfBirth: null,
//             about: null,
//             contactNumber: null,
//             profession: null
//         }], { session });
        
//         // Create the user (within transaction)
//         const user = await User.create([{
//             firstName,
//             lastName,
//             email,
//             contactNumber,
//             accountType: accountType,
//             approved: approved,
//             additionalDetails: profileDetails[0]._id,
//             password: hashPassword,
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
//         }], { session });
        
//         // Commit the transaction
//         await session.commitTransaction();
        
//         return res.status(200).json({
//             success: true,
//             user: user[0],
//             message: "User registered successfully",
//         });
        
//     } catch (error) {
//         // Rollback transaction on error
//         await session.abortTransaction();
//         console.log("Error in signup:", error);
        
//         return res.status(500).json({
//             success: false,
//             message: `Error occurred while signUp: ${error.message}`
//         });
        
//     } finally {
//         // End session
//         session.endSession();
//     }
// };

//function for login

exports.login  = async(req,res) =>{
    
    try {
        //fetct email and otp 
        const {email , password  }  = req.body;

        //validate
        if(!email || !password ) {
            return res.status(400).json({
                success:false,
                message:`please enter all the credentials`
            });
        }

        //check if user exist
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:`user does not exists`
            });
        }

        // CHECK IF USER IS GOOGLE USER
        if (user.googleId && !user.password) {
        return res.status(400).json({
            success: false,
            message: "This account uses Google Sign-In. Please use the 'Login with Google' button.",
            isGoogleUser: true,
        });
        }

        //compare password
        if(await bcrypt.compare(password , user.password)){
            //create jwt token
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }

            const token = jwt.sign(payload , process.env.JWT_SECRET,{expiresIn:"1hr"})

            user.token = token;
            user.password = undefined;

            //crete cache
            const options ={
                expires: new Date(Date.now() + 1*60*60*1000),
                httpOnly:true,
                sameSite: 'lax'
            }

            // console.log("===== LOGIN DEBUG =====");
            // console.log("Token generated:", token.substring(0, 20) + "...");
            // console.log("Cookie options:", options);
            // console.log("Request origin:", req.headers.origin);
            // console.log("Request headers:", req.headers);
            // console.log("=======================");

            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:`user login successfully`
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:`password does not matches`
            });
        }

       

    } catch(error){
        console.error("login error:",error)

        //this is to check if the token is expired

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired",
                expired: true
            });
        }

        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
        })
    }

}

//sendOTP function while signing up
exports.sendotp = async(req,res) =>{
    try{
        console.log("Send otp controller me pahunch gaya")
        const {email} = req.body;

        //check if user is already present
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(400).json({
                success:false,
                message:`user already exists`
            });
        }

        //create the unique otp 
        // generate numeric OTP as a string (preserve leading zeros)
        let otp = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // ensure uniqueness in DB (small chance of collision). Re-query inside loop.
        let exists = await OTP.findOne({ otp });
        let attempts = 0;
        while (exists && attempts < 5) {
            otp = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            exists = await OTP.findOne({ otp });
            attempts++;
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body:", otpBody);

        // In development it's useful to return the otp. In production, don't return it.
        const responsePayload = { success: true, message: `OTP Sent Successfully` };
         responsePayload.otp = otp;

        return res.status(200).json(responsePayload);

    } catch(error){
        console.log("sendOtp me error : " ,error.message)
        return res.status(500).json({ success: false, error: error.message })
    }
}

//change password function
exports.changePassword = async(req,res) =>{
    try{

        const userDetails = await User.findById(req.user.id)
        const {oldPassword,newPassword , confirmNewPassword} = req.body;

        //validate
        if(!oldPassword || !newPassword || !confirmNewPassword)
        {
                return res.status(400).json({
                    success:false,
                    message:`please enter all the details`
                });
        }

        if(oldPassword === newPassword){
            return res.status(400).json({
                success:false,
                message:`oldPassword and newPassword can't be same`
            });
        }

        //check the newPassword and confirmNewPassword
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:`new password and confirmNewPassword does not matches`
            });
        }


        //compare password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, userDetails.password);
        
        if(isPasswordCorrect){

            //update password
            const encryptedPassword = await bcrypt.hash(newPassword,10);
            const updateUserDetails = await User.findByIdAndUpdate(req.user.id,{password:encryptedPassword},{new:true})

            //send Notification to email
            try{
                const emailResponse = await mailSender(updateUserDetails.email,"Password for your account changed ",
                    passwordUpdated(
                        updateUserDetails.email,
                        `Password updated successfully for ${updateUserDetails.firstName} ${updateUserDetails.lastName}`
                    )
                )
                console.log("Email sent successfully:", emailResponse.response)
            } catch(error){
                // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                console.error("Error occurred while sending email:", error)
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                })
            }

            // Return success response
            return res.status(200).json({ success: true, message: "Password updated successfully" })
        } else{
            return res.status(400).json({
                success:false,
                message:`old password is not correct`
            });
        }
    } catch(error){
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
    }
    
}



exports.googleAuth = async (req, res) => {
  try {
    const { email, firstName, lastName, picture, googleId } = req.body;

    // Validation
    if (!email || !firstName || !googleId) {
      return res.status(400).json({
        success: false,
        message: "Email, name, and Google ID are required",
      });
    }

    console.log("Google Auth Request:", { email, firstName, lastName });


    // Handle missing lastName
    // const userLastName = lastName || "";
    // console.log("Using lastName:", userLastName || "(empty string)");

    // Check if user already exists
    let user = await User.findOne({ email }).populate("additionalDetails");

    if (user) {
      // User exists - this is a login
      console.log("Existing user found:", user.email);

      // Update Google ID if not present
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
        console.log("Added Google ID to existing user");
      }

      // Update profile picture if user doesn't have one
      if (picture && !user.image) {
        user.image = picture;
        await user.save();
        console.log("Updated user profile picture");
      }

    } else {
      // User doesn't exist - this is a signup
      console.log("Creating new user for:", email);

      // Create profile first
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
        profession:null,
      });

      const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()

      // Create new user
      user = await User.create({
        firstName,
        lastName,
        email,
        accountType: "Student", // Default account type
        approved: true,
        image: picture || `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
        googleId,
        additionalDetails: profileDetails._id,
        // Note: No password field for Google users
      });

      // Populate the profile details
      user = await User.findById(user._id).populate("additionalDetails");

      console.log("New user created successfully:", user.email);
    }

    // Generate JWT token
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Remove sensitive information
    user = user.toObject();
    user.password = undefined;

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1hr
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use secure in production
      sameSite: "lax",
    };

    // Send response with cookie
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: user.googleId === googleId && !user.password 
        ? "Logged in successfully" 
        : "Account created and logged in successfully",
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Google authentication failed. Please try again.",
      error: error.message,
    });
  }
};

