import axios from "axios";

// Using the same URL that we booted our backend on. Note that NEXT_PUBLIC prefix is required for browser visibility.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Handle offline cases nicely instead of Axios splats
        if (!error.response) {
            return Promise.reject({
                success: false,
                message: "Database connection unavailable. Please ensure backend is running.",
                code: "NETWORK_ERROR"
            });
        }
        return Promise.reject(error.response.data || error);
    }
);

export default apiClient;
