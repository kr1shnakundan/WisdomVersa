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
// import { setLoading } from '../slices/authSlice'
// import { setLoading } from '../slices/profileSlice'

const Dashboard = () => {
  return (
    <div className='flex relative min-h-[calc(100vh-3.5rem)]'>
        {/* <Sidebar/> */}
        <div>
            <div>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard