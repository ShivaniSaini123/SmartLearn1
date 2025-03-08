import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from "../utils/constants";
import Tab from "../components/common/Tab";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  // Destructure handleRegister from AuthContext
  const { handleRegister } = useContext(AuthContext);

  // Initialize navigate function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !password) {
        console.error("All fields are required");
        return;
    }

    if (typeof handleRegister !== "function") {
        console.error("handleRegister is not a function");
        return;
    }

    try {
        // Attempt to register the user
        const response = await handleRegister(username, email, password);

        // If registration was successful
        if (response) {
            console.log(response); // Log success message from server
            navigate("/"); // Redirect to home page after successful signup
        } else {
            console.error("Registration failed", response?.message); // Handle error
        }
    } catch (error) {
        console.error("Error occurred during registration:", error); // Handle unexpected errors
    }
};

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        {/* Account Type Tabs */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
