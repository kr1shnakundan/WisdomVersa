import React, { useEffect, useState } from 'react'
import Iconbtn from '../../../../common/Iconbtn';
import { MdOutlineBackspace, MdOutlinePublish } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../../../utils/constant';
import { useForm } from 'react-hook-form';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import HighlightText from '../../../HomePage/HighlightText';
import toast from 'react-hot-toast';


const PublishCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const[loading , setLoading] = useState(false)
  const hasEnrolledStudents = course?.studentEnrolled?.length > 0;
  const isPublished = course?.status === COURSE_STATUS.PUBLISHED;

  const {
    handleSubmit,
    register,
    setValue,
    getValues
  } = useForm()

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
      setIsChecked(true)
    }
  }, [course?.status,setValue])

  const goBack=()=>{
    dispatch(setStep(2))

  }

  const goToCourse = () =>{
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async() =>{

    if(isPublished && 
      getValues("public") === false && 
      hasEnrolledStudents) {
      // Show error message
      alert("Cannot save as draft. Students are already enrolled in this course.")
      // Reset checkbox to published state
      setIsChecked(true)
      setValue("public", true)
      return
    }

    if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
    course?.status === COURSE_STATUS.DRAFT && getValues("public") === false ){
      //course is already publish or draft
      toast.success("Course Edited Successfully")
      goToCourse()
      return
    }
    const formData = new FormData()
    formData.append("courseId",course._id)
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append("status",courseStatus)
    

    setLoading(true)
    const result = await editCourseDetails(formData,token)
    if(result){
      goToCourse()
    } else {
      // Backend rejected the change, reset the checkbox
      setIsChecked(course?.status === COURSE_STATUS.PUBLISHED)
      setValue("public", course?.status === COURSE_STATUS.PUBLISHED)
    }
    setLoading(false)
  }

  const onSubmit = () =>{
    handleCoursePublish()
  }



  const [isChecked,setIsChecked] = useState(false);
  return (

    <div className='bg-richblack-800 border border-richblack-700 px-5 py-7 rounded-md'>
      <h2 className='text-2xl font-semibold text-richblack-5'>Publish Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='my-6  flex items-center gap-2 '>
          <label htmlFor="public" className='inline-flex items-center gap-2 text-lg'>
            <input type="checkbox"
            id='public'
            checked={isChecked}
            disabled={isPublished && hasEnrolledStudents} 
            onClick={()=>{setIsChecked(!isChecked)}}
            {...register("public")}
            className='aspect-square accent-yellow-400 cursor-pointer h-6 w-6 rounded-md'
            />
          </label>
           
          <span className='ml-2 text-richblack-100'>Make this course
            <HighlightText text={"Public"} />
          </span>         
        </div>
        {/* Show warning message */}
          {isPublished && hasEnrolledStudents && (
            <p className='text-sm text-yellow-200 ml-8 mb-8'>
              ⓘ This course cannot be unpublished because {course.studentEnrolled.length} 
              {course.studentEnrolled.length === 1 ? ' student is' : ' students are'} enrolled.
            </p>
          )}
        <div className='flex justify-end gap-x-4'>
          <button className='flex cursor-pointer items-center gap-x-2 rounded-md
          bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
          type='button'
          disabled={loading}
          onClick={goBack}
          >
            <MdOutlineBackspace size={20} />
              Back
          </button>
          <Iconbtn customClasses="min-w-[220px]  justify-center" disabled={loading}> 
            {isChecked ? "Finalize & Publish" : "Save as Draft"}
            <MdOutlinePublish size={22}/>
          </Iconbtn>
      </div>
     </form>
    </div>

  )
}

export default PublishCourse