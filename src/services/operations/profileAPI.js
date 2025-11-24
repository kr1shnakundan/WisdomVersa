import React from 'react'
import { apiConnector } from '../apiconnector'
import toast from 'react-hot-toast'
import { profileEndPoints } from '../apis'

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndPoints

export async function getUserEnrolledCourses (token){
    
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <div className='spinner'></div>
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
                Authorization: `Bearer${token}`, //<---- please note that in our bearer, their is no space
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
