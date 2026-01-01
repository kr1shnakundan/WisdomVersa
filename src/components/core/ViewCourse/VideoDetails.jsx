import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { setCompletedLectures } from "../../../slices/viewCourseSlice"
import toast from "react-hot-toast"
import { MdOutlinePlaylistPlay, MdReplay } from "react-icons/md"
const VideoDetails = () => {
  const { isOpen, setIsOpen } = useOutletContext()
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  )

  console.log("courseSEctionData in videoDetails is .....",courseSectionData)
  const { token } = useSelector((state) => state.auth)

  const { courseId, subSectionId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const videoRef = useRef(null)

  const [videoData, setVideoData] = useState(null)
  const [nextLecture, setNextLecture] = useState(null)
  const [prevLecture, setPrevLecture] = useState(null)
  const [showReplay, setShowReplay] = useState(false)
  const [showBigPlay, setShowBigPlay] = useState(true)

  /* ================= FIND CURRENT / NEXT / PREV ================= */
  useEffect(() => {
    
    if (!courseSectionData?.length) return
    setShowBigPlay(true)
    setShowReplay(false)

    let currentSectionIndex = -1
    let currentSubIndex = -1

    courseSectionData.forEach((section, sIndex) => {
      section.subSection.forEach((sub, ssIndex) => {
        if (sub._id === subSectionId) {
          currentSectionIndex = sIndex
          currentSubIndex = ssIndex
          setVideoData(sub)
        }
      })
    })

    if (currentSectionIndex === -1) return

    // Previous lecture
    if (currentSubIndex > 0) {
      setPrevLecture(
        courseSectionData[currentSectionIndex].subSection[currentSubIndex - 1]
      )
    } else if (currentSectionIndex > 0) {
      const prevSection =
        courseSectionData[currentSectionIndex - 1].subSection
      setPrevLecture(prevSection[prevSection.length - 1])
    } else {
      setPrevLecture(null)
    }

    // Next lecture
    const currentSection = courseSectionData[currentSectionIndex]
    if (currentSubIndex < currentSection.subSection.length - 1) {
      setNextLecture(currentSection.subSection[currentSubIndex + 1])
    } else if (currentSectionIndex < courseSectionData.length - 1) {
      setNextLecture(courseSectionData[currentSectionIndex + 1].subSection[0])
    } else {
      setNextLecture(null)
    }
  }, [courseSectionData, subSectionId])



  /* ================= MARK COMPLETE ================= */

  const isCompleted = completedLectures.includes(subSectionId)

  const handleMarkComplete = async () => {
    if (completedLectures.includes(subSectionId)) {
      toast("Lecture already completed")
      return
    }

    const result = await markLectureAsComplete({courseId , subSectionId }, token)
    if(result){
      dispatch(setCompletedLectures([...completedLectures, subSectionId]))
    }
  }

  /* ================= NAVIGATION ================= */
  const goToLecture = (lecture) => {
    if (!lecture) return

    const parentSection = courseSectionData.find((section) =>
      section.subSection.some((sub) => sub._id === lecture._id)
    )

    navigate(
      `/view-course/${courseId}/section/${parentSection._id}/sub-section/${lecture._id}`
    )
  }


  if (!videoData) return null

  return (
    <div>
      {
        !isOpen && (
          <div className="bg-yellow-50 text-black lg:hidden p-3 rounded-lg z-30
          hover:bg-yellow-100 transition shadow-lg hover:scale-105 active:scale-95
          fixed top-20 left-4 "
          onClick={()=>setIsOpen(true)}
          aria-label="Open course content"
          >
            <MdOutlinePlaylistPlay/>
          </div>
        )
      }
      {/* VIDEO */}
      <div className="relative w-full ">
        <video
          ref={videoRef}
          key={videoData.videoUrl}
          controls
          onEnded={() => {
            setShowBigPlay(false)
            setShowReplay(true)    
          }}
          onPlay={() => {
            setShowBigPlay(false)
            setShowReplay(false)
          }}
          onPause={() => {
            // IMPORTANT: pause also fires on end, so guard it
            if (!videoRef.current?.ended) {
              setShowBigPlay(true)
            }
          }}
          className="w-full rounded-lg"
        >
          <source src={videoData.videoUrl} type="video/mp4" />
        </video>
        {showBigPlay && !showReplay && (
          <div
            onClick={() => {
              videoRef.current.play()
              setShowBigPlay(false)
            }}
            className="absolute inset-0 flex items-center justify-center
                      bg-black/40 backdrop-blur-sm cursor-pointer
                      transition-all duration-300"
          >
            <div className="text-white text-6xl md:text-7xl lg:text-8xl
                            hover:scale-110 transition-transform">
              ▶
            </div>
          </div>
        )}

        {showReplay && (
          <div
            onClick={()=>setShowReplay(false)}
            className={`absolute inset-0 flex 
            bg-black/50 justify-evenly transition-all duration-300
            ${
              showReplay
                ? "bg-gradient-to-b from-white/10 to-black/80 backdrop-blur-sm"
                : "bg-transparent pointer-events-none"
            }
            `}
          >
            {prevLecture && (
              <button
              onClick={(e)=>{
                e.stopPropagation()
                goToLecture(prevLecture)
                setShowReplay(false)
              }}
              className="text-richblack-5 text-3xl md:text-4xl lg:text-6xl hover:scale-110 transition-transform"
              >
              ⏮
              </button>
            )}
            <button 
            onClick={(e) => {
              e.stopPropagation()
              videoRef.current.currentTime = 0
              videoRef.current.play()
              setShowReplay(false)
            }}
            className="text-3xl md:text-4xl lg:text-6xl text-richblack-5 hover:scale-110 transition-transform">
              {/* 🔁 */}
              <MdReplay/>
            </button>
            {nextLecture && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToLecture(nextLecture)
                  setShowReplay(false)
                }}
                className="text-richblack-5 text-3xl md:text-4xl lg:text-6xl hover:scale-110 transition-transform"
              >
                ⏭
              </button>
            )}
          </div>
        )}
        </div>

      {/* TITLE + DESC */}
      <div className="mt-4">
        <h1 className="text-2xl font-semibold">{videoData.title}</h1>
        <p className="text-richblack-300 mt-2">{videoData.description}</p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={handleMarkComplete}
          disabled={isCompleted}
          className={`px-4 py-2 rounded font-medium transition-all duration-200
            ${
              isCompleted
                ? "bg-caribbeangreen-200 text-richblack-900 cursor-not-allowed"
                : "bg-caribbeangreen-500 text-black hover:bg-caribbeangreen-400"
            }
          `}
        >
          {isCompleted ? "✔ Completed" : "Mark as Complete"}
        </button>

        {!showReplay && (
          <button
            onClick={() => {
              videoRef.current.currentTime = 0
              videoRef.current.play()
            }}
            className="px-4 py-2 bg-richblack-700 text-richblack-100 rounded"
          >
            Replay
          </button>
        )}

        {prevLecture && !showReplay && (
          <button
            onClick={() => goToLecture(prevLecture)}
            className="px-4 py-2 bg-richblack-600 text-richblack-100 rounded"
          >
            ⬅ Previous
          </button>
        )}

        {nextLecture &&!showReplay && (
          <button
            onClick={() => goToLecture(nextLecture)}
            className="px-4 py-2 bg-yellow-50 text-black rounded"
          >
            Next ➡
          </button>
        )}
      </div>
    </div>
  )
}

export default VideoDetails
