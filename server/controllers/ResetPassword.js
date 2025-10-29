const User = require("../models/User");
const bcrypt = require("bcrypt")
const mailSender = require("../utils/MailSender");



//reset Password
exports.resetPasswordToken = async(req,res)=>{
    try{
        //get email from req.body
        const email = req.body.email;
        //const {email} = req.body--------------SAME

        //check user for this email/email validation
        const user = User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:`can't find the user for the given email`
            });
        }
        
        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time
        const userDetails = await User.findOneAndUpdate({email:email} , 
            {token:token , resetPasswordExpires:Date.now() + 5*60*1000},
           {new:true});

        //create URL
        const url = `https://localhost:3000/update-password/${token}`

        //send mail containing the url
        await mailSender(email,`Password reset link`,`the link for the password reset link is ${url}`);

        //return response
        res.status(200).json({
            success:true,
            message:`Email send successfully. Please check email for reset password link`
        });

    } catch(error){
        console.log("resetPasswordToken : " ,error);
        return res.status(500).json({
            success:false,
            message:`failed to reset password`
        })
    }
}

//reset password
exports.resetPassword = async(req,res)=>{

    try{
        //data fetch
        const {password , confirmPassword , token } = req.body;
        
        //validation
        if(!password || !confirmPassword || !token ){
            return res.status(400).json({
                success:false,
                message:`please fill all the required`
            });
        }

        //get userdetail from db using token
        const userDetails = await User.findOne({token:token});

        //if no entry is found, return token is invalid
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:`token is invalid`
            });
        }

        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:`token expired , please regenerate the token`
            });
        }
        
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //update user
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );

        //return response
        res.status(200).json({
            success:true,
            message:`Password reset successfully`
        });

    } catch(error){
        console.log("resetPassword error : " ,error);
        return res.status(500).json({
            success:false,
            message:`error while reseting password`
        })
    }
    
}