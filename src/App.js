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
  }, [token ,dispatch]);  // 5 * 60 * 1000); // Check every 5 minutes

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
                  <OpenRoute>
                    <ForgotPassword />
                  </OpenRoute>
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

            <Route element={
              < PrivateRoute>
                  <Dashboard/>
              </PrivateRoute>
            } >

              <Route path='/dashboard/my-profile' element= {<MyProfile/>} />
              <Route path='/dashboard/enrolled-courses' element = { <EnrolledCourses />} />
              <Route path='/dashboard/settings' element={<Settings />} />
              
              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route path='/dashboard/cart' element={<Cart/>} />
                  </>
                )
              }

              {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path='/dashboard/my-courses' element={<MyCourses />} />
                </>
              )}

              
            </Route>
          

          


          <Route path='*' element = {<Error/>} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
