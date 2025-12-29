import React, { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useParams, useNavigate } from "react-router-dom"
import {
  FaCheckCircle,
  FaPlayCircle,
  FaChevronUp,
  FaStar,
  FaChevronLeft,
  FaTimes,
} from "react-icons/fa"
import { MdOndemandVideo } from "react-icons/md"
import HighlightText from "../HomePage/HighlightText"
import {ACCOUNT_TYPE} from "../../../utils/constant"

const VideoDetailsSidebar = ({ setReviewModal, isOpen = true, setIsOpen }) => {
  const { 
    courseSectionData,
    completedLectures,
    courseEntireData,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse)


  const { subSectionId } = useParams()
  const navigate = useNavigate()
  const [openSections, setOpenSections] = useState({})

  const {user} = useSelector((state)=>state.profile)
  const isStudent = user.accountType === ACCOUNT_TYPE.STUDENT;

  // Helper function to check if section is completed
  const isSectionCompleted = (section) => {
    if (!section?.subSection || section.subSection.length === 0) return true
    
    return section.subSection.every((sub) => 
      completedLectures?.includes(sub._id)
    )
  }

  // Initialize first section as open
  React.useEffect(() => {
    if (courseSectionData && courseSectionData.length > 0 && Object.keys(openSections).length === 0) {
      setOpenSections({ [courseSectionData[0]._id]: true })
    }
  }, [courseSectionData])

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleBackClick = () => {
    navigate("/dashboard/enrolled-courses")
    // navigate(-1)
  }

  const closeSidebar = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static  left-0 h-screen z-40
          w-full sm:w-[380px] lg:w-[330px] xl:w-[360px]
          bg-richblack-800 border-r border-richblack-700 
          flex flex-col shadow-2xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="p-3 sm:p-4 border-b border-richblack-700">
          {/* Top Action Bar */}
          <div className="flex flex-col lg:flex-row w-full justify-between  mb-4 gap-2">
            {/* Back Button */}
            <div className="flex justify-between gap-8 px-2">
              <button 
                onClick={handleBackClick}
                className="text-richblack-200 bg-richblack-700 p-2 sm:px-3 sm:py-2 
                rounded-full hover:text-yellow-100 transition hover:scale-105 
                active:scale-95 flex items-center justify-center"
                aria-label="Go back"
              >
                <FaChevronLeft className="text-sm sm:text-base" />
              </button>

              {/* Mobile Close Button */}
              <button
                onClick={closeSidebar}
                className="lg:hidden text-richblack-200 bg-richblack-700 p-2 
                rounded-full hover:text-red-400 transition hover:scale-105 
                active:scale-95"
                aria-label="Close sidebar"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Review Button */}
           {
            isStudent && (
               <button
                // disabled={!isStudent}
                onClick={() => {
                  setReviewModal(true)
                  closeSidebar()
                }}
                className="px-3 sm:px-5 py-2 flex items-center justify-center gap-2 
                bg-yellow-50 text-black rounded-md font-semibold text-sm sm:text-base
                hover:bg-yellow-100 hover:scale-105 active:scale-95 transition
                whitespace-nowrap"
              >
                <FaStar className="text-xs sm:text-sm" />
                <span className="hidden sm:inline">Add Review</span>
                <span className="sm:hidden">Review</span>
              </button>
            )
           }
          </div>

          {/* Course Info */}
          <div>
            <h2 className="text-richblack-5 text-xl sm:text-2xl lg:text-2xl xl:text-3xl 
            font-semibold line-clamp-2 mb-2">
              {courseEntireData?.courseName}
            </h2>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="flex items-center gap-1">
                <HighlightText text={completedLectures?.length || "0"} />
                <span className="text-richblack-300">/</span>
                <HighlightText text={totalNoOfLectures || "0"} />
              </div>
              <span className="text-richblack-300 text-xs sm:text-sm">
                lectures completed
              </span>
            </div>
          </div>
        </div>

        {/* ================= SECTIONS ================= */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-richblack-700 
        scrollbar-track-richblack-800">
          {courseSectionData?.map((section) => {
            const isOpenSection = openSections[section._id] ?? false
            const sectionCompleted = isSectionCompleted(section)

            return (
              <div 
                key={section._id} 
                className="border-b border-richblack-700"
              >
                {/* SECTION HEADER */}
                <button
                  onClick={() => toggleSection(section._id)}
                  className={`w-full flex items-center justify-between px-3 sm:px-4 
                  py-3 sm:py-3.5 transition-all duration-200 group
                    ${
                      sectionCompleted
                        ? "bg-caribbeangreen-900/40 hover:bg-caribbeangreen-800/50" 
                        : "hover:bg-richblack-700"
                    }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <p className={`font-semibold text-xs sm:text-sm line-clamp-2 text-left
                      ${
                        sectionCompleted
                          ? "text-caribbeangreen-100" 
                          : "text-richblack-5"
                      }`}
                    >
                      {section.sectionName}
                    </p>
                    {sectionCompleted && (
                      <FaCheckCircle className="text-caribbeangreen-300 text-xs sm:text-sm 
                      flex-shrink-0" />
                    )}
                  </div>
                  
                  <span 
                    className="transition-transform duration-300 ease-in-out flex-shrink-0 ml-2" 
                    style={{ 
                      transform: isOpenSection ? 'rotate(0deg)' : 'rotate(-180deg)' 
                    }}
                  >
                    <FaChevronUp 
                      className={`text-xs sm:text-sm ${
                        sectionCompleted 
                          ? "text-caribbeangreen-200" 
                          : "text-richblack-300"
                      }`} 
                    />
                  </span>              
                </button>

                {/* SUBSECTIONS with smooth animation */}
                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpenSection 
                      ? `${section.subSection.length * 70}px` 
                      : '0px',
                    opacity: isOpenSection ? 1 : 0,
                  }}
                >
                  <div className="px-2 pb-2 space-y-1">
                    {section.subSection.map((sub) => {
                      const isActive = sub._id === subSectionId
                      const isCompleted = completedLectures?.includes(sub._id)

                      return (
                        <NavLink
                          key={sub._id}
                          to={`section/${section._id}/sub-section/${sub._id}`}
                          onClick={closeSidebar}
                          className={`flex items-center justify-between gap-2 px-2 sm:px-3 
                          py-2 sm:py-2.5 rounded-md text-xs sm:text-sm transition-all 
                          duration-200 group
                            ${
                              isActive
                                ? "bg-yellow-100 text-black font-semibold shadow-md"
                                : "hover:bg-richblack-700/70 text-richblack-200"
                            } ${isCompleted && !isActive && "opacity-70"}`}
                        >
                          {/* LEFT ICON */}
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {isActive ? (
                              <FaPlayCircle className="text-base sm:text-lg text-black 
                              flex-shrink-0" />
                            ) : (
                              <MdOndemandVideo className="text-base sm:text-lg 
                              text-richblack-300 group-hover:text-richblack-100 
                              transition flex-shrink-0" />
                            )}

                            <span className={`line-clamp-2 leading-tight
                              ${isCompleted && !isActive && "line-through"}`}
                            >
                              {sub.title}
                            </span>
                          </div>

                          {/* RIGHT ICON */}
                          {isCompleted && !isActive && (
                            <FaCheckCircle className="text-caribbeangreen-400 text-xs 
                            sm:text-sm flex-shrink-0" />
                          )}
                        </NavLink>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}

export default VideoDetailsSidebar