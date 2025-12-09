import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import toast from "react-hot-toast";

const {DELETE_COURSE_API , EDIT_COURSE_API , GET_ALL_INSTRUCTOR_COURSES_API} = courseEndpoints

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async(token) =>{
    let result = []
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <div className='spinner'></div>
            <p>Loading...</p>
        </div>
    )
    try{
        const response = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null , {
            Authorization : `Bearer${token}`
        })

        console.log("Response of fetchInstructorCourses ... :",response)

        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response?.data?.data
    } catch(error){
        console.log("INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse = async(courseId , token) =>{
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <div className='spinner'></div>
            <p>Loading...</p>
        </div>
    )
    try{
        const response = await apiConnector("DELETE",DELETE_COURSE_API , courseId,{
            Authorization:`Bearer${token}`
        })
        
        if(!response?.data?.success){
            throw new Error (response?.data?.message)
        }

        toast.success("Course Deleted Successfully")
    } catch(error){
        console.log("ERROR IN DELETE COURSE IN COURSEDETAILSAPI :",error)
        toast.error(error?.response?.data?.message || "Unable to delete Course")
    }
    toast.dismiss(toastId)
}