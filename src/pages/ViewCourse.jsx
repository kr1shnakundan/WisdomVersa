import React, { useEffect, useState } from 'react'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { 
  setCompletedLectures, 
  setCourseSectionData, 
  setEntireCourseData, 
  setTotalNoOfLectures 
} from '../slices/viewCourseSlice'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import Footer from '../components/common/Footer'
import ScrollToTop from '../components/common/ScrollToTop'

const ViewCourse = () => {
  const dispatch = useDispatch()
  const courseInfo = useParams()
  console.log("courseInfo in videoDetails from useParams....:", courseInfo)
  
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { token } = useSelector((state) => state.auth)
  
  const [reviewModal, setReviewModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Auto-adjust sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop - show sidebar by default
        setSidebarOpen(true)
      } else {
        // Mobile/Tablet - hide sidebar by default
        setSidebarOpen(false)
      }
    }

    // Set initial state
    handleResize()

    // Listen for window resize
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const getFullCourseDetails = async () => {
      const result = await getFullDetailsOfCourse(courseInfo?.courseId, token)
      
      if (result) {
        dispatch(setEntireCourseData(result?.courseDetails))
        dispatch(setCourseSectionData(result?.courseDetails?.courseContent))
        dispatch(setCompletedLectures(result?.completedVideos))
        
        const totalNumberOfLecture = result?.courseDetails?.courseContent?.reduce(
          (total, section) => total + (section?.subSection?.length || 0),
          0
        )
        
        console.log("TotalNumber of lectures in course in viewCourse:...", totalNumberOfLecture)
        dispatch(setTotalNoOfLectures(totalNumberOfLecture))
      }
    }
    
    getFullCourseDetails()
  }, [courseInfo?.courseId, token, dispatch])

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
        <ScrollToTop/>
      <div className="flex relative min-h-[calc(100vh-3.5rem)]">     
        <VideoDetailsSidebar
        setReviewModal={setReviewModal}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        />
        {/* Main Content Area */}
        <div className="w-full h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="w-11/12 mx-auto max-w-[1000px] py-10">
            {/* Pass props to child routes via context */}
            <Outlet context={{ isOpen: sidebarOpen, setIsOpen: setSidebarOpen }} />
          </div>
        </div>
      </div>
      <Footer/>

      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}

export default ViewCourse