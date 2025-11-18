
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { setToken } from "../../../slices/authSlice"
import { getValidToken } from "../../../utils/authUtils" 

function PrivateRoute({ children }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  // Double-check token validity
  const validToken = getValidToken()
  
  if (token && !validToken) {
    // Token expired, clear it
    dispatch(setToken(null))
    return <Navigate to="/login" />
  }

  if (validToken) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute