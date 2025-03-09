// import { useEffect, useState } from "react";
// import { Route, Routes, useLocation, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
// import SignUp from "./pages/signup"; // .jsx extension is not required
import SignUp from "./pages/signup.jsx"
import Login from "./pages/login";
import ProfilePage from "./pages/profile";
import Logout from "./pages/logout.jsx";
function App() {
    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
             <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="signup" element={<SignUp />}/>
                <Route path="login" element={<Login />}/>
                <Route path="profile" element={<ProfilePage/>}/>
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
}
export default App;
