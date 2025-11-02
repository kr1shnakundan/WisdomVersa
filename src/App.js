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


function App() {
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
      </Routes>
      
    </div>
  );
}

export default App;
