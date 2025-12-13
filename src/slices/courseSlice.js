
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   step: localStorage.getItem("step") ? 
//     JSON.parse(localStorage.getItem("step")) : 1,
//   course: localStorage.getItem("course") ? 
//     JSON.parse(localStorage.getItem("course")) : null,
//   editCourse: localStorage.getItem("editCourse") ? 
//     JSON.parse(localStorage.getItem("editCourse")) : false,
//   paymentLoading: false
// }

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {
//     setStep: (state, action) => {
//       state.step = action.payload;
//       localStorage.setItem("step", JSON.stringify(action.payload)); // Save to localStorage
//     },
//     setCourse: (state, action) => {
//       state.course = action.payload;
//       localStorage.setItem("course", JSON.stringify(action.payload)); // Save to localStorage
//     },
//     setEditCourse: (state, action) => {
//       state.editCourse = action.payload;
//       localStorage.setItem("editCourse", JSON.stringify(action.payload)); // Save to localStorage
//     },
//     setPaymentLoading: (state, action) => {
//       state.paymentLoading = action.payload;
//       // No need to persist this one
//     },
//     resetCourseState: (state) => {
//       state.step = 1;
//       state.course = null;
//       state.editCourse = false;
//       // Clear from localStorage
//       localStorage.removeItem("step");
//       localStorage.removeItem("course");
//       localStorage.removeItem("editCourse");
//     },
//   }   
// })

// export const {
//   setStep,
//   setCourse,
//   setEditCourse,
//   setPaymentLoading,
//   resetCourseState,
// } = courseSlice.actions;

// export default courseSlice.reducer;


//==============================Using redux-persist======================================



import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
  resetId: Date.now(),
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCourse: (state, action) => {
      state.course = action.payload
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
      state.resetId = Date.now()
    },
  },
})

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer