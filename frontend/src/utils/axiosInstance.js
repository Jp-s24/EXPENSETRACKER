import axios from "axios";
import { BASE_URI } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URI,
    timeout: 10000, //10 seconds timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add a request interceptor to include token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor 
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle common errors globally 
        if (error.response) {
            if (error.response.status === 401) {
                //Redirect to login or show message
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server error: Please try again later."); 
            }
            else if (error.code === "ECONNABORTED") {
                console.error("Request timeout: Please try again.");
            }
            return Promise.reject(error); 
        }
    }
);

export default axiosInstance;

