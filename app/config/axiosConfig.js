import axios from 'axios';

const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    }
);


export default axiosInstance;