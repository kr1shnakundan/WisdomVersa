// import React, { useEffect } from 'react'
// import { apiConnector } from '../services/apiconnector'
// import { endpoints } from '../services/apis'
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMe } from '../services/operations/authAPI';


// const {GETME_API} =endpoints;

// const Dashboard = () => { 
//     //--------------------------------Fix the error occuring here 

//     const {user} = useSelector((state) => state.profile)
//     const userId = user?._id;
//     const token = useSelector((state) => state.auth.token);
  
//     const dispatch = useDispatch();
    
//     const navigate = useNavigate();
//     async function callMe() {
//         try{
//             // const me = await apiConnector("GET", GETME_API,{token},{
//             //      Authorization: `Bearer ${token}`
//             // } );

//             // console.log(me.data);
//             // navigate("/hellojii");
//             // dispatch(getMe(navigate));<--------------------------------------- uncomment it

//         }catch(err){
//             console.log(err);
//         }
//     }
//     useEffect( () => {
//         console.log("token in dashboard : ",token);
//         callMe();
        
//     },[])

//   return (
// <div className='grid place-items-center md:h-[500px] place-content-center '>
//     <div className='text-white mb-10'>Dashboard</div>
//     <button 
//     onClick={callMe}
//     className='text-white'>Me</button>
// </div>  )
// }

// export default Dashboard



import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"

import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {

  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }


  return (
    <div className='flex relative min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>
        <div className="h-[calc(100vh-3.5rem)] w-full flex-1 overflow-auto">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10" >
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard