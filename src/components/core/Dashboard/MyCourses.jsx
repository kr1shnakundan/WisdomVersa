
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";

import Iconbtn from "../../common/Iconbtn";
import CourseTable from "./InstructorCourses/CourseTable";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
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
        <div className="flex flex-col items-center justify-center text-richblack-100 py-20">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
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


      {!loading && !error && courses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-richblack-300 mb-4">
            <MdAddCircleOutline size={64} />
          </div>
          <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
          <p className="text-richblack-400 mb-6">
            Start by creating your first course
          </p>
          <Iconbtn
            onclick={handleAddCourse}
            text="Create Course"
          />
        </div>
      )}
    </div>
  );
}