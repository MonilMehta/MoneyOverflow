import axios from 'axios';

const API = "https://moneyoverflow-backend.onrender.com/api";

export const axiosInstance = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to add the token to all requests
axiosInstance.interceptors.request.use((config) => {
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("accessToken="))
        ?.split("=")[1];

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
