import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseHeroSection from "../components/core/Course/CourseHeroSection";
import WhatYouWillLearn from "../components/core/Course/WhatYouWillLearn";
import AuthorSection from "../components/core/Course/AuthorSection";
import GetAvgRating from "../utils/avgRating";

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Fetch course details
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const res = await fetchCourseDetails( courseId );
        console.log("Course details response:", res);
        setResponse(res);
        
        if (user && res?.data?.courseDetails?.studentEnrolled?.includes(user._id)) {
          setIsEnrolled(true);
        }
      } catch (error) {
        console.log("Could not fetch Course Details:", error);
      }
    };

    if (courseId) {
      getCourseDetails();
    }
  }, [courseId, user]);

  // Calculate average rating
  useEffect(() => {
    if (response?.data?.courseDetails?.ratingAndReviews) {
      const count = GetAvgRating(response.data.courseDetails.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [response]);

  // Calculate total lectures
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((section) => {
      lectures += section.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  // Toggle accordion sections
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  // Handle course purchase
  const handleBuyCourse = () => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    if (user?.accountType !== "Student") {
      setConfirmationModal({
        text1: "Only Students Can Purchase",
        text2: "Instructors cannot purchase courses.",
        btn1Text: "OK",
        btn2Text: null,
        btn1Handler: () => setConfirmationModal(null),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    buyCourse(token, [courseId], user, navigate, dispatch);
  };

  if (loading || !response) {
    return (
      <div className="grid min-h-screen place-items-center bg-richblack-900">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response.success) {
    return (
      <div className="grid min-h-screen place-items-center bg-richblack-900">
        <p className="text-richblack-5 text-xl">Error loading course details</p>
      </div>
    );
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-richblack-900">
        <div className="spinner"></div>
      </div>
    );
  }

  const courseDetails = response.data?.courseDetails;

  return (
    <>
      {/* Hero Section */}
      <CourseHeroSection
        course={courseDetails}
        avgReviewCount={avgReviewCount}
        isEnrolled={isEnrolled}
        handleBuyCourse={handleBuyCourse}
        navigate={navigate}
      />

      {/* Sticky Course Card (Desktop) */}
      <CourseDetailsCard
        course={courseDetails}
        isEnrolled={isEnrolled}
        handleBuyCourse={handleBuyCourse}
        navigate={navigate}
      />

      {/* Main Content */}
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px] bg-richblack-900 py-12">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          
          {/* What You'll Learn */}
          <WhatYouWillLearn content={courseDetails?.whatYouWillLearn} />

          {/* Course Content */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2 text-richblack-300">
                <div className="flex gap-2">
                  <span>{courseDetails?.courseContent?.length || 0} section(s)</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{response.data?.totalDuration || "0s"} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25 hover:text-yellow-50 transition-all"
                    onClick={() => {
                    if (isActive.length > 0) {
                      // Collapse all
                      setIsActive([]);
                    } else {
                      // Expand all - add all section IDs to isActive
                      const allSectionIds = courseDetails?.courseContent?.map(section => section._id) || [];
                      setIsActive(allSectionIds);
                    }
                  }}
                  >
                    {isActive.length > 0 ? "Collapse all sections" : "Expand all sections"}
                  </button>
                </div>
              </div>
            </div>

            {/* Accordion */}
            <div className="py-4">
              {courseDetails?.courseContent?.map((section, index) => (
                <CourseAccordionBar
                  key={section._id || index}
                  course={section}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author */}
            <AuthorSection instructor={courseDetails?.instructor} />
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
