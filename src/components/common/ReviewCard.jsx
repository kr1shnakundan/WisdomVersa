import StarRating from "./StarRating"

const ReviewCard = ({ review }) => {
  const user = review?.user

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
  const userImage =
    user?.image && user.image.trim() !== ""
      ? user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(fullName)}`

  return (
    <div className="w-[300px] shrink-0 rounded-xl bg-richblack-800 p-5 shadow-md">
      {/* USER */}
      <div className="flex items-center gap-3">
        <img
          src={userImage}
          alt={fullName}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-richblack-5">
            {fullName}
          </p>
          <p className="text-xs text-richblack-400 line-clamp-1">
            {review?.course?.courseName || "Course"}
          </p>
        </div>
      </div>

      {/* REVIEW */}
      <p className="mt-4 text-sm text-richblack-100 line-clamp-4">
        {review?.review || "Great learning experience!"}
      </p>

      {/* RATING */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-yellow-25 font-semibold">
          {review?.rating}
        </span>
        <StarRating rating={review?.rating} size="14px" readOnly />
      </div>
    </div>
  )
}

export default ReviewCard
