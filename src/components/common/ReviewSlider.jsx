import React, { useEffect, useState } from "react"
import { getAllRatings } from "../../services/operations/courseDetailsAPI"
import ReviewCard from "./ReviewCard"

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getAllRatings()
        setReviews(result)
      } catch (error) {
        console.log("Error in ReviewSlider:", error)
      }
    }
    fetchReviews()
  }, [])

  if (!reviews.length) return null

  // duplicate reviews for seamless loop
  const loopReviews = [...reviews, ...reviews]

  return (
    <div className="w-full overflow-hidden">
      <h2 className="mb-6 text-2xl font-bold text-richblack-5">
        What our learners say
      </h2>

      <div className="relative">
        <div className="flex gap-6 animate-review-slider">
          {loopReviews.map((review, index) => (
            <ReviewCard key={`${review._id}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider
