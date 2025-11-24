import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProgressBar from "@ramonak/react-progress-bar"
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'

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
       <div className='text-richblack-5'>
          <h2 className='text-3xl font-semibold mt-4'>Enrolled Courses</h2>
          <div className=''>
            {
              !enrolledCourses ? (
                <div className='flex items-center justify-center'>
                  <div className='spinner'></div>
                </div>
              ) : !enrolledCourses.length ? (
                <div className='flex items-center justify-center md: h-[300px]'>
                  <p className='text-2xl '>No Enrolled Courses found</p>
                  {/* TODO: add button for which onclick , it takes to place where all the all 
                  courses are available */}
                </div>
              ) : (
                <div>
                  <section className='flex items-center justify-between'>
                    <h3>Course Name</h3>
                    <h3>Durations</h3>
                    <h3>Progress</h3>
                  </section>

                  {enrolledCourses?.map((course ,i,arr) =>(
                    <div key={i}
                      className={`flex items-center justify-between`}
                    >
                      <div className={`flex gap-2`}>
                        <img src={course.thumbNail} alt="your Course" />
                        <div className=''>
                          
                          <p className=''>{course.courseName}</p>
                          <p>{course.courseDescription.length > 50 ? 
                          `${course.courseDescription.slice(0,50)}...` 
                            : course.courseDescription}</p>

                        </div>
                      </div>

                      <div>{course?.totalDuration}</div>
                      <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                        <p>Progress: {course.progressPercentage || 0}%</p>
                        <ProgressBar
                          completed={course.progressPercentage || 0}
                          height="8px"
                          isLabelVisible={false}
                        />
                      </div>
                      
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
