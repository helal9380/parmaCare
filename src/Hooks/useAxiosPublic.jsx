import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://parma-care-client.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;