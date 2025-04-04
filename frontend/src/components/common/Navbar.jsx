import {useState, useContext, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import smartLearnLogo from "../../assets/projectlogo/projLogo.png";

const Navbar = () => {
    const { userData, setUserData } = useContext(AuthContext);
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        // Add event listener when dropdown is open
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            // Remove event listener on cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from localStorage
        setUserData(null); // Reset user data to indicate logout
    };
    const [showNavbar] = useState('top');
    return (
        // <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#1e231c] border-b-4 border-gray-500 px-6 py-3 h-[70px]">
        <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white bg-blue-600 translate-y-0 transition-all ${showNavbar} `}>
             <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
            {/* Logo */}
            <Link to="/">
                <img src={smartLearnLogo} alt="Logo" className="w-16 h-16" />
            </Link>
            
            {/* Navbar Links */}
            <ul className="flex items-center gap-6 text-white">

                {!userData ? (
                    <>
                        <li>
                            <Link className="hover:text-yellow-400 transition" to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link className="hover:text-yellow-400 transition bg-yellow-500 px-4 py-2 rounded-md text-black font-medium" to="/login">Login</Link>
                        </li>
                    </>
                ) : (
                    <>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="hover:text-yellow-400 transition"
                        >
                            Logout
                        </button>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-400 transition" to="/dashboard">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="block px-4 py-2 hover:bg-gray-200"
                                to="/profile"
                                >
                            Profile
                        </Link>
                    </li>
                    </>
                )}
            </ul>
            </div>
        </nav>
    );
};

export default Navbar;
