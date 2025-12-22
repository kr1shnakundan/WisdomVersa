import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";

export default function Course_Card({ course, Height = "h-[380px]" }) {
  //console.log("Course in course_card:....", course);

  // Calculate average rating
  const avgRating =
    course?.ratingAndReview?.length > 0
      ? (
          course.ratingAndReview.reduce((acc, cur) => acc + cur.rating, 0) /
          course.ratingAndReview.length
        ).toFixed(1)
      : "0";

  return (
    <Link to={`/courses/${course._id}`}>
      <div
        className={`flex flex-col overflow-hidden rounded-xl bg-richblack-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-25/10 ${Height}`}
      >
        {/* Thumbnail */}
        <div className="h-[180px] w-full overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="text-lg font-semibold text-richblack-5 line-clamp-2">
              {course?.courseName}
            </h3>
            <p className="mt-1 text-sm text-richblack-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-yellow-25 font-medium">
                {avgRating}
              </span>
              <RatingStars Review_Count={course?.ratingAndReview?.length} />
              <span className="text-sm text-richblack-400">
                ({course?.ratingAndReview?.length || 0})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 text-xl font-semibold text-richblack-5">
            ₹{course?.price}
          </div>
        </div>
      </div>
    </Link>
  );
}
