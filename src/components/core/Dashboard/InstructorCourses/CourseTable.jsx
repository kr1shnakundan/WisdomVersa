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

export default function CourseTable ({courses , setCourses}){
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
//----------------------------------------------NEED CSS STYLING-------------------------
//--------------------------------------------------------------------------------------
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
        <>
          <Table className="text-richblack-5">
            <Thead>
                <Tr className="flex gap-x-10 text-sm font-medium uppercase text- text-richblack-100">
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
            <Tbody>
                {courses?.length === 0 || !courses ? (
                    <Tr>
                        <Td>
                            No courses found
                            {/* TODO: Need to change this state <--------------------- */}
                        </Td>
                    </Tr>
                ) : (
                    
                    courses.map((course)=>(
                        <Tr key={course._id}>
                            <Td>
                                <img 
                                src={course?.thumbNail} 
                                alt={course?.courseName} 
                                />
                                <div>
                                    <p>{course?.courseName}</p>
                                    {/* <p> <---- COMPLEX 
                                        {course.courseDescription.split(" ").length >TRUNCATE_LENGTH
                                            ? course.courseDescription
                                                .split(" ")
                                                .slice(0, TRUNCATE_LENGTH)
                                                .join(" ") + "..."
                                            : course.courseDescription}
                                    </p> */}

                                    
                                    <p className="text-xs text-richblack-300 line-clamp-2">
                                        {course.courseDescription}
                                    </p>
                                    <p>Created: {formatDate(course?.createdAt)}</p>
                                    <div className="flex items-center gap-2">
                                    {course?.status === COURSE_STATUS.PUBLISHED ? (
                                        <>
                                        <BsGlobeCentralSouthAsia />
                                        <span>Published</span>
                                        </>
                                    ) : (
                                        <>
                                        <CiTimer />
                                        <span>Drafted</span>
                                        </>
                                    )}
                                    </div>
                                </div>
                            </Td>
                            <Td>
                                {/* Convert this hardcore to database <------------------ */}
                                2hr 30min
                            </Td>
                            <Td>
                                ₹{course?.price}
                            </Td>
                            <Td>
                                <button
                                disabled={loading}
                                onClick={() => {
                                navigate(`/dashboard/edit-course/${course._id}`)
                                }}
                                title="Edit Course"
                                >
                                    <MdEdit size={20}/>
                                </button>
                                <button
                                disabled={loading}
                                aria-label="Delete Course"
                                onClick={()=>handleSetConfirmationModal({course})}
                                >
                                    <MdDelete/>
                                </button>
                            </Td>
                        </Tr>
                    ))
                    
                )}
            </Tbody>
          </Table> 
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />} 
        </>
    )
}