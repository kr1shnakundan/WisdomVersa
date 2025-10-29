const mongoose = require("mongoose");
const Section = require("../models/Section");
const Course = require("../models/Course");
const subSection = require("../models/SubSection")

exports.createSection = async(req, res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        //fetch data
        const {sectionName,courseId} = req.body

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:`please enter all the credentials to createSection`
            });
        }

        //create section
        // const newSection = await Section.create({
        //     sectionName

        // },{session});

        const newSection = new Section({ sectionName });
        await newSection.save({ session });


        //update course with section ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push : {courseContent:newSection._id}
            },
            {new:true , session}
        ).populate({
            path:"courseContent",
            // populate:{
            //     path:"subSection"
            // },
            
        }).exec();

        // 3️⃣ Commit transaction (now changes are saved permanently)
        await session.commitTransaction();
        session.endSession();

        //return response
        res.status(200).json({
            success:true,
            message:`section is successfully created`
        })
    } catch(error){
        // ❌ Rollback everything if error happens
        await session.abortTransaction();
        session.endSession();
        console.log("error in createSection : " , error);
        return res.status(500).json({
            success:false,
            message:`error in createSection`
        });
    }
}

//update section
exports.updateSection = async (req,res) =>{
    try{

        //fetch data 
        const {sectionName , sectionId , courseId} = req.body;

        //validate
        if(!sectionName ||  !sectionId) {
            return res.status(400).json({
                success:false,
                message:`please enter all the details to updateSection`
            });
        }

        //update 
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName},{new:true});

        const course = Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        }).exec();
        //return res
        res.status(200).json({
            success:true,
            message:`section successfully updated`
        })
    } catch(error){
        console.log("updateSection error : " , error)
        return res.status(500).json({
            success:false,
            message:`error in updating section`
        })
    };
}

//delete section
exports.deleteSection = async(req,res) =>{
    try{
        //fetch data
        const {sectionId , courseId} = req.body;

        //remove this section from course
        await Course.findByIdAndUpdate(courseId,{
            $pull : {
                courseContent :sectionId,
            }
        })

        //find section
        const section = await Section.findById(sectionId);
        console.log("sectionId : " , sectionId);
        console.log("courseId: " , courseId)
        if(!section) {
            return res.status(400).json({
                success:false,
                message:`section not found`
            })
        }

        //delete subSection of this section
        await subSection.deleteMany({_id:{$in:section.subSections}});

        //delete section
        await Section.findByIdAndDelete(sectionId);

        //find the updated course
        const course = Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        }).exec();
        res.status(200).json({
            success:true,
            message:`section deleted successfully`
        })

    } catch(error){
        return req.status(500).json({
            success:false,
            message:`error in deleting message`
        })
    }
}
