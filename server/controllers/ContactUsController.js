const {contactUsEmail } = require("../mail/templates/contactFormRes")
const ContactUs = require("../models/ContactUs")
const mailSender = require("../utils/MailSender")

exports.contactUsController = async(req,res) =>{
    const {email ,firstName , lastName , message,phoneNo , countrycode} = req.body
    console.log("req.body in contactUsController: " ,req.body)
    try{

        // Check if there's an existing unresolved message from this email
        const existingUnresolvedMessage = await ContactUs.findOne({
            email: email.toLowerCase(),
            status: { $in: ['pending', 'in-progress'] }
        });

        if (existingUnresolvedMessage) {
            return res.status(400).json({
                success: false,
                message: "You already have a pending inquiry.",
                existingTicketId: existingUnresolvedMessage._id,
                submittedAt: existingUnresolvedMessage.createdAt
            });
        }
        // Create new contact message
        const newContact = await ContactUs.create({
            email:email.toLowerCase(),
            firstName,
            lastName,
            message,
            phoneNo,
            countrycode,
            status:"pending",
            createdAt: new Date()
        })

        const emailRes = await mailSender(
            email,
            "Your data Send successfully",
            contactUsEmail(
                email,firstName,lastName,message,phoneNo,countrycode
            )
        )
        console.log("Email Res : " , emailRes);


        return res.status(200).json({
            success:true,
            message:`mail send successfully to email: ${email}`,
            tickedId:newContact._id
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

// Admin route to resolve a contact inquiry
exports.resolveContactInquiry = async (req, res) => {
    try {
        const { ticketId } = req.params;

        const updatedContact = await ContactUs.findByIdAndUpdate(
            ticketId,
            { 
                status: 'resolved',
                resolvedAt: new Date()
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Inquiry marked as resolved",
            data: updatedContact
        });

    } catch (error) {
        console.error('Resolve inquiry error:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to resolve inquiry"
        });
    }
};