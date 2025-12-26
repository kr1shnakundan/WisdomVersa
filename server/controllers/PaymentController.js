const {instance} = require("../config/razorpayConfig");
const Course = require("../models/Course")
const User = require("../models/User");
const mailSender = require("../utils/MailSender");
const mongoose = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessfullEmail");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");


// //capture the payment and inititate the razorpay order
exports.capturePayment = async(req,res) => {
    
    const {courses} = req.body
    const userId = req.user.id
    //check that user has selected course or not
    if(courses.length === 0) {
        return res.json({success:false, message:"Please select at least one course"})
    }
    
    let totalAmount = 0;
    let allCourseDetails = []; // Store all course details
    
    //find total amount & validation for each courses the user have selected
    for(const course_id of courses){
        let courseDetails;
        try{
            
            courseDetails = await Course.findById(course_id);
            //if not found course, return error
            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message: `Couldn't find the course` 
                });
            }
            
            //check if user is already enrolled in the course
            let uid;
            if (typeof userId === 'string' && mongoose.Types.ObjectId.isValid(userId)) {
                uid = new mongoose.Types.ObjectId(userId); 
            } else {
                uid = userId
            }
            
            if(courseDetails.studentEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message: `Student is already enrolled for this course`
                })
            }
            
            //add the price of course to total amount
            totalAmount += courseDetails.price
            allCourseDetails.push(courseDetails); // Store course details
            
        } catch(error){
            console.log("jhjkhkj error in capture payment controller;;;",error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    
    //const options
    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }
    
    try{
        //initiate the payment through razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log("paymentResponse: ", paymentResponse);
        
        res.json({
            success: true,
            data: paymentResponse,
            courses: allCourseDetails.map(course => ({
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail
            }))
        })
    } catch(error){
        console.log("capturePayment error: ", error)
        res.status(500).json({ 
            success: false, 
            message: "Could not initiate order." 
        })
    }
}


// Verify the payment 
exports.verifyPayment = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id    

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            success:false,
            message:`Payment failed - Missing required fields`
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    if(expectedSignature === razorpay_signature){
        // Payment verified - enroll students
        const enrollmentResult = await enrollStudents(courses, userId, session);
        
        if(!enrollmentResult.success) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json(enrollmentResult);
        }
        
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        
        // Send emails AFTER successful transaction (outside transaction)
        await sendEnrollmentEmails(enrollmentResult.enrolledCourses, userId);
        
        return res.status(200).json({
            success: true,
            message: `Payment verified and enrollment successful`
        });
    }

    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
        success: false,
        message: `Payment verification failed - Invalid signature`
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


// Enroll the student in the course
const enrollStudents = async(courses, userId, session) => {
    if(!courses || !userId) {
        return {
            success: false,
            message: `Please provide courseId and userId`
        };
    }

    const enrolledCourses = [];

    for(const courseId of courses){
        try{
            // Find the course and enroll student in it 
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                { $push: {studentEnrolled: userId} },
                { new: true, session }
            );

            if(!enrolledCourse){
                return {
                    success: false,
                    message: `Course not found with id: ${courseId}`
                };
            }

            // Create course progress
            const courseProgressArray = await CourseProgress.create(
                [
                    {
                        courseId: courseId,
                        userId: userId,
                        completedVideos: []
                    }
                ],
                { session }
            );

            if(!courseProgressArray || courseProgressArray.length === 0){
                return {
                    success: false,
                    message: `Failed to create course progress`
                };
            }

            const courseProgress = courseProgressArray[0]; // Get first element

            // Update user with enrolled course
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                { 
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id
                    } 
                },
                { new: true, session }
            );

            if(!enrolledStudent){
                return {
                    success: false,
                    message: `User not found with id: ${userId}`
                };
            }

            console.log("Enrolled student: ", enrolledStudent);

            // Store enrollment details for emails
            enrolledCourses.push({
                course: enrolledCourse,
                student: enrolledStudent
            });

        } catch (error) {
            console.log("enrollStudents error: ", error);
            return { 
                success: false, 
                message: error.message 
            };
        }
    }

    return {
        success: true,
        enrolledCourses: enrolledCourses
    };
}



// Send enrollment emails (outside transaction)
const sendEnrollmentEmails = async(enrolledCourses, userId) => {
    try {
        const user = await User.findById(userId);
        
        for(const enrollment of enrolledCourses) {
            try {
                await mailSender(
                    user.email,
                    `Enrolled Course Confirmation for ${enrollment.course.courseName}`,
                    courseEnrollmentEmail(
                        enrollment.course.courseName,
                        `${user.firstName} ${user.lastName}`
                    )
                );
                console.log(`Email sent for course: ${enrollment.course.courseName}`);
            } catch(emailError) {
                console.log("Error sending enrollment email:", emailError);
                // Don't fail the whole process if email fails
            }
        }
    } catch(error) {
        console.log("Error in sendEnrollmentEmails:", error);
        // Don't throw - email failure shouldn't affect enrollment
    }
}


// Add this new controller
exports.getRazorpayKey = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            key: process.env.RAZORPAY_KEY
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not fetch Razorpay key"
        });
    }
};


