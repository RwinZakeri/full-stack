import axios from "axios";

// Create an Axios instance
const AXIOS = axios.create({
  baseURL: "http://localhost:3001", // Your API base URL
});

// Add request interceptor to include the token
AXIOS.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.token = token; // Add token header
    }
    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Handle errors during request setup
  }
);

// Add response interceptor to handle errors globally
AXIOS.interceptors.response.use(
  (response) => response, // Simply return response for successful requests
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized, redirecting to login...");
      localStorage.removeItem("token"); // Remove token if it's invalid
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Propagate the error for further handling
  }
);

export default AXIOS;
