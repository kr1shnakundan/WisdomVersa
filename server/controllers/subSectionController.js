const Section = require("../models/Section");
const subSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/ImageUploader")
require("dotenv").config();

exports.createSubSection = async(req,res) =>{
    try{

        //fetch
        const {title , description , sectionId} = req.body;
        const video = req.files.video;

        //validation
        if(!title || !description || !sectionId  || !video) {
            return req.status(400).json({
                success:false,
                message:`please fill all the detail of createsubSection`
            })
        }
        console.log("video : " ,video);

        //upload image to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , 
            process.env.FOLDER_NAME
        );
        console.log("uploadDetails in createSubSection : " ,uploadDetails);
        

        //creat new subSection
        const subSectionDetails = await subSection.create({
            title:title,
            description:description,
            timeDuration:`${uploadDetails.duration}`,
            videoUrl:uploadDetails.secure_url,

        })

        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSections: subSectionDetails._id } },
            { new: true }
        )

        // Return the updated section in the response
        return res.status(200).json({ success: true, data: updatedSection })


    } catch(error){
        console.log("createSubSection error : " ,error)
        return res.status(500).json({
            success:false,
            message:`error while creating subSection`
        });
    }
}


//UPDATE SUB-SECTION
exports.updateSubSection = async(req,res) =>{
    try{
        //fetch data
        const {sectionId , subSectionId , title , description} = req.body;

        //find data from subsection
        const subSectionDetails = await subSection.findById(subSectionId);
        if(!subSectionDetails){
            return res.status(404).json({
                success:false,
                message:`subSection detail not found`
            })
        }

        if(title !== undefined){
            subSectionDetails.title = title
        }

        if(description !== undefined){
            subSectionDetails.description = description
        }

        if(req.files && req.files.video !== undefined){
            const video = req.files.video 
            const uploadedVideoDetails = await uploadImageToCloudinary(video ,
                 process.env.FOLDER_NAME);
            console.log("uploaded Video Details in updateSubSection : " ,uploadedVideoDetails)

            subSectionDetails.videoUrl = uploadedVideoDetails.secure_url
            subSectionDetails.timeDuration = `${uploadedVideoDetails.duration}`

        }
        await subSectionDetails.save();


        //return updated section
        const updatedSection = await Section.findById(sectionId).populate("subSections").exec();

        console.log("updated section", updatedSection)

        return res.status(200).json({
            success:true,
            message:`section Updated successfully`
        })


    } catch(error){
        console.log("Error in updateSubSection : " , error);
        return res.status(500).json({
            success:false,
            message:`error occurred while updating subsection`
        })
    }
}

//DELETE SUB-SECTION
exports.deleteSubSection = async(req,res) => {
    try{
        //fetch sectionId and subSectionId
        const {sectionId , subSectionId} = req.body;

        //remove subsectionid from subsections array in section
        await Section.findByIdAndUpdate(sectionId,{
            $pull:{subSections:subSectionId}
        },
        {new:true});

        //delete subsection
        const subSectionDetail = await subSection.findByIdAndDelete(subSectionId)
        if (!subSectionDetail) {
        return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }

        //fetch updated section
        // const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        
        return res.status(200).json({
            success:true,
            message:`subsection successfully deleted`
        })

    } catch(error){
        console.log("error in deleteSubSection: " ,error);
        return res.status(500).json({
            success:false,
            message:`error occurred while deleting subsection`
        })
    }
}