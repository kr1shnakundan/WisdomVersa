const {contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/MailSender")

exports.contactUsController = async(req,res) =>{
    const {email ,firstName , lastName , message,phoneNo , countrycode} = req.body
    console.log("req.body in contactUsController: " ,req.body)
    try{
        const emailRes = await mailSender(
            email,
            "Your data Send successfully",
            userData(
                email,firstName,lastName,message,phoneNo,countrycode
            )
        )
        console.log("Email Res : " , emailRes);
        return res.status(200).json({
            success:true,
            message:`mail send successfully to email: ${email}`
        })
    } catch(error){
        console.log("Error in contactUsController: ",error)
        console.log("Error Message : ", error.message)
        return res.status(500).json({
            success:false,
            message:`error in contact us controller`
        })
    }
}