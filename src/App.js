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
import { getUserDetails } from './services/operations/authAPI';


function App() {
  
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)
  const {user} = useSelector((state)=> state.profile)

  useEffect(()=>{
    if(token && !user){
      dispatch(getUserDetails())
    }
  },[token , user, dispatch]);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
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

         {/* THIS ROUTE IS CURRENTLY FOR CHECKING OF LOCALSTORAGE */}
         <Route path='/dashboard/my-profile' element= {<MyProfile/>} />

         <Route path='/contact' element = {<Contact/>} />
      </Routes>
      
    </div>
  );
}

export default App;
