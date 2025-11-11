const express = require("express")
const app = express();

const userRoutes = require("./routes/UserRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const profileRoutes = require("./routes/ProfileRoutes");
const courseRoutes = require("./routes/CourseRoutes");
const contactRoutes = require("./routes/ContactRoutes");

const {auth , isStudent , isAdmin , isInstructor} = require("./middlewares/authMiddleware");

const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");


const dotenv = require("dotenv");
 
dotenv.config();

const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares  
app.use(express.json());
app.use(cookieParser()); 
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.get("/test-cookie", (req, res) => {
    console.log("Setting test cookie...");
    res.cookie("test", "hello", {
        httpOnly: true,
        sameSite: 'lax'
    }).json({ message: "Cookie set" });
});


app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection
cloudinaryConnect();


app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/reach",contactRoutes)
app.use("/api/v1/profile",profileRoutes)

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:`server is on and running...`
    });
})

app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`)
})