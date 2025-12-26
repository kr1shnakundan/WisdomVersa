import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import RatingStars from "../../common/RatingStars";
import { formatDate } from "../../../services/formatDate";

function CourseHeroSection({ course, avgReviewCount, isEnrolled, handleBuyCourse, navigate }) {
  return (
    <div className="relative w-full bg-richblack-800">
      <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
        <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
          
          {/* Mobile Thumbnail */}
            <div className="relative block max-h-[30rem] lg:hidden overflow-hidden rounded-lg">
            <img
                src={course?.thumbnail || "https://via.placeholder.com/400x300"}
                alt="course thumbnail"
                className="aspect-auto w-full"
            />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-richblack-800 to-transparent"></div>
            </div>

          {/* Course Info */}
          <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 mt-24 lg:mt-0 text-lg text-richblack-5">
            <p className="text-sm text-richblack-300 hidden md:block ">
              Home / Learning / 
              <span className="text-yellow-50 ml-1">
                {course?.category?.name || "Course"}
              </span>
            </p>

            <div>
              <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                {course?.courseName}
              </p>
            </div>

            <p className="text-richblack-200">{course?.courseDescription}</p>

            <div className="text-md flex flex-wrap items-center gap-2">
              <span className="text-yellow-25">{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <span className="text-richblack-300">
                ({course?.ratingAndReviews?.length || 0} reviews)
              </span>
              <span className="text-richblack-300">
                {course?.studentEnrolled?.length || 0} students enrolled
              </span>
            </div>

            <div>
              <p className="text-richblack-200">
                Created By{" "}
                <span className="text-yellow-50">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-lg">
              <p className="flex items-center gap-2 text-richblack-300">
                <BiInfoCircle /> Created at {formatDate(course?.createdAt)}
              </p>
              <p className="flex items-center gap-2 text-richblack-300">
                <HiOutlineGlobeAlt /> English
              </p>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
              Rs. {course?.price}
            </p>
            {isEnrolled ? (
              <button 
                className="bg-caribbeangreen-400 text-richblack-900 py-3 rounded-lg font-semibold hover:bg-caribbeangreen-500 transition-all"
                onClick={() => navigate(`/dashboard/enrolled-courses`)}
              >
                Go to Course
              </button>
            ) : (
              <>
                <button 
                  className="bg-yellow-50 text-richblack-900 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-all"
                  onClick={handleBuyCourse}
                >
                  Buy Now
                </button>
                <button className="bg-richblack-700 text-richblack-5 py-3 rounded-lg font-semibold hover:bg-richblack-600 transition-all border border-richblack-600">
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseHeroSection;