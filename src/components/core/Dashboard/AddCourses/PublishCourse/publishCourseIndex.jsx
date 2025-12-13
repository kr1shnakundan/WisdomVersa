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


const PublishCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const[loading , setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    setValue,
    getValues
  } = useForm()

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack=()=>{
    dispatch(setStep(2))

  }

  const goToCourse = () =>{
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async() =>{

    if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
    course?.status === COURSE_STATUS.DRAFT && getValues("Public") === false ){
      //course is already publish or draft
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
         <div className='my-6 mb-8 flex items-center gap-2 '>
          <label htmlFor="public" className='inline-flex items-center gap-2 text-lg'>
            <input type="checkbox"
            id='public'
            checked={isChecked}
            onClick={()=>{setIsChecked(!isChecked)}}
            {...register("public")}
            className='aspect-square accent-yellow-400 cursor-pointer h-6 w-6 rounded-md'
            />
          </label>
          <span className='ml-2 text-richblack-100'>Make this course
            <HighlightText text={"Public"} />
          </span>
        </div>
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