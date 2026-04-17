
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv")
dotenv.config();

//auth middleware function
exports.auth = async(req,res,next) =>{
    try{
        //extract jwt token from cache
        const token = 
                        req.cookies.token || 
                        req.body.token || 
                        req.header("Authorization").replace("Bearer ", "");

        // If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

        try{
            //verify the jwt
            const decode = jwt.verify(token , process.env.JWT_SECRET)
            // console.log("decode:",decode);

            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        } catch(error){
            // If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
        }

        // If JWT is valid, move on to the next middleware or request handler
		next();
    } catch(error) {
        // If there is an error during the authentication process, return 401 Unauthorized response
        console.log("error in auth : " ,error);
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}

exports.isStudent = async(req,res,next) =>{
    try{
        const userDetail = await User.findOne({email:req.user.email});
        if(userDetail.accountType !== "Student"){
            return res.status(400).json({
                success:false,
                message:`only students allowed`
            });
        }
        // //return success
        // res.status(200).json({
        //     success:true,
        //     message:`welcome to the student section`
        // })
         //move to the next middleware
        next();
    } catch(error){
        return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified in student` });
	
    }
}

//middleware for instructor
exports.isAdmin = async(req,res,next) =>{
    try{
        const userDetail = await User.findOne({email:req.user.email});
        if(userDetail.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:`only admin allowed`
            });
        }
        next();
    } catch(error){
         return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified in admin` });
    }
    
};

//is instructor
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Instructor") {
			return res.status(400).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};



exports.requireRecentAuthFromToken = async(req,res,next) =>{
    try{
        const token = 
                        req.cookies.token || 
                        req.body.token || 
                        req.header("Authorization").replace("Bearer ","");

        // If JWT is missing, return 401 Unauthorized response
        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }
        try{
            //verify the jwt
            const decode = jwt.verify(token , process.env.JWT_SECRET)
            // console.log("decode:",decode);

            // Check if the token is older than the allowed age
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            if (currentTime - decode.iat > parseInt(process.env.MAX_AUTH_AGE)) {
                return res.status(401).json({
                     success: false,
                      message: "Token is too old. Please re-authenticate." ,
                      reauth_required: true
                    });
            }

            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        } catch(error){
            // If JWT verification fails, return 401 Unauthorized response
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }

        // If JWT is valid and recent, move on to the next middleware or request handler
        next();
    } catch(error){
        return res
            .status(500)
            .json({ success: false, message: `Error in requireRecentAuthFromToken middleware` });
    }
}