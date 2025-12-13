import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import Iconbtn from "../../../../common/Iconbtn"
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementsField from './RequirementsFileld';
import {MdNavigateNext} from "react-icons/md"
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constant';
import toast from 'react-hot-toast';

export default function CourseInformationForm (){
  const {token} = useSelector((state)=>state.auth)
  const {course , editCourse} = useSelector((state)=>state.course)
  const [loading , setLoading] = useState(false)
  const [courseCategories , setCourseCategories] = useState([])

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState:{errors},
    
  } = useForm({
     mode: 'onSubmit',  // Only validate on submit
    reValidateMode: 'onChange',  // Then revalidate on change after first submit
  });

  useEffect(()=>{
    const getCategories = async() =>{
      setLoading(true)
      const categories = await fetchCourseCategories();
      if(categories.length > 0 ){
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    if(editCourse){
      
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
      setValue("courseId", course._id)
    }

    getCategories();
  },[])

  // console.log("course//................",course)


  const isFormUpdated = () =>{
    const currentValues = getValues()
    // console.log("currentValues:...........",currentValues)
    // console.log("currentValues.courseCategory._id:.............",currentValues.courseCategory._id)
    // console.log("course.category._id:...........",course.category._id)

    if(currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail

      
    ){
      return true
    }
    return false
  }

  const onSubmit = async(data) =>{
    if(editCourse){
      if(isFormUpdated()){
        const currentValues = getValues()
        const formData = new FormData()

        if(currentValues.courseTitle !== course.courseName){
          formData.append("courseName",data.courseTitle)
        }
        if(currentValues.courseShortDesc !== course.courseDescription){
          formData.append("courseDescription",data.courseShortDesc)
        }
        if(currentValues.coursePrice !== course.price){
          formData.append("price",data.coursePrice)
        }
        if(currentValues.courseTags.toString() !== course.tag.toString()){
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if(currentValues.courseBenefits !== course.whatYouWillLearn){
          formData.append("whatYouWillLearn",data.courseBenefits)
        }
        if(currentValues.courseCategory._id !== course.category._id){
          formData.append("category",data.courseCategory)
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        formData.append("courseId", course._id)

        setLoading(true)
        const result = await editCourseDetails(formData,token)
        setLoading(false)
        if(result){
          dispatch(setStep(2))
          dispatch(setCourse(result))
        } 
        console.log("Result in courseInformationForm... : ",result)
      } else{
        toast.error("No changes made to the form")
      }
      return
    }
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true)
    const result = await addCourseDetails(formData,token)
    setLoading(false)
    if(result){
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
  }

  return(
    <div className='text-richblack-5'>
      <form onSubmit={handleSubmit(onSubmit)}
      className='border border-richblack-700 space-y-8 rounded-lg bg-richblack-800 p-6'
      >
        {/* Course Title */}
        <div className='flex flex-col gap-2'>
          <label 
          htmlFor="courseTitle"
          className=' text-sm '
          >
            Course Title <sup className='text-pink-200 '>*</sup>
          </label>
          <input 
          required
          type="text" 
          id='courseTitle'
          placeholder='Enter Course Name'
          {...register ("courseTitle",{ required:true})}
          className='form-style !bg-richblack-700 w-full'
          />
          {errors.courseTitle && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Course Title is required error.courseTitle
            </span>
          )}
        </div>

        {/* Course Short Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="courseShortDesc">
            Course Short Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
            className="form-style !bg-richblack-700 resize-none min-h-[130px] w-full"
          />
          {errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required
            </span>
          )}
        </div>

        {/* Course Price */}
        <div className='flex flex-col gap-2'>
          <label 
          htmlFor="coursePrice"
          className='text-sm '
          >
            Price <sup className='text-pink-200 '>*</sup>
          </label>
          <div className="relative">
            <input
            id="coursePrice"
            type="text"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style !bg-richblack-700 w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
          {errors.coursePrice && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              {errors.coursePrice.message}
            </span>
          )}
        </div>
        
        {/* Course Category */}
        <div>
          <label 
          htmlFor="courseCategory"
          className='text-sm'
          >
            Category <sup className=' text-pink-200'>*</sup>
          </label>
          <select 
          defaultValue=""
          name="courseCategory" 
          id="courseCategory"
          {...register("courseCategory",{required:true})}
          className='form-style !bg-richblack-700 w-full'
          >
            <option value="" disabled>Select Option</option>
            {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Tags */}
        <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors = {errors}
        setValue={setValue}
        getValues={getValues}
        />

        {/* course image */}
        <Upload 
        label="Course Thumbnail"
        name="courseImage"
        register={register}
        errors={errors}
        setValue={setValue}
        editData = {editCourse? course?.thumbnail : null}
        />

        {/* Course Benefits */}
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="courseBenefits">
            Benefits of the Course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter Benefits of the Course"
            {...register("courseBenefits", { required: true })}
            className="form-style !bg-richblack-700 resize-none min-h-[130px] w-full"
          />
          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Benefits is required
            </span>
          )}
        </div>
        
        {/* course instruction */}
        <RequirementsField 
        label="Requirements/Instructions"
        name="courseRequirements"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        />

        <div className='flex justify-end gap-2'>
          {editCourse && (
            <button
            onClick={()=>dispatch(setStep(2))}
            disabled={loading}
            type='button'
            className='py-3 px-6 cursor-pointer text-richblack-900 bg-richblack-400 font-semibold rounded-md flex items-center'
            >
              Continue without Saving
            </button>
          )}
          <Iconbtn
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </Iconbtn>
        </div>
      </form>
    </div>
  )

}



