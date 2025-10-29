const {instance} = require("../config/razorpayConfig");
const Course = require("../models/Course")
const User = require("../models/User");
const mailSender = require("../utils/MailSender");
const mongoose = require("mongoose");
const CourseProgress = require("../models/CourseProgress")


//capture the payment and inititate the razorpay order
exports.capturePayment = async(req,res) =>{

    //fetch courses and user in
    const {courses} = req.body
    const userId = req.user.id
    //check that user has selected course or not
    if(courses.length === 0 ) {
        return res.json({success:false,message:"Please select at least one course"})
    }
    
    let totalAmount = 0;

    //find total amount & validation for each courses the user have selected
    for(const course_id of courses){
        let courseDetails;
        try{
            //find the course by its id
            courseDetails = await Course.findById(course_id);

            //if not found course , return error
            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message:`couldn't find the course`
                });
            }

            //check if user is already enrolled in the course
            // const uid = new mongoose.Types.ObjectId(userId)
            let uid;
            if (typeof userId === 'string' && mongoose.Types.ObjectId.isValid(userId)) {
                const uid = new mongoose.Types.ObjectId(userId);
            } else{
                uid = userId
            }

            if(courseDetails.studentEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:`student is already enrolled for this course`
                })
            }

            //add the price of course to total amount
            totalAmount+=courseDetails.price

        } catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    //const options

    const options = {
        amount:totalAmount*100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString()
    }
    

    try{

        //initiate the payment through razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log("paymentResponse : " ,paymentResponse);
        res.json({
            success: true,
            data: paymentResponse,
            courseName: courseDetails.courseName,
            courseDescription:courseDetails.courseDescription,
            thumbnail:courseDetails.thumbnail
        })
    } catch(error){
        console.log("capturePayment error : " ,error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
 
    }
}


//verify the payment 
exports.verifyPayment = async(req,res) =>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId = req.user.id    

    //validate
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(400).json({
            success:false,
            message:`payment failed`
        })
    }

    //this is the format that razorpay uses to send the data    
    let body = razorpay_order_id +"|"+razorpay_payment_id

    const expectedSignature = crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses , userId , res)
        return res.status(200).json({
            success:true,
            message:`payment verified`
        });
    }
    return res.status(500).json({
        success:false,
        message:`payment not verified`
    })
    

}

//send payment success mail
exports.sendPaymentSuccessEmail = async(req, res) =>{
    const {orderId , paymentId , amount } = req.body

    const userId = req.user.id

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:`payment detail not found during sending email`
        });
    }

    try{
        const enrolledStudent = await User.findById(userId)
        if(!enrolledStudent){
            return res.status(400).json({
                success:false,
                message:`student detail cannot be fetched`
            });
        }

        await mailSender(enrolledStudent.email , "Successfull Payment Confirmed " , 
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,
                orderId,
                paymentId
            )
        )
    } catch(error){
        console.log("error while sending email ",error)
        return res.status(500).json({
            success:false,
            message:`error while sending email`
        })
    }
}

//enroll the student in the course

const enrollStudents = async(courses ,userId,res) =>{
    if(!courses || !userId) {
        return res.status(400).json({
            success:false,
            message:`please provide courseId and userId`
        });
    }

    for(const courseId of courses){
        try{
            //find the course and enroll student in it 
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,{
                $push : {studentEnrolled:userId}
            }, {new:true});

            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:error.message,
                });
            }

            const courseProgress = await CourseProgress.create({
                courseId : courseId,
                userid: userId,
                completedVideos : []
            })

            const enrolledStudent = await User.findByIdAndUpdate(userId , {
                $push : {courses:courseId,
                    courseProgress:courseProgress._id
                } 
            },{new:true})

            console.log("Enrolled student: ", enrolledStudent)


            // Send an email notification to the enrolled student
            const emailResponse = await mailSender(userId ,`Enrolled Course Confirmation for ${enrolledCourse.name}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            )
            console.log("Email sent successfully: ", emailResponse.response)
        } catch (error) {
            console.log("enrollStudents error : " ,error)
            return res.status(400).json({ success: false, error: error.message })
         }
    }
}


