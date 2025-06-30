import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            // Server responded with a status code outside of 2xx
            console.error("Response error:", error.response.status, error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("Request error:", error.request);
        } else {
            // Error in setting up the request
            console.error("Error:", error.message);
        }
        
        // You can handle specific status codes here
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            // e.g., redirect to login page
        }
        
        return Promise.reject(error);
    }
);


export default axiosInstance