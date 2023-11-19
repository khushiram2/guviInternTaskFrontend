import axios from "axios";

const axiosInstance=axios.create()

axiosInstance.interceptors.request.use(
    (config) => {
    const token=window.localStorage.getItem("token")
        if(token){
            config.headers.Authorization = token;
            return config;

        }
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance