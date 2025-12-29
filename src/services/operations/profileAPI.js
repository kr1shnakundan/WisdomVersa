import React from 'react'
import { apiConnector } from '../apiconnector'
import toast from 'react-hot-toast'
import { profileEndPoints } from '../apis'

const { GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API
    ,MARK_COURSE_COMPLETE_API , UNENROLL_COURSE_API } = profileEndPoints

export async function getUserEnrolledCourses (token){
    
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <p>Loading...</p>
        </div>
    )
    let result = []
    
    try{
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer${token}`,
            }
        )

        console.log("response in getUserEnrolledCourses is : ",response)
        
        if(!response.data.success){
            throw new Error(response.data.message)
            
        }
        result = response.data.data


    } catch(error){
        console.log('Error Response:', error.response?.data);
        console.log('Request Config:', error.config);
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
    
}

export async function markCourseAsComplete (courseId , token){
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <p>Loading...</p>
        </div>
    )
    try{
        const response = await apiConnector("POST",MARK_COURSE_COMPLETE_API , {courseId} , {
            Authorization:`Bearer${token}`
        } )

        if(!response.data.success){
            throw new Error (response.data.message)
        }

        toast.success("Course marked as Completed Successfully")
        toast.dismiss(toastId)
        return response.data
    } catch(error){
        console.error("MARK_COURSE_COMPLETE_API ERROR:", error)
        toast.error(error.response?.data?.message || "Failed to mark complete")
        toast.dismiss(toastId)
        throw error
    }
}

export async function unenrollFromCourse (courseId , token) {
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <p>Loading...</p>
        </div>
    )
    try{
        let response = await apiConnector("POST",UNENROLL_COURSE_API ,{ courseId } , {
            Authorization : `Bearer${token}`
        } )

        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.success("Course Removed Successfully")
        toast.dismiss(toastId)
        return response.data
    } catch(error){
        console.error("UNENROLL_COURSE_API ERROR:", error)
        toast.error("Unable to remove Course")
        toast.dismiss(toastId)
        throw error
    }
    
}


export async function getInstructorData (token){
    let result = []
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <p>Loading...</p>
        </div>
    )
    try{
        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null , {
            Authorization : `Bearer${token}`
        })

        if(!response?.data?.success){
            throw new Error (response?.data?.message)
        }

        console.log("REsponse in getInstructorDAta : ....",response)
        result = response?.data?.data

    } catch(error){
        console.log("ERROR IN GETINSTRUCTORDATA API : ...",error)
        toast.error("Unable to fetch instructor data")
    }
    toast.dismiss(toastId)
    return result
}