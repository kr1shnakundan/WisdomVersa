import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { useState } from "react"

const StarRating = ({
  rating,
  setRating,
  size = 26,
  readOnly = false,
}) => {
  const [hoverRating, setHoverRating] = useState(null)

  const displayRating =
    hoverRating !== null ? hoverRating : rating

  // shared logic to calculate value from cursor/touch position
  const calculateValue = (event, star) => {
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const clientX =
      event.touches?.[0]?.clientX ?? event.clientX
    const x = clientX - left
    return x < width / 2 ? star - 0.5 : star
  }

  const handleMouseMove = (e, star) => {
    if (readOnly) return
    setHoverRating(calculateValue(e, star))
  }

  const handleMouseLeave = () => {
    if (readOnly) return
    setHoverRating(null)
  }

  const handleClick = (e, star) => {
    if (readOnly) return
    const value = calculateValue(e, star)
    setRating(value) // ✅ always correct
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = displayRating >= star
        const isHalf =
          displayRating >= star - 0.5 && displayRating < star

        return (
          <div
            key={star}
            className="relative cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, star)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(e, star)}
            onTouchStart={(e) => handleClick(e, star)}
          >
            {/* Empty star */}
            <FaStar size={size} className="text-richblack-400" />

            {/* Half star */}
            {isHalf && (
              <FaStarHalfAlt
                size={size}
                className="absolute inset-0 text-yellow-100"
              />
            )}

            {/* Full star */}
            {isFull && (
              <FaStar
                size={size}
                className="absolute inset-0 text-yellow-100"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StarRating
