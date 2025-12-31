import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { MdRateReview, MdClose } from "react-icons/md"
import { FiSend } from "react-icons/fi"

import { createRating ,editRating,  getFullDetailsOfCourseThunk} from "../../../services/operations/courseDetailsAPI"
import StarRating from "../../common/StarRating"

const CourseReviewModal = ({ setReviewModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  console.log("coursEntireData in courseReviewModal...:",courseEntireData)

  // 🔍 find existing review by logged-in user
  const userReview = courseEntireData?.ratingAndReview?.find(
    (r) => r.user === user?._id
  )

  console.log("userReview in courseReviewModal......:",userReview)

  const isEditMode = Boolean(userReview)

    console.log("isEditMode in courseReviewModal......:",)

  const [rating, setRating] = useState(userReview?.rating || 0)
  const [review, setReview] = useState(userReview?.review || "")
  const [loading, setLoading] = useState(false)

  const submitReview = async () => {
    if (!rating || !review.trim()) {
      toast.error("Please provide rating and review")
      return
    }

    setLoading(true)
    const payload = {
      courseId: courseEntireData._id,
      rating,
      review,
    }

    const success = isEditMode
      ? await editRating(payload, token)
      : await createRating(payload, token)

    if (success) {
      // refresh course data for instant UX
      dispatch(getFullDetailsOfCourseThunk(courseEntireData._id, token))
      setReviewModal(false)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-xl rounded-xl bg-richblack-800 shadow-2xl border border-richblack-700">

        {/* ================= Header ================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-richblack-700">
          <div className="flex items-center gap-2 text-richblack-25">
            <MdRateReview className="text-yellow-50 text-xl" />
            <h2 className="text-lg font-semibold">
              {isEditMode ? "Edit Your Review" : "Add Review"}
            </h2>
          </div>

          <button
            onClick={() => setReviewModal(false)}
            className="text-richblack-400 hover:text-richblack-25 transition"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* ================= Body ================= */}
        <div className="px-6 py-5 space-y-6">

          {/* Rating + User */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-6">
            <div>
              <p className="text-sm text-richblack-300 mb-2">Your Rating</p>

              <StarRating
                rating={rating}
                setRating={setRating}
              />

              <p className="mt-1 text-xs text-richblack-400">
                {rating > 0 ? `${rating} / 5` : "Click to rate"}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={user?.image}
                alt={user?.firstName}
                className="aspect-square w-[50px] rounded-full object-cover"
              />
              <p className="text-richblack-5 text-sm mt-1">
                {user?.firstName}
              </p>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <p className="text-sm text-richblack-300 mb-2">Your Review</p>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this course..."
              className={`
                w-full min-h-[140px] resize-none
                rounded-lg bg-richblack-700 p-4 text-sm
                text-richblack-5 outline-none
                overflow-y-auto dark-scrollbar
                focus:ring-2 focus:ring-yellow-50/60"}
              `}
            />
          </div>
        </div>

        {/* ================= Footer ================= */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-richblack-700">
          <button
            onClick={() => setReviewModal(false)}
            className="
              px-4 py-2 rounded-md
              bg-richblack-600 text-richblack-50
              hover:bg-richblack-500 transition
            "
          >
            Close
          </button>

          
          <button
            onClick={submitReview}
            disabled={loading}
            className="
              flex items-center gap-2
              px-4 py-2 rounded-md
              bg-yellow-50 text-black font-semibold
              hover:bg-yellow-25 transition
            "
          >
            <FiSend className="text-sm" />
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Review"
              : "Submit Review"}
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal