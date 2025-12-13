import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import PublishCourse from "./PublishCourse/publishCourseIndex"
import  CourseInformationForm  from "./CourseInformation/CourseInformationForm"
import  CourseBuilderForm  from "./CourseBuilder/CourseBuilderForm"

export default function RenderSteps(){
    const {step} = useSelector((state)=>state.course)
    const steps = [
        {
            id:1,
            title:"Course Information"
        } ,{
            id:2,
            title:"Course Builder"
        },{
            id:3,
            title:"Publish"
        }
    ]
    return(
        <div>
            <h2></h2>
            <div className="flex w-full justify-center relative mb-2">
                
                {
                    steps.map((item)=>(
                        <React.Fragment key={item.id}>
                            <div className="flex items-center flex-col " >
                                <button
                                className={`grid cursor-default aspect-square w-[34px] place-items-center border rounded-full
                                    ${step === item.id ? "border-yellow-50 bg-yellow-900 text-yellow-50" 
                                    : "border-richblack-700 bg-richblack-800 text-richblack-300"}
                                    ${step > item.id && "bg-yellow-50 text-yellow-50"}
                                `}
                                >
                                    {step > item.id ? (
                                        <FaCheck className="font-bold text-richblack-900" />
                                    ) : (
                                        item.id
                                    )}
                                    
                                </button>
                            
                            </div>
                            {item.id !== steps.length && (
                                <>
                                    <div
                                    className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                                    step > item.id  ? "border-yellow-50" : "border-richblack-500"
                                    } `}
                                    ></div>
                                </>
                            )}
                        </React.Fragment>
                        
                    ))
                }
                
            </div>
            <div className="relative mb-16 flex  w-full select-none justify-between">
                {
                    steps.map((item)=>(
                    
                        <div 
                        className="flex min-w-[130px] flex-col items-center gap-y-3"
                        key={item.id}>
                                <p
                                    className={`text-sm ${
                                    step >= item.id ? "text-richblack-5" : "text-richblack-500"
                                    }`}
                                >
                                    {item.title}
                                </p>

                        </div>
                        
                    ))
                }
            </div>
            {/* Render specific component based on current step */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 &&  <PublishCourse /> }
        </div>
    )
}