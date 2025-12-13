import { Zap } from "lucide-react";
import RenderSteps from "./RenderSteps";

export default function AddCourse (){
    return (
        <div className="text-richblack-5 w-full ">
            <h2 className="text-3xl font-semibold mb-8">Add Course</h2>
            <div className=" flex w-full gap-10 items-start">
                
                <div className="flex-1">
                    <RenderSteps />
                </div>

                <div className="max-w-[25rem] top-28 sticky hidden xl:block flex-1 bg-gradient-to-br from-richblack-800 to-richblack-700 rounded-3xl p-6 shadow-2xl border border-richblack-700">
                    <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                    <span className="text-yellow-400 text-2xl">⚡</span>
                    Course Upload Tips
                    </h2>
                    
                    <ul className="space-y-2 text-[0.75rem] leading-[1.25rem] list-item text-xs">
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Set the Course Price option or make it free.
                        </span>
                    </li>
                    
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Standard size for the course thumbnail is 1024×576.
                        </span>
                    </li>
                    
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Video section controls the course overview video.
                        </span>
                    </li>
                    
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Course Builder is where you create & organize a course.
                        </span>
                    </li>
                    
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
                        </span>
                    </li>
                    
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Information from the Additional Data section shows up on the course single page.
                        </span>
                    </li>
                    
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Make Announcements to notify any important
                        </span>
                    </li>
                    
                    <li className="flex gap-4 text-gray-200">
                        <span className="text-yellow-400 font-bold mt-1">•</span>
                        <span className="flex-1 leading-relaxed">
                        Notes to all enrolled students at once.
                        </span>
                    </li>
                    </ul>
                </div>
                


            </div>
        </div>
    )
}