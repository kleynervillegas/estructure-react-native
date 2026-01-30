import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    }
);

axiosInstance.interceptors.response.use(
    async (response) => {
        if (response.headers['x-token']) {
            await AsyncStorage.setItem("token", response.headers['x-token']);
        }
        return response;
    },
    (error) => {
        console.error('Axios response error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;