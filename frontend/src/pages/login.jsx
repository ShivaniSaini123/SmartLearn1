import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    console.log("current user", user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await handleLogin(username, password);

            if (loginResponse && loginResponse.success) {
                console.log('Login Successful:', loginResponse.message);
                navigate('..common/dashboard'); // Redirect to dashboard page after successful login
            } else {
                setErrorMessage('Login failed: Incorrect credentials');
            }
        } catch (err) {
            setErrorMessage('Error during login: ' + err.message);
            console.error('Error during login:', err.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
                    {/* Username Field */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Log In
                    </button>

                    {/* Login with Auth0 Button */}
                    {isAuthenticated ? (
                        <button 
                            onClick={() => logout()} 
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg mt-2"
                        >
                            Logout
                        </button>
                    ) : (
                        <button 
                            type="button" // Prevent form submission
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mt-2"
                            onClick={() => loginWithRedirect()}
                        >
                            Log In with Google
                        </button>
                    )}
                </form>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
