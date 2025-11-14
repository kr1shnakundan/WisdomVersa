// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const PrivateRoute = ({children}) => {
//     const Navigate = useNavigate();
//     const {token} = useSelector((state)=>state.auth);
//     if(token !== null){
//         return children
//     } else{
//         return < Navigate to={"/login"} />
//     }
// }

// export default PrivateRoute



import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);
  
  // If no token, return null while redirecting
  if (token === null) {
    return null;
  }
  
  // If token exists, render the protected content
  return children;
}

export default PrivateRoute