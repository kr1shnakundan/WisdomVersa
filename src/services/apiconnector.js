import axios from "axios"

export const axiosInstance = axios.create({});
// Interceptor to add token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // or get from Redux store
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const apiConnector = (method , url , bodydata , headers , params) =>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data : bodydata? bodydata : null,
        headers: headers? headers : null,
        params : params ? params : null

    });
}
