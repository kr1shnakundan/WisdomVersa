import logo from './logo.svg';
import './App.css';
import { Route , Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './components/core/Dashboard/MyProfile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from './pages/Error';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import { getValidToken } from './utils/authUtils';
import { setToken } from './slices/authSlice';
import { setUser } from './slices/profileSlice';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Settings from './components/core/Dashboard/Settings/settingIndex';
import Cart from './components/core/Dashboard/Cart/CartIndex';
import { ACCOUNT_TYPE } from './utils/constant';
import MyCourses from './components/core/Dashboard/MyCourses';
import AddCourse from './components/core/Dashboard/AddCourses/addCourseIndex';
import EditCourse from './components/core/Dashboard/EditCourse/editCourseIndex';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import RoleBasedRoute from './components/core/Auth/RoleBasedRoute';


function App() {
  
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)
  const {user} = useSelector((state)=> state.profile)

   useEffect(() => {

    // used to fetch user after token is still there

    // token expire problem solution-------
    const validToken = getValidToken();
    
    // If token in Redux but it's expired/invalid
    if (token && !validToken) {
      console.log("Token expired, clearing auth state");
      dispatch(setToken(null));
      dispatch(setUser(null)); 
    }
    // If valid token exists but not in Redux
    else if (!token && validToken) {
      dispatch(setToken(validToken));
    }
  }, [token ,dispatch]);  

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <div className='pt-14'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='signup' 
                element={
                  <OpenRoute>
                    <Signup />
                  </OpenRoute>
                  } />
          <Route path = 'Login' 
            element ={
            <OpenRoute>
              <Login />
            </OpenRoute>
            } />
          <Route path='forgot-password'
                element ={
                    <ForgotPassword /> 
                }
          />
          <Route path='update-password/:id' element ={<UpdatePassword/>} />

          <Route path='verify-email' 
                element = {
                  <OpenRoute>
                      <VerifyEmail/>
                  </OpenRoute>
                }
          />

          <Route path='about' element = {<About/>} />


          <Route path='/contact' element = {<Contact/>} />


          <Route path="catalog/:catalogName" element={<Catalog/>} />

          <Route path='courses/:courseId' element={<CourseDetails/>} />

          <Route element={
            < PrivateRoute>
                <Dashboard/>
            </PrivateRoute>
          } >

            <Route path='/dashboard/my-profile' element= {<MyProfile/>} />
            <Route path='/dashboard/enrolled-courses' 
              element = { 
                <RoleBasedRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                  <EnrolledCourses />
                </RoleBasedRoute>
              } 
            />
            <Route path='/dashboard/settings' element={<Settings />} />
            
            <Route path='/dashboard/cart' 
              element={
                <RoleBasedRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                   <Cart/>
                </RoleBasedRoute>
              }
            />
            
             
            <Route path='/dashboard/instructor' element={
              <RoleBasedRoute allowedRoles={[ACCOUNT_TYPE.INSTRUCTOR]}>
                <Instructor/>
              </RoleBasedRoute>
              
            }/>
            <Route path='/dashboard/my-courses' element={
              <RoleBasedRoute allowedRoles={[ACCOUNT_TYPE.INSTRUCTOR]}>
                <MyCourses />
              </RoleBasedRoute>} />
            <Route path='/dashboard/add-course' 
              element={
                <RoleBasedRoute allowedRoles={[ACCOUNT_TYPE.INSTRUCTOR]}>
                  <AddCourse />
                </RoleBasedRoute>
              
              } 
            />
            <Route path='/dashboard/edit-course/:courseId' 
              element={
                <RoleBasedRoute allowedRoles={[ACCOUNT_TYPE.INSTRUCTOR]}>
                  <EditCourse/>
                </RoleBasedRoute>
              }
            />
              
            

            
          </Route>
          
            <Route
              path="view-course/:courseId"
             element={
              <PrivateRoute>
                <ViewCourse/>
              </PrivateRoute>
            }>           
              <>

              <Route 
                path="section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
              
              </>
            </Route>
          


          <Route path='*' element = {<Error/>} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
