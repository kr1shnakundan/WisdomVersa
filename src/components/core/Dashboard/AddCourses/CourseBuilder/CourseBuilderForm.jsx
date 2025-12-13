// // CourseBuilderForm.jsx
// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { IoAddCircleOutline } from "react-icons/io5"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"
// import Iconbtn from "../../../../common/Iconbtn"

// import {
//   createSection,
//   updateSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import {
//   setCourse,
//   setEditCourse,
//   setStep,
// } from "../../../../../slices/courseSlice"
// import NestedView from "./NestedView"

// export default function CourseBuilderForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()

//   const { course } = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
//   const [loading, setLoading] = useState(false)
//   const [editSectionName, setEditSectionName] = useState(null)
//   const dispatch = useDispatch()

//   // handle form submission
//   const onSubmit = async (data) => {
//     console.log("Form data:", data);
//     console.log("Full course object:", course); // Log the entire course object
//     console.log("Course ID:", course?._id);
//     console.log("Token:", token);
    
//     setLoading(true)

//     // Validation before API call
//     if (!course) {
//       toast.error("Course data not found!");
//       setLoading(false);
//       return;
//     }

//     // Check for _id or id field
//     const courseId = course._id || course.id;
    
//     if (!courseId) {
//       toast.error("Course ID is missing! Please save the course first.");
//       console.error("Course object:", course);
//       setLoading(false);
//       return;
//     }

//     if (!data.sectionName) {
//       toast.error("Section name is required!");
//       setLoading(false);
//       return;
//     }

//     if (!token) {
//       toast.error("Authentication token is missing!");
//       setLoading(false);
//       return;
//     }

//     let result

//     if (editSectionName) {
//       result = await updateSection(
//         {
//           sectionName: data.sectionName,
//           sectionId: editSectionName,
//           courseId: courseId, // Use the validated courseId
//         },
//         token
//       )
//     } else {
//       result = await createSection(
//         {
//           sectionName: data.sectionName,
//           courseId: courseId, // Use the validated courseId
//         },
//         token
//       )
//     }
    
//     if (result) {
//       dispatch(setCourse(result))
//       setEditSectionName(null)
//       setValue("sectionName", "")
//     }
    
//     setLoading(false)
//   }

//   const cancelEdit = () => {
//     setEditSectionName(null)
//     setValue("sectionName", "")
//   }

//   const handleChangeEditSectionName = (sectionId, sectionName) => {
//     if (editSectionName === sectionId) {
//       cancelEdit()
//       return
//     }
//     setEditSectionName(sectionId)
//     setValue("sectionName", sectionName)
//   }

//   const goToNext = () => {
//     // Check if course exists
//     if (!course) {
//       toast.error("Course data not found")
//       return
//     }

//     // Check if courseContent exists and has items
//     if (!course.courseContent || course.courseContent.length === 0) {
//       toast.error("Please add atleast one section")
//       return
//     }

//     // Check if at least one section has lectures
//     if (
//       course.courseContent.some((section) => 
//         !section.subSection || section.subSection.length === 0
//       )
//     ) {
//       toast.error("Please add atleast one lecture in each section")
//       return
//     }

//     dispatch(setStep(3))
//   }

//   const goBack = () => {
//     dispatch(setStep(1))
//     dispatch(setEditCourse(true))
//   }

//   return (
//     <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
//       <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      
//       {/* Debug info - Remove this in production */}
//       {!course?._id && !course?.id && (
//         <div className="bg-pink-900 border border-pink-500 text-pink-200 px-4 py-3 rounded mb-4">
//           <p className="font-semibold">⚠️ Warning: Course ID is missing!</p>
//           <p className="text-sm">Please complete Step 1 and save the course first.</p>
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="flex flex-col space-y-2">
//           <label className="text-sm text-richblack-5" htmlFor="sectionName">
//             Section Name <sup className="text-pink-200">*</sup>
//           </label>
//           <input
//             id="sectionName"
//             disabled={loading}
//             placeholder="Add a section to build your course"
//             {...register("sectionName", { required: true })}
//             className="form-style !bg-richblack-700 w-full"
//           />
//           {errors.sectionName && (
//             <span className="ml-2 text-xs tracking-wide text-pink-200">
//               Section name is required
//             </span>
//           )}
//         </div>
//         <div className="flex items-end gap-x-4">
//           <Iconbtn
//             type="submit"
//             disabled={loading || (!course?._id && !course?.id)}
//             text={editSectionName ? "Edit Section Name" : "Create Section"}
//             outline={true}
//           >
//             <IoAddCircleOutline size={20} className="text-yellow-50" />
//           </Iconbtn>
//           {editSectionName && (
//             <button
//               type="button"
//               onClick={cancelEdit}
//               className="text-sm text-richblack-300 underline"
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </form>
      
//       {/* Only render NestedView if course and courseContent exist */}
//       {course && course.courseContent && course.courseContent.length > 0 && (
//         <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
//       )}
      
//       {/* Next Prev Button */}
//       <div className="flex justify-end gap-x-3">
//         <button
//           onClick={goBack}
//           className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//         >
//           Back
//         </button>
//         <Iconbtn disabled={loading} text="Next" onclick={goToNext}>
//           <MdNavigateNext />
//         </Iconbtn>
//       </div>
//     </div>
//   )
// }



import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext , MdOutlineBackspace } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import Iconbtn from "../../../../common/Iconbtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  // handle form submission
  const onSubmit = async (data) => {
    setLoading(true)

    // Basic validation: ensure course and token exist
    if (!course) {
      toast.error("Course data not found! Please complete Step 1 and save the course.")
      setLoading(false)
      return
    }

    const courseId = course._id || course.id
    if (!courseId) {
      toast.error("Course ID is missing! Please save the course first.")
      setLoading(false)
      return
    }

    if (!data.sectionName) {
      toast.error("Section name is required!")
      setLoading(false)
      return
    }

    if (!token) {
      toast.error("Authentication token is missing!")
      setLoading(false)
      return
    }

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId,
        },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    if (!course || !course.courseContent || course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }

    if (
      course.courseContent.some(
        (section) => !section.subSection || section.subSection.length === 0
      )
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }


  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true ,
              onBlur: (e) => {
                // If field is empty when user leaves, clear the error
                if (!e.target.value.trim()) {
                  clearErrors("sectionName")
                }
              }
            })}
            className="form-style !bg-richblack-700 w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">

          <button
            type="submit"
            disabled={loading || (!course?._id && !course?.id)}
            className="flex items-center border border-yellow-50 bg-transparent rounded-md cursor-pointer gap-x-2 px-5 py-2 font-semibold  text-yellow-50"
          >
            <span>{editSectionName ? "Edit Section Name" : "Create Section"}</span>
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </button>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course && course.courseContent && course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          <MdOutlineBackspace />
          Back
        </button>
        <Iconbtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </Iconbtn>
      </div>
    </div>
  )
}