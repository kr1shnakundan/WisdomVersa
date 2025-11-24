
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { setToken } from "../../../slices/authSlice"
import { getValidToken } from "../../../utils/authUtils" 

function PrivateRoute({ children }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [shouldNavigate, setShouldNavigate] = useState(false)

  // Double-check token validity
  useEffect(() => {
    const validToken = getValidToken()
    
    if (token && !validToken) {
      // Token expired, clear it
      dispatch(setToken(null))
      setShouldNavigate(true)
    }
  }, [token, dispatch])

  const validToken = getValidToken()

  if (shouldNavigate) {
    return <Navigate to="/login" />
  }

  if (validToken) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute