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

//middlewares  
app.use(express.json());
app.use(cookieParser()); 
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         credentials:true
//     })
// )

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://wisdom-versa.vercel.app",
      "https://wisdom-versa-h8x471m5p-kr1shnakundans-projects.vercel.app"
    ],
    credentials: true
  })
);

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



// Connect to database FIRST, then start server
const startServer = async () => {
    try {
        await database.connect();
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();