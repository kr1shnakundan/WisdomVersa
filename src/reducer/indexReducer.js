import {combineReducers} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"



const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["user", "token"],  // Only these are persisted
};

const coursePersistConfig = {
  key: "course",
  version: 1,
  storage,
  whitelist: ["step", "course", "editCourse"],
};

const cartPersistConfig = {
  key: "cart",
  version: 1,
  storage,
  whitelist: ["cart", "totalItems", "total"],
};

const viewCoursePersistConfig = {
  key: "viewCourse",
  version: 1,
  storage,
  whitelist: ["courseSectionData", "courseEntireData", "completedLectures", "totalNoOfLectures"],
};



const rootReducer  = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart:cartReducer,
    // course:courseReducer,
    // viewCourse:viewCourseReducer,
    course:persistReducer(coursePersistConfig,courseReducer),
    viewCourse: persistReducer(viewCoursePersistConfig, viewCourseReducer),
 
})

export default rootReducer
