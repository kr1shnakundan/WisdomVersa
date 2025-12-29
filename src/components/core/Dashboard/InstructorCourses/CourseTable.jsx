import { Table, Thead, Tr, Th, Td, Tbody } from "react-super-responsive-table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { CiTimer } from "react-icons/ci";
import { MdDelete, MdEdit, MdSchool } from "react-icons/md";

import { COURSE_STATUS } from "../../../../utils/constant";
import { formatDate } from "../../../../services/formatDate";
import { 
  deleteCourse, 
  fetchInstructorCourses 
} from "../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function CourseTable({ courses, setCourses }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Handle course deletion with comprehensive error handling
  const handleCourseDelete = useCallback(async (courseId) => {
    try {
      setLoading(true);
      await deleteCourse({ courseId }, token);
      
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
    } 
    setConfirmationModal(null);
    setLoading(false);
    
  }, [token, setCourses]);

  // Open confirmation modal with course context
  const handleSetConfirmationModal = useCallback((course) => {
    setConfirmationModal({
      text1: "Delete this course?",
      text2: "All course data, including student progress and content, will be permanently deleted.",
      btn1Text: loading ? "Deleting..." : "Delete Course",
      btn2Text: "Cancel",
      btn1Handler: loading ? () => {} : () => handleCourseDelete(course._id),
      btn2Handler: loading ? () => {} : () => setConfirmationModal(null),
    });
  }, [loading, handleCourseDelete]);

  // Navigate to course edit page
  const handleEditCourse = useCallback((courseId) => {
    navigate(`/dashboard/edit-course/${courseId}`);
  }, [navigate]);

  // Render professional status badge
  const renderStatusBadge = (status) => {
    if (status === COURSE_STATUS.PUBLISHED) {
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-caribbeangreen-500/10 border border-caribbeangreen-500/30 px-3 py-1.5 text-xs font-semibold text-caribbeangreen-300 shadow-sm">
          <div className="flex h-2 w-2 items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-caribbeangreen-400 animate-pulse shadow-lg shadow-caribbeangreen-500/50"></div>
          </div>
          <span>Published</span>
        </div>
      );
    }
    
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 text-xs font-semibold text-yellow-300 shadow-sm">
        <CiTimer size={14} className="text-yellow-300" />
        <span>Draft</span>
      </div>
    );
  };

  // Professional empty state
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4 bg-richblack-800/30 rounded-xl border-2 border-dashed border-richblack-600 backdrop-blur-sm">
        <div className="bg-richblack-700/50 rounded-full p-5 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          <MdSchool className="text-richblack-400 text-4xl sm:text-5xl lg:text-6xl" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-richblack-5 mb-2 text-center">
          No Courses Yet
        </h3>
        <p className="text-sm sm:text-base text-richblack-300 text-center max-w-md px-4 leading-relaxed">
          Start creating engaging courses for your students. Click the "New" button above to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="hidden md:block rounded-xl border border-richblack-600 bg-richblack-800/40 backdrop-blur-sm overflow-hidden shadow-2xl">
        <Table className="text-richblack-5 w-full">
          <Thead className="bg-richblack-800/80">
            <Tr className="flex gap-x-4 lg:gap-x-8 text-xs font-bold uppercase tracking-wider text-richblack-100 border-b-2 border-richblack-600 px-4 lg:px-6 py-4">
              <Th className="flex-1 text-left font-bold">Course Details</Th>
              <Th className="text-left font-bold w-[90px] lg:w-[110px]">Duration</Th>
              <Th className="text-left font-bold w-[110px] lg:w-[130px]">Price</Th>
              <Th className="text-center font-bold w-[90px] lg:w-[110px]">Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses.map((course, index) => (
              <Tr
                key={course._id}
                className={`flex gap-x-4 lg:gap-x-8 border-b border-richblack-700/50 px-4 lg:px-6 py-4 lg:py-5 transition-all duration-300 hover:bg-richblack-700/30 hover:shadow-lg ${
                  index % 2 === 0 ? 'bg-richblack-800/20' : 'bg-transparent'
                }`}
              >
                {/* Course Info Column */}
                <Td className="flex flex-1 gap-x-3 lg:gap-x-4 min-w-0">
                  <div className="relative group flex-shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[90px] w-[140px] lg:h-[120px] lg:w-[200px] rounded-lg object-cover border border-richblack-600 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-caribbeangreen-500/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                    <div className="space-y-1.5">
                      <h3 
                      onClick={()=>navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}
                      className="text-base lg:text-lg font-bold text-richblack-5 line-clamp-1 hover:text-caribbeangreen-300 transition-colors cursor-pointer"
                      >
                        {course.courseName}
                      </h3>
                      <p className="text-xs lg:text-sm leading-relaxed text-richblack-300 line-clamp-2">
                        {course.courseDescription}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                      <p className="text-xs text-richblack-400 font-medium">
                        Created {formatDate(course.createdAt)}
                      </p>
                      {renderStatusBadge(course.status)}
                    </div>
                  </div>
                </Td>

                {/* Duration Column */}
                <Td className="flex items-center justify-center w-[90px] lg:w-[110px]">
                  <span className="text-xs lg:text-sm font-bold text-richblack-100 bg-richblack-700/60 px-2.5 lg:px-3 py-1.5 rounded-md border border-richblack-600 whitespace-nowrap shadow-sm">
                    {course.totalDuration }
                  </span>
                </Td>

                {/* Price Column */}
                <Td className="flex items-center w-[110px] lg:w-[130px]">
                  <span className="text-sm lg:text-base font-bold text-caribbeangreen-300 whitespace-nowrap">
                    ₹{course.price?.toLocaleString('en-IN') || "0"}
                  </span>
                </Td>

                {/* Actions Column */}
                <Td className="flex items-center justify-center gap-1.5 lg:gap-2 w-[90px] lg:w-[110px]">
                  <button
                    disabled={loading}
                    onClick={() => handleEditCourse(course._id)}
                    title="Edit Course"
                    aria-label={`Edit ${course.courseName}`}
                    className="group relative p-2 lg:p-2.5 rounded-lg bg-caribbeangreen-500/10 border border-caribbeangreen-500/30 hover:bg-caribbeangreen-500/20 hover:border-caribbeangreen-400/50 hover:shadow-lg hover:shadow-caribbeangreen-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdEdit 
                      size={18} 
                      className="text-caribbeangreen-400 group-hover:scale-110 group-hover:text-caribbeangreen-300 transition-all duration-200 lg:w-5 lg:h-5" 
                    />
                  </button>
                  
                  <button
                    disabled={loading}
                    onClick={() => handleSetConfirmationModal(course)}
                    title="Delete Course"
                    aria-label={`Delete ${course.courseName}`}
                    className="group relative p-2 lg:p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdDelete 
                      size={18} 
                      className="text-pink-400 group-hover:scale-110 group-hover:text-pink-300 transition-all duration-200 lg:w-5 lg:h-5" 
                    />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="block md:hidden space-y-4">
        {courses.map((course, index) => (
          <div
            key={course._id}
            className="bg-richblack-800/40 backdrop-blur-sm border border-richblack-600 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-richblack-500 transition-all duration-300"
          >
            {/* Course Image with Status Badge Overlay */}
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
              <div className="absolute top-3 right-3">
                {renderStatusBadge(course.status)}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <h3 className="text-lg font-bold text-richblack-5 line-clamp-2 leading-snug">
                {course.courseName}
              </h3>

              {/* Description */}
              <p className="text-sm text-richblack-300 line-clamp-3 leading-relaxed">
                {course.courseDescription}
              </p>

              {/* Meta Information */}
              <div className="pt-3 border-t border-richblack-700">
                <p className="text-xs text-richblack-400 mb-3">
                  Created {formatDate(course.createdAt)}
                </p>
                
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-richblack-100 bg-richblack-700/60 px-2.5 py-1 rounded border border-richblack-600">
                      {course.totalDuration || "0s"}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-caribbeangreen-300">
                    ₹{course.price?.toLocaleString('en-IN') || "0"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-3">
                <button
                  disabled={loading}
                  onClick={() => handleEditCourse(course._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-caribbeangreen-500/10 border border-caribbeangreen-500/30 hover:bg-caribbeangreen-500/20 hover:border-caribbeangreen-400/50 text-caribbeangreen-300 font-semibold text-sm transition-all duration-300 disabled:opacity-50 active:scale-95"
                >
                  <MdEdit size={18} />
                  <span>Edit</span>
                </button>
                
                <button
                  disabled={loading}
                  onClick={() => handleSetConfirmationModal(course)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 hover:border-pink-400/50 text-pink-300 font-semibold text-sm transition-all duration-300 disabled:opacity-50 active:scale-95"
                >
                  <MdDelete size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
}