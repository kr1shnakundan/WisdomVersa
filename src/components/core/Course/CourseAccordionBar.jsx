import React from "react";
import { FiChevronDown, FiChevronUp, FiPlayCircle } from "react-icons/fi";

function CourseAccordionBar({ course, isActive, handleActive }) {
  return (
    <div className="border border-richblack-600 bg-richblack-700 mb-2">
      {/* Section Header */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-richblack-600 transition-all"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-2">
          {isActive.includes(course._id) ? (
            <FiChevronUp className="text-richblack-300" />
          ) : (
            <FiChevronDown className="text-richblack-300" />
          )}
          <p className="font-semibold">{course.sectionName}</p>
        </div>
        <span className="text-yellow-25 text-sm">
          {course.subSection?.length || 0} lecture(s)
        </span>
      </div>

      {/* Section Content */}
      {isActive.includes(course._id) && (
        <div className="border-t border-richblack-600">
          {course.subSection?.map((subSec, subIndex) => (
            <div 
              key={subSec._id || subIndex}
              className="flex justify-between items-center p-4 pl-10 hover:bg-richblack-800 transition-all"
            >
              <div className="flex items-center gap-2">
                <FiPlayCircle className="text-richblack-300" />
                <p className="text-richblack-50">{subSec.title}</p>
              </div>
              <span className="text-richblack-300 text-sm">
                {subSec.timeDuration || "5:00"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseAccordionBar;
