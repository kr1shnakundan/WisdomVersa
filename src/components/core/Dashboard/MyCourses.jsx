import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Iconbtn from "../../common/Iconbtn";
import CourseTable from "./InstructorCourses/CourseTable";
import { MdAddCircleOutline } from "react-icons/md";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

export default function MyCourses (){
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const [courses , setCourses] = useState([])

     useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [])
    return(
        <div className="text-richblack-5">
            <div className="flex items-center justify-between my-3">
                <h2 className="text-3xl font-semibold">My Courses</h2>
                <Iconbtn 
                onclick={()=>navigate("/dashboard/add-course")}
                text={
                    <div className="flex items-center gap-1">
                        <MdAddCircleOutline />
                        <p>New</p>
                    </div>
                }
                />
            </div>
            {courses && 
                <CourseTable courses = {courses} setCourses={setCourses} />
            }
        </div>
    )
}