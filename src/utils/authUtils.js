
//--------------------------------------------------This is to check if the token is expired or not and remove 
//---------------------------------------------------token from localstorage
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export const getValidToken = () => {
  const token = localStorage.getItem('token');
  // const token = useSelector((state) => state.auth)<------- why not use this---?
  
  if (!token || isTokenExpired(token)) {
    // Clean up expired token
    localStorage.removeItem('token');
    return null;
  }
  
  return token;
};