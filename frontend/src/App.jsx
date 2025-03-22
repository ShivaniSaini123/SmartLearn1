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
import Categorize from "./pages/Categorize";
import DSA from "./pages/Categorize/DSA";
import WebDev from "./pages/Categorize/WebDev";
import AI from "./pages/Categorize/AI";
import ML from "./pages/Categorize/ML";
import Python from "./pages/Categorize/Python";
import Datascience from "./pages/Categorize/DataScience";
import Dashboard from "./components/common/Dashboard";
import Attendance from "./components/common/Attendance";
import Assignments from "./components/common/Assignments";
import Timetable from "./components/common/Timetable.jsx";
import Exams from "./components/common/Exams";
import Pomodoro from "./components/common/Pomodoro";
import VirtualRoom from "./components/common/VirtualRoom";
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
                <Route path="/Categorize" element={<Categorize />} />
                <Route path="/Categorize/dsa" element={<DSA />} />
                <Route path="/Categorize/webd" element={<WebDev />} />
                <Route path="/Categorize/ai" element={<AI />} />
                <Route path="/Categorize/ml" element={<ML />} />
                <Route path="/Categorize/python" element={<Python />} />
                <Route path="/Categorize/DataScience" element={<Datascience />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="exams" element={<Exams />} />
                <Route path="pomodoro" element={<Pomodoro />} />
                <Route path="virtual-room" element={<VirtualRoom />} />
            </Routes>
        </div>
    );
}
export default App;

           