// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getInstructorData } from "../../../../services/operations/profileAPI";
// import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
// import InstructorChart from "./InstructorChart";

// export default function Instructor(){
//     const navigate = useNavigate()
//     const {token} = useSelector((state)=>state.auth)
//     const {user} = useSelector((state)=>state.profile)
//     const [loading , setLoading] = useState(false)
//     const [instructorData, setInstructorData] = useState(null)
//     const[courses , setCourses] = useState([])

//     useEffect(()=>{
//         const fetchInstructorAllData = async()=>{
//             setLoading(true)
//             const instructorApiData = await getInstructorData(token)
//             const result = await fetchInstructorCourses(token)

//             if(instructorApiData.length){
//                 setInstructorData(instructorApiData)
//             }
//             if(result){
//                 setCourses(result)
//             }
//             setLoading(false)
//         }

//         fetchInstructorAllData()
//     },[])

//     const totalAmount = instructorData?.reduce(
//         (acc,curr)=> acc + curr.totalAmountGenerated,0
//     )

//     const totalStudents = instructorData?.reduce(
//         (acc,curr)=> acc+ curr.totalStudentsEnrolled , 0
//     )

//     return(
//         <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6 md:p-8">
//             {/* Welcome Section */}
//             <div className="mb-8">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-2 text-richblack-5">
//                     Hi, {user?.firstName}! 👋
//                 </h2>
//                 <p className="text-richblack-300 text-lg">Let's start something new</p>
//             </div>

//             {loading ? (
//                 <div className="flex items-center justify-center min-h-[400px]">
//                     <div className="spinner border-4 border-richblack-700 border-t-yellow-50 rounded-full w-12 h-12 animate-spin"></div>
//                 </div>
//             ) : courses?.length > 0 ? (
//                 <div className="space-y-8">
//                     {/* Statistics and Chart Section */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         {/* Statistics Cards */}
//                         <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
//                             <h3 className="text-2xl font-semibold mb-6 text-richblack-5">Statistics</h3>
                            
//                             <div className="space-y-4">
//                                 {/* Total Courses */}
//                                 <div className="flex justify-between items-center p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors">
//                                     <div>
//                                         <p className="text-richblack-300 text-sm mb-1">Total Courses</p>
//                                         <p className="text-3xl font-bold text-richblack-5">{courses.length}</p>
//                                     </div>
//                                     <div className="w-12 h-12 bg-yellow-900/30 rounded-full flex items-center justify-center">
//                                         <span className="text-2xl">📚</span>
//                                     </div>
//                                 </div>

//                                 {/* Total Students */}
//                                 <div className="flex justify-between items-center p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors">
//                                     <div>
//                                         <p className="text-richblack-300 text-sm mb-1">Total Students</p>
//                                         <p className="text-3xl font-bold text-richblack-5">{totalStudents}</p>
//                                     </div>
//                                     <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center">
//                                         <span className="text-2xl">👥</span>
//                                     </div>
//                                 </div>

//                                 {/* Total Income */}
//                                 <div className="flex justify-between items-center p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors">
//                                     <div>
//                                         <p className="text-richblack-300 text-sm mb-1">Total Income</p>
//                                         <p className="text-3xl font-bold text-green-400">₹{totalAmount?.toLocaleString()}</p>
//                                     </div>
//                                     <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center">
//                                         <span className="text-2xl">💰</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Visualization Section */}
//                         <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 flex items-center justify-center">
//                             {totalAmount > 0 || totalStudents > 0 ? (
//                                 // <div className="text-center">
//                                 //     <div className="w-48 h-48 bg-richblack-700 rounded-full flex items-center justify-center mb-4 mx-auto">
//                                 //         <span className="text-6xl">📊</span>
//                                 //     </div>
//                                 //     <p className="text-richblack-300">Chart visualization would go here</p>
//                                 // </div>
//                                 <div>
//                                     <InstructorChart courses={instructorData}/>
//                                 </div>
//                             ) : (
//                                 <div className="text-center">
//                                     <div className="w-32 h-32 bg-richblack-700 rounded-full flex items-center justify-center mb-4 mx-auto">
//                                         <span className="text-5xl">📈</span>
//                                     </div>
//                                     <p className="text-xl font-semibold text-richblack-5 mb-2">Visualize</p>
//                                     <p className="text-richblack-400">
//                                         Not enough data to visualize
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Your Courses Section */}
//                     <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="text-2xl font-semibold text-richblack-5">Your Published Courses</h3>
//                             <button 
//                                 onClick={() => navigate("/dashboard/my-courses")}
//                                 className="text-yellow-50 hover:text-yellow-25 font-medium flex items-center gap-2 transition-colors"
//                             >
//                                 View All
//                                 <span>→</span>
//                             </button>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {courses.slice(0, 3).map((course, index) => (
//                                 <div 
//                                     key={course._id || index}
//                                     onClick={() => navigate(`/dashboard/course/${course._id}`)}
//                                     className="bg-richblack-700 rounded-lg overflow-hidden hover:scale-105 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300 cursor-pointer border border-richblack-600"
//                                 >
//                                     {/* Course Thumbnail */}
//                                     <div className="w-full h-40 bg-gradient-to-br from-richblack-600 to-richblack-800 flex items-center justify-center relative overflow-hidden group">
//                                         {course.thumbnail ? (
//                                             <img 
//                                                 src={course.thumbnail} 
//                                                 alt={course.courseName}
//                                                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                                             />
//                                         ) : (
//                                             <span className="text-5xl">🎓</span>
//                                         )}
//                                         <div className="absolute top-2 right-2 bg-yellow-50 text-richblack-900 px-2 py-1 rounded text-xs font-semibold">
//                                             {course.status || 'Published'}
//                                         </div>
//                                     </div>
                                    
//                                     {/* Course Details */}
//                                     <div className="p-4">
//                                         <h4 className="font-semibold text-richblack-5 mb-2 line-clamp-2 min-h-[3rem]">
//                                             {course.courseName || `Course ${index + 1}`}
//                                         </h4>
                                        
//                                         <div className="flex items-center justify-between text-sm mb-3">
//                                             <div className="flex items-center gap-1 text-richblack-300">
//                                                 <span>👥</span>
//                                                 <span>{course.studentsEnrolled?.length || 0} students</span>
//                                             </div>
//                                             <div className="text-green-400 font-bold">
//                                                 ₹{course.price?.toLocaleString() || '0'}
//                                             </div>
//                                         </div>

//                                         {/* Additional Info */}
//                                         <div className="flex items-center justify-between text-xs text-richblack-400 pt-3 border-t border-richblack-600">
//                                             <span>⏱️ {course.totalDuration || 'N/A'}</span>
//                                             <span className="text-yellow-50 font-medium hover:underline">
//                                                 View Details →
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="bg-richblack-800 rounded-xl p-12 border border-richblack-700 text-center">
//                     <div className="w-32 h-32 bg-richblack-700 rounded-full flex items-center justify-center mb-6 mx-auto">
//                         <span className="text-6xl">📝</span>
//                     </div>
//                     <h3 className="text-2xl font-semibold text-richblack-5 mb-2">No courses created yet</h3>
//                     <p className="text-richblack-300 mb-6">Start creating your first course to share your knowledge</p>
//                     <button 
//                         onClick={() => navigate("/dashboard/add-course")}
//                         className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-25 transition-colors"
//                     >
//                         Create Your First Course
//                     </button>
//                 </div>
//             )}
//         </div>
//     )
// }


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import InstructorChart from "./InstructorChart";

export default function Instructor(){
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const [loading , setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const[courses , setCourses] = useState([])

    useEffect(()=>{
        const fetchInstructorAllData = async()=>{
            setLoading(true)
            const instructorApiData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)

            if(instructorApiData.length){
                setInstructorData(instructorApiData)
            }
            if(result){
                setCourses(result)
            }
            setLoading(false)
        }

        fetchInstructorAllData()
    },[])

    const totalAmount = instructorData?.reduce(
        (acc,curr)=> acc + curr.totalAmountGenerated,0
    )

    const totalStudents = instructorData?.reduce(
        (acc,curr)=> acc+ curr.totalStudentsEnrolled , 0
    )

    return(
        <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6 md:p-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-richblack-5">
                    Hi, {user?.firstName}! 👋
                </h2>
                <p className="text-richblack-300 text-lg">Let's start something new</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="spinner border-4 border-richblack-700 border-t-yellow-50 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : courses?.length > 0 ? (
                <div className="space-y-6">
                    {/* Statistics Cards - Horizontal Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Total Courses Card */}
                        <div className="bg-richblack-800 rounded-xl p-5 border border-richblack-700 hover:border-richblack-600 transition-all hover:shadow-lg">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-richblack-300 text-xs uppercase tracking-wide mb-1">Total Courses</p>
                                    <p className="text-3xl font-bold text-richblack-5">{courses.length}</p>
                                </div>
                                <div className="w-10 h-10 bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">📚</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-richblack-400">
                                <span className="text-yellow-400">●</span>
                                <span>Published</span>
                            </div>
                        </div>

                        {/* Total Students Card */}
                        <div className="bg-richblack-800 rounded-xl p-5 border border-richblack-700 hover:border-richblack-600 transition-all hover:shadow-lg">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-richblack-300 text-xs uppercase tracking-wide mb-1">Total Students</p>
                                    <p className="text-3xl font-bold text-richblack-5">{totalStudents}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">👥</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-richblack-400">
                                <span className="text-blue-400">●</span>
                                <span>Enrolled</span>
                            </div>
                        </div>

                        {/* Total Income Card */}
                        <div className="bg-richblack-800 rounded-xl p-5 border border-richblack-700 hover:border-richblack-600 transition-all hover:shadow-lg">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-richblack-300 text-xs uppercase tracking-wide mb-1">Total Income</p>
                                    <p className="text-3xl font-bold text-green-400">₹{totalAmount?.toLocaleString()}</p>
                                </div>
                                <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">💰</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-richblack-400">
                                <span className="text-green-400">●</span>
                                <span>Revenue</span>
                            </div>
                        </div>
                    </div>

                    {/* Visualization Section - Full Width */}
                    <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                        {totalAmount > 0 || totalStudents > 0 ? (
                            <InstructorChart courses={instructorData}/>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-32 h-32 bg-richblack-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-5xl">📈</span>
                                </div>
                                <p className="text-xl font-semibold text-richblack-5 mb-2">Visualize</p>
                                <p className="text-richblack-400">
                                    Not enough data to visualize
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Your Courses Section */}
                    <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-richblack-5">Your Published Courses</h3>
                            <button 
                                onClick={() => navigate("/dashboard/my-courses")}
                                className="text-yellow-50 hover:text-yellow-25 font-medium flex items-center gap-2 transition-colors"
                            >
                                View All
                                <span>→</span>
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {courses.slice(0, 3).map((course, index) => (
                                <div 
                                    key={course._id || index}
                                    onClick={() => navigate(`/dashboard/course/${course._id}`)}
                                    className="bg-richblack-700 rounded-lg overflow-hidden hover:scale-105 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300 cursor-pointer border border-richblack-600"
                                >
                                    {/* Course Thumbnail */}
                                    <div className="w-full h-40 bg-gradient-to-br from-richblack-600 to-richblack-800 flex items-center justify-center relative overflow-hidden group">
                                        {course.thumbnail ? (
                                            <img 
                                                src={course.thumbnail} 
                                                alt={course.courseName}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <span className="text-5xl">🎓</span>
                                        )}
                                        <div className="absolute top-2 right-2 bg-yellow-50 text-richblack-900 px-2 py-1 rounded text-xs font-semibold">
                                            {course.status || 'Published'}
                                        </div>
                                    </div>
                                    
                                    {/* Course Details */}
                                    <div className="p-4">
                                        <h4 className="font-semibold text-richblack-5 mb-2 line-clamp-2 min-h-[3rem]">
                                            {course.courseName || `Course ${index + 1}`}
                                        </h4>
                                        
                                        <div className="flex items-center justify-between text-sm mb-3">
                                            <div className="flex items-center gap-1 text-richblack-300">
                                                <span>👥</span>
                                                <span>{course.studentsEnrolled?.length || 0} students</span>
                                            </div>
                                            <div className="text-green-400 font-bold">
                                                ₹{course.price?.toLocaleString() || '0'}
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        <div className="flex items-center justify-between text-xs text-richblack-400 pt-3 border-t border-richblack-600">
                                            <span>⏱️ {course.totalDuration || 'N/A'}</span>
                                            <span className="text-yellow-50 font-medium hover:underline">
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-richblack-800 rounded-xl p-12 border border-richblack-700 text-center">
                    <div className="w-32 h-32 bg-richblack-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <span className="text-6xl">📝</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-richblack-5 mb-2">No courses created yet</h3>
                    <p className="text-richblack-300 mb-6">Start creating your first course to share your knowledge</p>
                    <button 
                        onClick={() => navigate("/dashboard/add-course")}
                        className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-25 transition-colors"
                    >
                        Create Your First Course
                    </button>
                </div>
            )}
        </div>
    )
}