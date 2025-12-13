import React, { useRef,useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProgressBar from "@ramonak/react-progress-bar"
import { getUserEnrolledCourses, unenrollFromCourse } from '../../../services/operations/profileAPI'
import { CiMenuKebab } from 'react-icons/ci'
import toast from 'react-hot-toast'
import { markCourseAsComplete } from '../../../services/operations/profileAPI'


//------------------------------------------------USING useRef------------------
// const CourseMenu = ({ course, isMobile = false }) => {
//   const [showMenu, setShowMenu] = useState(false)
//   const menuRef = useRef(null)

//   useEffect(() => {
//     if (!showMenu) return

//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [showMenu])

//   return (
//     <div className='relative' ref={menuRef}>
//       <CiMenuKebab onClick={(e) => {
//         e.stopPropagation()
//         setShowMenu(!showMenu)
//       }} />
      
//       {showMenu && (
//         <div className='absolute z-20 bg-richblack-700...'>
          
//         </div>
//       )}
//     </div>
//   )
// }


// Menu Component for Course Actions

//---------------------------------------------------USING DIV--------------------
const CourseMenu = ({course , isMobile=false , onMarkComplete ,onUnenroll}) =>{
  const [showMenu , setShowMenu] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkComplete = async () => {
    setIsMarking(true)
    try {
      await onMarkComplete(course._id)
      setShowMenu(false)
    } catch (error) {
      console.error("Error marking complete:", error)
    } finally {
      setIsMarking(false)
    }
  }

  const handleUnenroll = async () => {
    try {
      await onUnenroll(course._id)
      setShowMenu(false)
    } catch (error) {
      console.error("Error unenrolling:", error)
    }
  }

  // Check if course is already completed
  const isCompleted = course.progressPercentage === 100 || course.isCompleted

  return (
    <div className='relative'>
      <CiMenuKebab
      className={`${isMobile ? "md:hidden text-lg" : "hidden md:block mx-10"}
                  cursor-pointer flex-shrink-0 text-richblack-300 hover:text-blue-300 transition-colors`}
      onClick={(e)=>{
        e.stopPropagation();
        setShowMenu(!showMenu)
      }}
      />

      {showMenu && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div 
            className='fixed inset-0 z-10'
            onClick={() => setShowMenu(false)}
          />

          <div className={`
            absolute z-20 bg-richblack-700 rounded-lg shadow-lg border border-richblack-600
            right-0 top-8
            min-w-[180px] py-2
          `}>
            {!isCompleted && (
              <button
                onClick={handleMarkComplete}
                disabled={isMarking}
                className='w-full px-4 py-2 text-left text-sm text-richblack-5 hover:bg-richblack-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isMarking ? 'Marking...' : 'Mark as Complete'}
              </button>
            )}
            <button
              onClick={handleUnenroll}
              className='w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-richblack-600 transition-colors'
            >
              Unenroll Course
            </button>
          </div>
        </>
      )}
    </div>
  )

}

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


  // Handler for marking course as complete
  const handleMarkComplete = async (courseId) => {
    const toastId = toast.loading("Marking course as complete...")
    
    try {
      
      const response = await markCourseAsComplete(courseId, token)
      
      if (response.success) {
        // Update local state after successful backend verification
        setEnrolledCourses(prevCourses => 
          prevCourses.map(course => 
            course._id === courseId 
              ? { 
                  ...course, 
                  progressPercentage: 100,
                  isCompleted: true
                }
              : course
          )
        )
        
        toast.success("Course marked as complete!")
      }
    } catch (error) {
      console.error("Failed to mark course as complete:", error)
      toast.error(error.message || "Failed to mark course as complete")
    } finally {
      toast.dismiss(toastId)
    }
  }

  // Handler for unenrolling from course
  const handleUnenroll = async (courseId) => {
    const toastId = toast.loading("Unenrolling from course...")
    
    try {
      
      const response = await unenrollFromCourse(courseId , token)
      
      console.log("Unenrolling from course:", courseId)
      
      // After successful backend call, remove course from local state
      setEnrolledCourses(prevCourses => 
        prevCourses.filter(course => course._id !== courseId)
      )
      
      toast.success("Successfully unenrolled from course!")
    } catch (error) {
      console.error("Failed to unenroll:", error)
      toast.error(error.message || "Failed to unenroll from course")
    } finally {
      toast.dismiss(toastId)
    }
  }
  
  return (
    <>
       <div className='text-richblack-5 px-4 md:px-0'>
          <h2 className='text-2xl md:text-3xl font-semibold mt-4 text-richblack-50'>Enrolled Courses</h2>
          <div className='mt-8 md:mt-16'>
            {
              !enrolledCourses ? (
                <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                  <div className='spinner'></div>
                </div>
              ) : !enrolledCourses.length ? (
                <div className='flex items-center justify-center h-[300px]'>
                  <p className='text-xl md:text-2xl text-center px-4'>No Enrolled Courses found</p>
                  {/* TODO: add button for which onclick , it takes to place where all the all 
                  courses are available */}
                </div>
              ) : (
                <div className='my-8' >
                  {/* Desktop/Tablet Table Header - Hidden on Mobile */}
                  <section className='hidden md:flex bg-richblack-700 text-richblack-50 text-[14px] leading-[22px] rounded-t-lg'>
                    <h3 className='w-[45%] px-5 py-3'>Course Name</h3>
                    <h3 className="w-1/4 px-2 py-3">Durations</h3>
                    <h3 className="flex-1 px-2 py-3">Progress</h3>
                  </section>

                  {/* Course List */}
                  {enrolledCourses?.map((course, i, arr) => (
                    <div key={i}
                      className={`
                        flex flex-col md:flex-row md:items-center 
                        border border-richblack-700 bg-richblack-800 md:bg-transparent
                        mb-4 md:mb-0 rounded-lg md:rounded-none
                        ${i === arr.length - 1 ? "md:rounded-b-lg" : ""}
                      `}
                    >
                      {/* Course Info Section */}
                      <div className='flex gap-3 md:gap-4 w-full md:w-[45%] p-4 md:px-5 md:py-3 items-start md:items-center'>
                        <img 
                          src={course.thumbnail} 
                          alt="CourseImg" 
                          className='w-16 h-16 md:w-14 md:h-14 rounded-lg object-cover flex-shrink-0 cursor-pointer'
                          onClick={() => {
                            navigate(
                              `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                            )
                          }}
                        />
                        <div 
                          className='flex flex-col justify-center flex-1 min-w-0 cursor-pointer'
                          onClick={() => {
                            navigate(
                              `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                            )
                          }}
                        >
                          <p className='font-semibold text-sm md:text-base truncate'>{course.courseName}</p>
                          <p className='text-xs text-richblack-300 line-clamp-2 md:line-clamp-1'>
                            {course.courseDescription.length > 50 ? 
                              `${course.courseDescription.slice(0, 50)}...` 
                              : course.courseDescription}
                          </p>
                        </div>
                        {/* Menu Icon - Mobile */}
                        <CourseMenu 
                        course={course} 
                        isMobile={true} 
                        onMarkComplete={handleMarkComplete}
                        onUnenroll={handleUnenroll}
                        />
                      </div>

                      {/* Duration and Progress Section - Mobile Layout */}
                      <div className='flex flex-col md:hidden px-4 pb-4 gap-3'>
                        <div className='flex justify-between items-center'>
                          <span className='text-xs text-richblack-300'>Duration:</span>
                          <span className='text-sm'>{course?.totalDuration ? course.duration : "0hr 0mins"}</span>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                          <div className='flex justify-between items-center'>
                            <span className='text-xs text-richblack-300'>Progress:</span>
                            <span className='text-sm'>{course.progressPercentage || 0}%</span>
                          </div>
                          <ProgressBar
                            completed={course.progressPercentage || 0}
                            height="8px"
                            isLabelVisible={false}
                          />
                        </div>
                      </div>

                      {/* Duration and Progress Section - Desktop/Tablet Layout */}
                      <div className="hidden md:block w-1/4 px-2 py-3">
                        {course?.totalDuration ? course.duration : "0hr 0mins"}
                      </div>
                      
                      <div className="hidden md:flex w-1/5 flex-col gap-2 px-2 py-3">
                        <p>Progress: {course.progressPercentage || 0}%</p>
                        <ProgressBar
                          completed={course.progressPercentage || 0}
                          height="8px"
                          isLabelVisible={false}
                        />
                      </div>

                      {/* Menu Icon - Desktop/Tablet */}
                      <CourseMenu 
                      course={course} 
                      isMobile={false} 
                      onMarkComplete={handleMarkComplete}
                      onUnenroll={handleUnenroll}
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




