const Category = require("../models/Category");
// const Tag = require("../models/Tags");

exports.createCategory = async(req,res) =>{
    try{
        //fetch data
        const {name , description}  = req.body;

        //validate
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:`please enter all the details carefully in create Tag`
            });
        }

        //create entry in db
        const categoryDetail = await Category.create({
            name:name,
            description:description,

        });
        console.log("categoryDetail : ",categoryDetail);

        res.status(200).json({
            success:true,
            message:`create category functioning successfully`
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:`error occured in create category`
        });
    }
}
 
//show all tags
exports.showAllCategories = async(req,res) =>{
    try{
        const allCategories = await Category.find({},{name:true, description:true})
        .populate("courses")
        .exec();
        console.log("Fetched Categories : ",allCategories);
        res.status(200).json({
            success:true,
            data: allCategories,
            message:`all Categories fetched successfully`
        })
    } catch(error){
        console.log("error in showAllCategries:",error);
        return res.status(500).json({
            success:false,
            message:`error in showAllCategory`
        })
    }
}

//categoryPage detail
exports.categoryPageDetails = async(req,res) =>{
    try{
        const {categoryId } = req.body

        //fetch category for this categoryId
        const selectedCategory = await Category.find({_id:categoryId})
        .populate({
            path:"courses" , 
            $match:{status:"Published"},
            populate:"ratingAndReview"
        }).exec();
        console.log("selectedCategory: ",selectedCategory);

        //case when the category not found
        if(!selectedCategory){
            console.log("category not found")
            return res.status(404).json({
                success:false,
                message:`category detail not found for the categoryId:${categoryId}`
            });
        }

        //case when course Not found for the category
        if(selectedCategory.length === 0){
            console.log("no course for this category")
            return res.status(400).json({
                success:false,
                message:`no course found in the selected category`
            });
        }

         // ✅ define getRandomInt here
            function getRandomInt(max) {
            return Math.floor(Math.random() * max);
            }

        //select other category except for the selected category
        const categoriesExceptSelected = await Category.find({
            _id:{$ne:categoryId}
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        ).populate({
            path:"courses",
            $match:{status:"Published"}
        })

        //get top selling course of all categories
        const allCategories = await Category.find({})
            .populate({
                path:"courses",
                $match:{status:"Published"},
                populate:"instructors"
            }).exec();
        const allCourses = allCategories.flatMap((category)=>category.courses)
        const mostSellingCourse = allCourses.sort((a,b)=>(b.sold - a.sold)).slice(0,10)
 
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourse
            }
        })


    } catch(error){
        console.log("error in categoryPageDetails: " , error);
        return res.status(500).json({
            success:false,
            message:`unable to make the category page details`
        })
    }
}