import  { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { setUserData } = useContext(AuthContext); // Access setUserData from context

    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Call the backend logout route
                const response = await fetch('/logout', {
                    method: 'GET', // or 'POST' depending on your setup
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (response.ok) {
                    // If logout is successful, reset user data in context
                    setUserData(null); // Clear userData in context
                    console.log("Logged out successfully");
                    navigate('/'); // Redirect to homepage or login page
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        logoutUser();
    }, [navigate, setUserData]); // Make sure setUserData is included in dependency array

    // You can optionally show a loading or "Logging out..." message
    return <div>Logging out...</div>;
};

export default Logout;