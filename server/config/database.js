const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DB connected successfully")})
    .catch((error)=>{
        console.log("error in database: " , error);
        console.log("error occurred while connecting DB");
        process.exit(1);
    });

}