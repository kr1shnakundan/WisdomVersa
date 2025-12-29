import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from 'react-redux'
import { createRating } from '../../../services/operations/courseDetailsAPI'

const CourseReviewModal = ({setReviewModal}) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)
  const {courseEntireData} = useSelector((state)=>state.viewCourse)
  const [rating , setRating]= useState(0)
  const [review , setReview] = useState("")


  const submitReview = async() =>{
    if(!rating || !review.trim()){
      toast.error("Please provide Rating and Reviews")
      return
    }
    await dispatch(
      createRating(
        {
          courseId: courseEntireData._id,
          rating,
          review
        },
        token
      )
    )

    setReviewModal(false)
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
      <div className="bg-richblack-800 p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Add Review</h2>

        <ReactStars
          count={5}
          size={24}
          activeColor="#ffd700"
          value={rating}
          onChange={(newRating) => setRating(newRating)}
        />

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full mt-4 p-2 rounded bg-richblack-700"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setReviewModal(false)}
            className="px-4 py-2 bg-richblack-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={submitReview}
            className="px-4 py-2 bg-yellow-50 text-black rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal