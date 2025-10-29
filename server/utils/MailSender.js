const nodemailer = require("nodemailer");
require("dotenv").config(); 

const mailSender = async(email,title,body) =>{

    try{

        //transporter
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: "Developer's WisdomVersa <no-reply@wisdomversa.local>",
            to: email,
            subject: title,
            html: body,
        });
        console.log("info in mailSender: " ,info);
        return info;

    } catch(error){
        // console.log("error occured while sending mail : ",error);
        console.log(error.message);

    }

}


module.exports = mailSender;