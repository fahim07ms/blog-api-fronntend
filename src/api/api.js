import axios from "axios";

const baseURL = "http://localhost:3000";

// Custom axios instance for our app
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Get refreshToken cookie from backend
});

// Utility function for setting Authorization header for all future requests
export const setAuthToken = (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosInstance;
