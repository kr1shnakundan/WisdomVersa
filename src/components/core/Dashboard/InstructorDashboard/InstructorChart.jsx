
// import { useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function InstructorChart({ courses }) {
//     const [currChart, setCurrChart] = useState("students");

//     // Generate random colors for each course
//     const generateRandomColors = (numColors) => {
//         const colors = [];
//         for (let i = 0; i < numColors; i++) {
//             const color = `rgb(${Math.floor(Math.random() * 200) + 50}, ${
//                 Math.floor(Math.random() * 200) + 50
//             }, ${Math.floor(Math.random() * 200) + 50})`;
//             colors.push(color);
//         }
//         return colors;
//     };

//     // Data for chart displaying student info
//     const chartDataStudents = {
//         labels: courses?.map((course) => course.courseName),
//         datasets: [
//             {
//                 data: courses?.map((course) => course.totalStudentsEnrolled),
//                 backgroundColor: generateRandomColors(courses?.length),
//                 borderColor: "#1F2937",
//                 borderWidth: 2,
//             },
//         ],
//     };

//     // Data for chart displaying income info
//     const chartDataIncome = {
//         labels: courses?.map((course) => course.courseName),
//         datasets: [
//             {
//                 data: courses?.map((course) => course.totalAmountGenerated),
//                 backgroundColor: generateRandomColors(courses?.length),
//                 borderColor: "#1F2937",
//                 borderWidth: 2,
//             },
//         ],
//     };

//     // Options for the chart
//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//             tooltip: {
//                 backgroundColor: "#1F2937",
//                 titleColor: "#F9FAFB",
//                 bodyColor: "#F9FAFB",
//                 borderColor: "#374151",
//                 borderWidth: 1,
//                 padding: 12,
//                 displayColors: true,
//                 callbacks: {
//                     label: function (context) {
//                         let label = context.label || "";
//                         if (label) {
//                             label += ": ";
//                         }
//                         if (currChart === "students") {
//                             label += context.parsed + " Students";
//                         } else {
//                             label += "₹" + context.parsed.toLocaleString();
//                         }
//                         return label;
//                     },
//                 },
//             },
//         },
//     };

//     return (
//         <div className="w-full">
//             {/* Header with Toggle Buttons */}
//             <div className="flex items-center justify-between mb-6 pb-4 border-b border-richblack-700">
//                 <h3 className="text-xl font-semibold text-richblack-5">Visualize</h3>
//                 <div className="flex gap-2 bg-richblack-700 p-1 rounded-lg">
//                     <button
//                         onClick={() => setCurrChart("students")}
//                         className={`px-5 py-2 rounded-md font-medium transition-all text-sm ${
//                             currChart === "students"
//                                 ? "bg-richblack-900 text-yellow-50 shadow-md"
//                                 : "text-richblack-300 hover:text-richblack-50"
//                         }`}
//                     >
//                         Students
//                     </button>
//                     <button
//                         onClick={() => setCurrChart("income")}
//                         className={`px-5 py-2 rounded-md font-medium transition-all text-sm ${
//                             currChart === "income"
//                                 ? "bg-richblack-900 text-yellow-50 shadow-md"
//                                 : "text-richblack-300 hover:text-richblack-50"
//                         }`}
//                     >
//                         Income
//                     </button>
//                 </div>
//             </div>

//             {/* Chart and Legend Side by Side */}
//             <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
//                 {/* Chart Section */}
//                 <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
//                     <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
//                         <Pie
//                             data={currChart === "students" ? chartDataStudents : chartDataIncome}
//                             options={options}
//                         />
//                     </div>
//                 </div>

//                 {/* Legend Section */}
//                 <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
//                     <div className="space-y-2 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-richblack-700 [&::-webkit-scrollbar-thumb]:bg-richblack-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-richblack-500">
//                         {courses?.map((course, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center justify-between p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-all cursor-pointer group"
//                             >
//                                 <div className="flex items-center gap-4 flex-1 min-w-0 mr-4">
//                                     <div
//                                         className="w-5 h-5 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-richblack-500 transition-all"
//                                         style={{
//                                             backgroundColor:
//                                                 currChart === "students"
//                                                     ? chartDataStudents.datasets[0].backgroundColor[index]
//                                                     : chartDataIncome.datasets[0].backgroundColor[index],
//                                         }}
//                                     ></div>
//                                     <span className="text-richblack-50 text-base font-medium truncate">
//                                         {course.courseName}
//                                     </span>
//                                 </div>
//                                 <span className="text-richblack-5 font-bold text-base whitespace-nowrap">
//                                     {currChart === "students"
//                                         ? `${course.totalStudentsEnrolled}`
//                                         : `₹${course.totalAmountGenerated.toLocaleString()}`}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function InstructorChart({ courses }) {
    const [currChart, setCurrChart] = useState("students");

    // Data for chart displaying student info
    const chartDataStudents = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                label: "Students Enrolled",
                data: courses?.map((course) => course.totalStudentsEnrolled),
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: "#3B82F6",
                pointBorderColor: "#1F2937",
                pointBorderWidth: 2,
                pointHoverBackgroundColor: "#60A5FA",
                pointHoverBorderColor: "#3B82F6",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    // Data for chart displaying income info
    const chartDataIncome = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                label: "Income Generated (₹)",
                data: courses?.map((course) => course.totalAmountGenerated),
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: "#10B981",
                pointBorderColor: "#1F2937",
                pointBorderWidth: 2,
                pointHoverBackgroundColor: "#34D399",
                pointHoverBorderColor: "#10B981",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    // Options for the chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#1F2937",
                titleColor: "#F9FAFB",
                bodyColor: "#F9FAFB",
                borderColor: "#374151",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        if (currChart === "students") {
                            return `Students: ${context.parsed.y}`;
                        } else {
                            return `Income: ₹${context.parsed.y.toLocaleString()}`;
                        }
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#9CA3AF",
                    font: {
                        size: 11,
                    },
                    maxRotation: 45,
                    minRotation: 45,
                },
                border: {
                    color: "#374151",
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "#374151",
                    drawBorder: false,
                },
                ticks: {
                    color: "#9CA3AF",
                    font: {
                        size: 11,
                    },
                    callback: function(value) {
                        if (currChart === "income") {
                            return '₹' + value.toLocaleString();
                        }
                        return value;
                    }
                },
                border: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="w-full">
            {/* Header with Toggle Buttons */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-richblack-700">
                <h3 className="text-xl font-semibold text-richblack-5">Performance Analytics</h3>
                <div className="flex gap-2 bg-richblack-700 p-1 rounded-lg">
                    <button
                        onClick={() => setCurrChart("students")}
                        className={`px-5 py-2 rounded-md font-medium transition-all text-sm ${
                            currChart === "students"
                                ? "bg-richblack-900 text-yellow-50 shadow-md"
                                : "text-richblack-300 hover:text-richblack-50"
                        }`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => setCurrChart("income")}
                        className={`px-5 py-2 rounded-md font-medium transition-all text-sm ${
                            currChart === "income"
                                ? "bg-richblack-900 text-yellow-50 shadow-md"
                                : "text-richblack-300 hover:text-richblack-50"
                        }`}
                    >
                        Income
                    </button>
                </div>
            </div>

            {/* Chart Section - Full Width */}
            <div className="w-full">
                <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] bg-richblack-700/30 rounded-lg p-6">
                    <Line
                        data={currChart === "students" ? chartDataStudents : chartDataIncome}
                        options={options}
                    />
                </div>

                {/* Summary Stats Below Chart */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {courses?.slice(0, 4).map((course, index) => (
                        <div
                            key={index}
                            className="bg-richblack-700 rounded-lg p-4 hover:bg-richblack-600 transition-all group"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className={`w-3 h-3 rounded-full ${
                                        currChart === "students" ? "bg-blue-500" : "bg-caribbeangreen-500"
                                    }`}
                                ></div>
                                <span className="text-richblack-300 text-xs truncate">
                                    {course.courseName}
                                </span>
                            </div>
                            <p className="text-richblack-5 text-xl font-bold">
                                {currChart === "students"
                                    ? course.totalStudentsEnrolled
                                    : `₹${course.totalAmountGenerated.toLocaleString()}`}
                            </p>
                            <p className="text-richblack-400 text-xs mt-1">
                                {currChart === "students" ? "Students" : "Revenue"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}