import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import GetAvgRating from "../../../../utils/avgRating";
import { removeFromCart } from "../../../../slices/cartSlice";
import StarRating from "../../../common/StarRating";
import { useNavigate } from "react-router-dom";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("cart in renderCartCoursellljkjflk.....",cart)

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      {cart.map((course) => {
        const avgRating = GetAvgRating(course?.ratingAndReview || []);

        return (
          <div
            key={course._id}
            className="flex flex-col gap-4 rounded-xl border border-richblack-700 bg-richblack-800 p-5 sm:flex-row sm:justify-between"
          >
            {/* Left */}
            <div className="flex gap-4">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-24 w-36 rounded-lg object-cover"
              />

              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold"
                onClick={()=>navigate(`/`)}
                >
                  {course?.courseName}
                </p>

                <p className="text-sm text-richblack-400">
                  {course?.category?.name}
                </p>

                {/* Rating */}
                {course?.ratingAndReview?.length === 0 ? (
                  <p className="text-sm text-richblack-400">
                    No ratings yet
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-50 font-medium">
                      {avgRating.toFixed(1)}
                    </span>


                    <StarRating
                    rating={avgRating}
                    readOnly
                    />

                    <span className="text-sm text-richblack-400">
                      ({course.ratingAndReview.length})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end sm:justify-between">
              <button
                onClick={() => dispatch(removeFromCart(course?._id))}
                className="flex items-center gap-1 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-1 text-sm text-pink-200 hover:bg-richblack-600"
              >
                <RiDeleteBin6Line />
                Remove
              </button>

              <p className="text-2xl font-semibold text-yellow-100">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
