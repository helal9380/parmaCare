/** @format */

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate()
  const {logOut} = useAuth()
  axiosSecure.interceptors.request.use(function(config) {
    const token = localStorage.getItem('access-token');
    console.log('token in the interceptors', token);
    config.headers.authorization = `Beere ${token}`
    return config
  })

  // interceptor 401 402 403 for response
  axiosSecure.interceptors.response.use(function(response) {
    return response
  }, async (error) => {
    const status = error.response.status;
    console.log('error in the interceptor', status);
    if(status === 401 || status === 403) {
      await logOut()
      navigate('/login')
    }
    return Promise.reject(error);
  })

  return axiosSecure;
};

export default useAxiosSecure;
