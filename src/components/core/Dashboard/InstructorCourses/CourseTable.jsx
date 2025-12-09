import { Table, Thead, Tr ,Th,Td, Tbody} from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constant";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import { formatDate } from "../../../../services/formatDate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse ,fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function CourseTable ({courses , setCourses}){
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    // const TRUNCATE_LENGTH = 30;

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
        setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    const handleSetConfirmationModal = ({course}) =>{
        setConfirmationModal({
            text1: "Do you want to delete this course?",
            text2:
                "All the data related to this course will be deleted",
            btn1Text: !loading ? "Delete" : "Loading...  ",
            btn2Text: "Cancel",
            btn1Handler: !loading
                ? () => handleCourseDelete(course._id)
                : () => {},
            btn2Handler: !loading
                ? () => setConfirmationModal(null)
                : () => {},
        })
    }
    return(
        <div className="course-table-wrapper">
          {
            courses?.length === 0 || !courses ?(
                <div className="text-richblack-5 text-center border-t border-richblack-700">
                    <p className="py-10 text-xl lg:text-3xl font-semibold ">No course Found</p>
                </div>
            ):(
                <Table className="rounded-xl border border-richblack-800 text-richblack-5 ">
                    <Thead>
                        <Tr className="flex gap-x-10 text-sm font-medium uppercase text-richblack-100 
                        rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                            <Th className="flex-1 text-left font-medium "> 
                                COURSES
                            </Th>
                            <Th className="text-left font-medium">
                                DURATION
                            </Th>
                            <Th className="text-left font-medium">
                                PRICE
                            </Th>
                            <Th className="text-left font-medium">
                                ACTIONS
                            </Th>

                        </Tr>
                    </Thead>
                    <Tbody >
                        {
                            courses.map((course)=>(
                                <Tr 
                                key={course._id}
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                                >
                                    <Td className="flex flex-1 gap-x-4">
                                        <img 
                                        src={course?.thumbNail} 
                                        alt={course?.courseName} 
                                        className="h-[148px] w-[220px] rounded-lg object-cover"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <p className="text-lg md:text-xl font-semibold">
                                                {course?.courseName}
                                            </p>
                                            {/* <p> <---- COMPLEX 
                                                {course.courseDescription.split(" ").length >TRUNCATE_LENGTH
                                                    ? course.courseDescription
                                                        .split(" ")
                                                        .slice(0, TRUNCATE_LENGTH)
                                                        .join(" ") + "..."
                                                    : course.courseDescription}
                                            </p> */}

                                            
                                            <p className="text-[0.875rem] leading-[1.375rem] text-richblack-300 line-clamp-2">
                                                {course.courseDescription}
                                            </p>
                                            <p className="text-[0.75rem] leading-[1.25rem] text-richblack-25">Created: {formatDate(course?.createdAt)}</p>
                                            <div className="">
                                            {course?.status === COURSE_STATUS.PUBLISHED ? (
                                                <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                    <BsGlobeCentralSouthAsia size={8} />
                                                </div>
                                                
                                                <span>Published</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 w-fit rounded-full bg-richblack-700 px-2 py-1 text-xs font-medium text-pink-100">
                                                <CiTimer size={14} />
                                                <span>Drafted</span>
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                    </Td>
                                    <Td className="text-richblack-100 text-sm font-medium">
                                        {/* 2hr 30min */}
                                        {course?.totalDuration}
                                    </Td>
                                    <Td className="text-richblack-100 text-sm font-medium">
                                        ₹{course?.price}
                                    </Td>
                                    <Td className="text-richblack-100 text-sm font-medium">
                                        <button
                                        disabled={loading}
                                        onClick={() => {
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                        }}
                                        title="Edit Course"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                        >
                                            <MdEdit size={20}/>
                                        </button>
                                        <button
                                        disabled={loading}
                                        aria-label="Delete Course"
                                        onClick={()=>handleSetConfirmationModal({course})}
                                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                        >
                                            <MdDelete size={20}/>
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table> 
            )
          }
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />} 
        </div>
    )
}