import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Course_Card from "./Course_Card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CourseSlider({ Courses = [] }) {
  if (!Courses.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-richblack-300 text-lg">No courses available.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-visible group">
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        loop={Courses.length > 3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        modules={[Autoplay, FreeMode, Navigation, Pagination]}
        className="custom-swiper pb-20 !overflow-visible"
      >
        {Courses.map((course) => (
          <SwiperSlide key={course._id} className="!h-auto">
            <Course_Card course={course} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {Courses.length > 3 && (
        <>
          <button
            className="swiper-button-prev-custom lg:opacity-0 lg:group-hover:opacity-100 absolute 
            left-0 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center 
            rounded-full bg-richblack-700 text-richblack-5 shadow-lg transition-all 
            duration-300 hover:bg-yellow-25 hover:text-richblack-900 disabled:opacity-50"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom lg:opacity-0 lg:group-hover:opacity-100 absolute 
            right-0 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center 
            rounded-full bg-richblack-700 text-richblack-5 shadow-lg transition-all 
            duration-300 hover:bg-yellow-25 hover:text-richblack-900 disabled:opacity-50"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}