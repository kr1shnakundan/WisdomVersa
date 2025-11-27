import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProgressBar from "@ramonak/react-progress-bar"
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import { CiMenuKebab } from 'react-icons/ci'

export default function EnrolledCourses () {
  const {token} = useSelector((state) =>state.auth)
  const navigate = useNavigate()
  
  const [enrolledCourses,setEnrolledCourses] = useState(null)


  const getEnrolledCourses = async() =>{
    try{
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res)
    } catch(error){
      console.log("Unable to fetch getEnrolledCourses : " ,error);
    }
  };

  useEffect (()=>{
    getEnrolledCourses();
  },[])
  //------------------------------------------ADD CSS HERE ----------------------------------------------
  return (
    <>
       <div className='text-richblack-5 '>
          <h2 className='text-3xl font-semibold mt-4 text-richblack-50'>Enrolled Courses</h2>
          <div className='mt-16 p-4'>
            {
              !enrolledCourses ? (
                <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                  <div className='spinner'></div>
                </div>
              ) : !enrolledCourses.length ? (
                <div className='flex items-center justify-center md: h-[300px]'>
                  <p className='text-2xl '>No Enrolled Courses found</p>
                  {/* TODO: add button for which onclick , it takes to place where all the all 
                  courses are available */}
                </div>
              ) : (
                // <div className='border border-richblack-600 rounded-md flex flex-col gap-4 '>
                <div className='my-8' >
                  <section className='flex bg-richblack-700 text-richblack-50 text-[14px] leading-[22px] rounded-t-lg'>
                    <h3 className='w-[45%] px-5 py-3'>Course Name</h3>
                    <h3 className="w-1/4 px-2 py-3">Durations</h3>
                    <h3 className="flex-1 px-2 py-3">Progress</h3>
                    
                  </section>

                  {enrolledCourses?.map((course ,i,arr) =>(
                    <div key={i}
                      className={`flex items-center border border-richblack-700 
                        ${i === arr.length -1 ? "rounded-b-lg" : "rounded-none"}
                      `}
                    >
                      <div className={`flex gap-4 cursor-pointer w-[45%] px-5 py-3`}
                      onClick={()=>{
                        navigate(
                          `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                      }}
                      >
                        <img 
                        src={course.thumbNail} 
                        alt="CourseImg" 
                        className='w-14 h-14 rounded-lg object-cover'
                        />
                        <div className='flex flex-col max-w-xs'>
                          
                          <p className='font-semibold'>{course.courseName}</p>
                          <p className='text-xs text-richblack-300'>{course.courseDescription.length > 25 ? 
                          `${course.courseDescription.slice(0,25)}...` 
                            : course.courseDescription}</p>

                        </div>
                      </div>

                      <div className="w-1/4 px-2 py-3">{
                      course?.totalDuration ? course.duration : "0hr 0mins"
                      }</div>
                      <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                        <p>Progress: {course.progressPercentage || 0}%</p>
                        <ProgressBar
                          completed={course.progressPercentage || 0}
                          height="8px"
                          isLabelVisible={false}
                        />
                      </div>
                      <CiMenuKebab
                        className='mx-10'
                      />
                      
                    </div>
                  ))}
                </div>
              )
            }
          </div>
       </div> 
    </>
  )
}
