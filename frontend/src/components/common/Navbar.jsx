// import React,{useState,useEffect} from 'react'
import {useState} from 'react'
import {Link,matchPath,useLocation} from "react-router-dom"
import { useSelector } from 'react-redux'

import { NavbarLinks } from '../../data/navbar_links.js';
import smartLearnLogo from '../../assets/projectlogo/projLogo.png'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdKeyboardArrowDown } from "react-icons/md"
const Navbar=()=>{
    const { token } = useSelector((state) => state.auth || {});
    const { user } = useSelector((state) => state.profile || {});
    const { totalItems } = useSelector((state) => state.cart || { totalItems: 0 });
    const location = useLocation();
    const [subLinks]=useState([]);
    const [loading]=useState(false);
    // const [subLinks,setSubLinks]=useState([]);
    // const [loading,setLoading]=useState(false);
    
    const matchRoute = (route) => {
        if (route && typeof route === 'string') {
          return matchPath({ path: route }, location.pathname);
        }
        return null; // Return null if route is invalid
      };
    // const [showNavbar, setShowNavbar] = useState('top');
    const [showNavbar] = useState('top');
    return(
        <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-all ${showNavbar} `}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
            <Link to="/">
            <img src={smartLearnLogo} width={80} height={80} loading='lazy'/>
            </Link>
            <ul className='hidden sm:flex gap-x-6 text-richblack-25'>
                {
                     NavbarLinks.map((link,index)=>(
                        <li key={index}>
                            {
                                link.title==="Directory"?(
                                <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/directory/:directoryName")
                                    ? "bg-yellow-25 text-black rounded-xl p-1 px-3"
                                    : "text-richblack-25 rounded-xl p-1 px-3"
                                    }`}
                                >
                                    <p>{link.title}</p>
                                    <MdKeyboardArrowDown />
                                    {/* drop down menu */}
                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                    flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                                                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                                    >
                                        <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                        {loading ? (<p className="text-center ">Loading...</p>)
                                                    : subLinks.length ? (
                                                        <>
                                                            {subLinks?.map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                >
                                                                    <p>{subLink.name}</p>
                                                                </Link>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <p className="text-center">No Courses Found</p>
                                                    )}
                                    </div>
                                </div>
                                ):(
                                    <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3 `}>
                                        {link.title}
                                    </p>
                                </Link>)  
                            }
                        </li>
                     ))
                }

            </ul>
            {/* Login/SignUp/Dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType !=="Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                             <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-2 duration-200" />
                                {totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )}
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to="/login">
                            <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md 
                                 ${matchRoute('/login') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}
                                 >
                                Log in
                            </button>
                        </Link>
                    )
                }
                {/* {
                    token===null && (
                        <Link to="/signup">
                            <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md 
                                 ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}
                                >
                                    Sign Up
                                </button>
                        </Link>
                    )
                } */}
                 {/* for large devices */}
                 {/* {token !== null && <ProfileDropDown />} */}

                 {/* for small devices */}
                 {/* {token !== null && <MobileProfileDropDown />} */}
            </div>
            </div>
        </nav>
    )
}
export default Navbar