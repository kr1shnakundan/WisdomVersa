import { useSelector } from "react-redux"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import ReactStars from "react-rating-stars-component"
export default function RenderCartCourses () {
    const { cart,removeFromCart } = useSelector((state)=>state.cart) 
    const dispatch = useDispatch()
    return(
        <div>
            {
                cart.map((course,index)=>{
                    return(
                        <div key={course._id}>
                            <div>
                                <img 
                                src={course?.thumbNail} 
                                alt={course?.courseName}
                                />
                                <div>
                                    <p>{course?.courseName}</p>
                                    <p>{course?.category?.name}</p>
                                    <div>
                                        {/* need to change this rating value<------------------- */}
                                        <span className="text-yellow-5">4.5</span>

                                        <ReactStars
                                        count={5}
                                        value={course?.ratingAndReview?.length}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        />
                                        <span className="text-richblack-400">
                                            {course?.ratingAndReview?.length} Ratings
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                                >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                                </button>
                                <p className="mb-6 text-3xl font-medium text-yellow-100">
                                ₹ {course?.price}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}