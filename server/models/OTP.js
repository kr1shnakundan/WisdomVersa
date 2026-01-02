const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    // keep OTP as string to preserve leading zeros and consistent comparison
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        // use Date.now (function reference) so each document gets its own timestamp
        default: Date.now,
        // expire documents after 5 minutes (TTL index expects seconds)
        expires: 5 * 60,
    }
});


//a function -->to send mails

async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse = await mailSender(email,"Verification email send from WisdomVersa",otpTemplate(otp));
        console.log("verification email send successfully",mailResponse);

    } catch(error){
        console.log("error occurred while sending mail:",error);
        throw error;
    }
    
}

OTPSchema.pre("save",async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);