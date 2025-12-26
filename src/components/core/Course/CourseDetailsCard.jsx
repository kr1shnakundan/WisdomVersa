import React from "react";
import { FiClock, FiBarChart2, FiBook, FiAward } from "react-icons/fi";

function CourseDetailsCard({ course, isEnrolled, handleBuyCourse, navigate }) {
  return (
    <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
      <div className="bg-richblack-700 rounded-xl p-6 border  border-richblack-600 sticky top-6">
        {/* Thumbnail */}
        <div className="w-full h-48 bg-richblack-600 rounded-lg mb-4 overflow-hidden">
          <img 
            src={course?.thumbnail || "https://via.placeholder.com/400x300"} 
            alt="course thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-3xl font-bold text-richblack-5">
            Rs. {course?.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {isEnrolled ? (
            <button 
              className="w-full bg-caribbeangreen-400 text-richblack-900 py-3 rounded-lg font-semibold hover:bg-caribbeangreen-500 transition-all"
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
            >
              Go to Course
            </button>
          ) : (
            <>
              <button
                onClick={handleBuyCourse}
                className="w-full bg-yellow-50 text-richblack-900 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-all"
              >
                Buy Now
              </button>
              <button className="w-full bg-richblack-800 text-richblack-5 py-3 rounded-lg font-semibold hover:bg-richblack-900 transition-all border border-richblack-600">
                Add to Cart
              </button>
            </>
          )}
        </div>

        {/* Features */}
        <div className="mt-6 pt-6 border-t border-richblack-600">
          <p className="text-richblack-5 font-semibold mb-4">This course includes:</p>
          <ul className="space-y-3 text-richblack-200 text-sm">
            <li className="flex items-center gap-3">
              <FiClock className="text-caribbeangreen-300" />
              <span>Full lifetime access</span>
            </li>
            <li className="flex items-center gap-3">
              <FiBarChart2 className="text-caribbeangreen-300" />
              <span>All levels</span>
            </li>
            <li className="flex items-center gap-3">
              <FiBook className="text-caribbeangreen-300" />
              <span>Downloadable resources</span>
            </li>
            <li className="flex items-center gap-3">
              <FiAward className="text-caribbeangreen-300" />
              <span>Certificate of completion</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;

