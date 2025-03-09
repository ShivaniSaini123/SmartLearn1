import axios from "axios"; // Axios for making HTTP requests
// import httpStatus from "http-status"; // For handling HTTP status codes
import { createContext, useState, useEffect } from "react"; // React context and hooks
import { useNavigate } from "react-router-dom"; // Hook for navigation
import PropTypes from "prop-types"; // For prop-type validation

// Create a context for authentication
export const AuthContext = createContext({});

// Create an Axios instance with a base URL for user-related API requests
const client = axios.create({
    baseURL: "http://localhost:3005/api/users" // Correct URL
    
});

// AuthProvider component to wrap the application and provide auth context
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
     // State to hold user dat
    const router = useNavigate(); // Hook for navigation

    // Check if the user data is available in localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                try {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData); // Parse and set user data
                } catch (err) {
                    console.error("Error parsing user data from localStorage:", err);
                    localStorage.removeItem("userData"); // Optionally remove corrupted user data
                }
            } else {
                console.warn("User data not found in localStorage.");
            }
        }
    }, []); // This effect runs only once on component mount

    // Helper function to validate email format
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };
    const handleRegister = async (username, email, password) => {
        // Input validation
        if (!username || !email || !password) {
            throw new Error("All fields are required.");
        }
    
        if (!validateEmail(email)) {
            throw new Error("Invalid email format.");
        }
    
        try {
            console.log('Registration request payload:', { username, email, password });
    
            // Send the request
            const request = await client.post("/signup", { username, email, password });
            // const request = await client.post("/signup", { username, email, password });

            console.log('Registration Response:', request.data);
    
            if (request.data && request.data.message) {
                return request.data.message || "Registration successful"
            } else {
                throw new Error("Registration failed: Invalid response from server.");
            }
        } catch (err) {
            if (err.response) {
                // Handle errors based on status codes
                console.error("Registration error response:", err.response);
    
                if (err.response.status === 400) {
                    throw new Error("Bad Request: Please check your input fields.");
                } else if (err.response.status === 500) {
                    console.error("Internal Server Error:", err.response.data);
                    throw new Error("An error occurred while processing your request. Please try again later.");
                }
            } else if (err.request) {
                // Handle cases where the request was made but no response was received
                console.error("No response received:", err.request);
                throw new Error("No response from server. Please check your connection.");
            } else {
                // Handle any other errors
                console.error("Registration error:", err.message);
                throw new Error("Network error: Unable to reach the server. Please check your connection.");
            }
    
            // Propagate the error
            throw err;
        }
    };
    
    const handleLogin = async (email, password) => {
        try {
            const res = await client.post("/login", { email, password }, { withCredentials: true });
    
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userData", JSON.stringify(res.data.user));
                setUserData(res.data.user);
                router("/"); // Redirect after login
            } else {
                throw new Error("Login failed: No token received.");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw new Error(error.response?.data?.message || "Login failed. Please try again.");
        }
    };
    
    // Async function to get the user's activity history
    const getHistoryOfUser = async () => {
        try {
            const request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token") // Send token as a query parameter
                }
            });
            return request.data; // Return activity data
        } catch (err) {
            console.error("Error fetching user history:", err); // Log error while fetching history
            throw err; // Propagate error
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        localStorage.removeItem("userData"); // Remove user data from localStorage
        setUserData(null); // Reset user data state
        router("/login"); // Redirect to login page after logout
    };

    // Context value to provide to children components
    const data = {
        userData, // Current user data
        setUserData, // Function to update user data
        handleLogin, // Function to handle login
        handleRegister, // Function to handle registration
        getHistoryOfUser, // Function to get user's activity history
        handleLogout // Function to handle logout
    };

    // Provide the context value to children components
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

// PropTypes for AuthProvider component
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired // Validate that children is a React node and required
};  
