// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import Iconbtn from "../../common/Iconbtn";
// import CourseTable from "./InstructorCourses/CourseTable";
// import { MdAddCircleOutline } from "react-icons/md";
// import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

// export default function MyCourses (){
//     const {token} = useSelector((state)=>state.auth)
//     const navigate = useNavigate();
//     const [courses , setCourses] = useState([])

//      useEffect(() => {
//     const fetchCourses = async () => {
//       const result = await fetchInstructorCourses(token)
//       if (result) {
//         setCourses(result)
//       }
//     }
//     fetchCourses()
//   }, [])
//     return(
//         <div className="text-richblack-5">
//             <div className="flex items-center justify-between mb-14">
//                 <h2 className="text-3xl font-semibold">My Courses</h2>
//                 <Iconbtn 
//                 onclick={()=>navigate("/dashboard/add-course")}
//                 text={
//                     <div className="flex items-center gap-1">
//                         <MdAddCircleOutline />
//                         <p>New</p>
//                     </div>
//                 }
//                 />
//             </div>
//             {courses && 
//                 <CourseTable courses = {courses} setCourses={setCourses} />
//             }
//         </div>
//     )
// }


import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";

import Iconbtn from "../../common/Iconbtn";
import CourseTable from "./InstructorCourses/CourseTable";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

/**
 * MyCourses Component
 * Displays instructor's courses with options to add, edit, and delete courses
 */
export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches instructor courses from the API
   */
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchInstructorCourses(token);
      
      if (result) {
        setCourses(result);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  /**
   * Navigates to add course page
   */
  const handleAddCourse = useCallback(() => {
    navigate("/dashboard/add-course");
  }, [navigate]);

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="text-richblack-5">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-14">
        <h1 className="text-3xl font-semibold">My Courses</h1>
        <Iconbtn
          onclick={handleAddCourse}
          text={
            <div className="flex items-center gap-1">
              <MdAddCircleOutline size={20} />
              <span>New</span>
            </div>
          }
          aria-label="Add new course"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="spinner-border text-richblack-100" role="status">
            <span className="sr-only">Loading courses...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchCourses}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Course Table */}
      {!loading && !error && (
        <CourseTable courses={courses} setCourses={setCourses} />
      )}
    </div>
  );
}