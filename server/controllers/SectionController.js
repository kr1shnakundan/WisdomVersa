const mongoose = require("mongoose");
const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const { data } = require("autoprefixer");

exports.createSection = async(req, res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        //fetch data
        const {sectionName,courseId} = req.body

        //data validation
        if(!sectionName || !courseId){
            await session.abortTransaction();
            session.endSession();
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
            populate:{
                path:"subSection",
            },
            
        }).exec();

        // if course not found -> abort and return
        if (!updatedCourse) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // 3️⃣ Commit transaction (now changes are saved permanently)
        await session.commitTransaction();
        session.endSession();

        //return response
        res.status(200).json({
            success:true,
            message:`section is successfully created`,
            data:updatedCourse
        })
    } catch(error){
        try {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
        } catch (abortErr) {
            console.error("Error aborting transaction:", abortErr);
        } finally {
            session.endSession();
        }
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
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // fetch updated course (only if courseId provided)
        let course = null;
        if (courseId) {
        course = await Course.findById(courseId)
            .populate({
            path: "courseContent",
            populate: { path: "subSection" },
            })
            .exec();

        if (!course) {
            return res.status(404).json({
            success: false,
            message: "Course not found",
            });
        }
        }

        
        //return res
        res.status(200).json({
            success:true,
            message: "Section successfully updated",
            data: course,
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
// exports.deleteSection = async(req,res) =>{
//     try{
//         //fetch data
//         const {sectionId , courseId} = req.body;

//         //remove this section from course
//         await Course.findByIdAndUpdate(courseId,{
//             $pull : {
//                 courseContent :sectionId,
//             }
//         })

//         //find section
//         const section = await Section.findById(sectionId);
//         console.log("sectionId : " , sectionId);
//         console.log("courseId: " , courseId)
//         if(!section) {
//             return res.status(400).json({
//                 success:false,
//                 message:`section not found`
//             })
//         }

//         //delete subSection of this section
//         await subSection.deleteMany({_id:{$in:section.subSection}});

//         //delete section
//         await Section.findByIdAndDelete(sectionId);

//         //find the updated course
//         const course = Course.findById(courseId).populate({
//             path:"courseContent",
//             populate:{
//                 path:"subSection"
//             },
//         }).exec();
//         res.status(200).json({
//             success:true,
//             message:`section deleted successfully`,
//             data:course
//         })

//     } catch(error){
//         return req.status(500).json({
//             success:false,
//             message:`error in deleting message`
//         })
//     }
// }

exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   
