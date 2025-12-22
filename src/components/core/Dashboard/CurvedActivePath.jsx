// import React from "react"

// const CurvedActivePath = ({ height, activeWidth }) => {
//   if (!height || height <= 0) return null

//   const curveStartY = height * 0.65
//   const curveEndY = 0
//   const horizontalLength = activeWidth || 180

//   return (
//     <svg
//       className="absolute left-0 bottom-0 pointer-events-none"
//       width={horizontalLength}
//       height={height}
//       viewBox={`0 0 ${horizontalLength} ${height}`}
//       preserveAspectRatio="none"
//     >
//       <path
//         d={`
//           M 0 ${height}
//           L 0 ${curveStartY}
//           C 0 ${curveStartY - 40},
//             ${horizontalLength * 0.25} ${curveEndY + 40},
//             ${horizontalLength} ${curveEndY}
//         `}
//         stroke="#facc15"
//         strokeWidth="4"
//         fill="none"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   )
// }

// export default CurvedActivePath
