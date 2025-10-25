import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome } from 'react-icons/fa';              
import { MdWorkOutline } from 'react-icons/md';        
import { AiOutlineHistory, AiOutlineUsergroupAdd } from 'react-icons/ai';  
import { RiFileList3Line } from 'react-icons/ri';      
import { IoMdPeople } from 'react-icons/io';           
import { BsFileEarmarkText, BsChatDots } from 'react-icons/bs'; 
import { CgProfile } from "react-icons/cg";

import Logo from '../Shared/Logo';
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-purple-800 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden text-white font-semibold">Dashboard</div>
                </div>

                {/* Page content here */}
                <div className="bg-purple-300 min-h-screen">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-purple-800 text-white min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <div className="mb-6 p-4">
                        <Logo />
                    </div>
                    
                    {/* Common Links for all roles */}
                    <li className="mb-2">
                        <NavLink 
                            to="/dashboard"
                            end
                            className={({ isActive }) => 
                                `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-purple-600 text-white shadow-lg' 
                                        : 'hover:bg-purple-700/50 text-purple-100'
                                }`
                            }
                        >
                            <FaHome className="text-lg mr-3" />
                            Home
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink 
                            to="/dashboard/profile"
                            className={({ isActive }) => 
                                `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-purple-600 text-white shadow-lg' 
                                        : 'hover:bg-purple-700/50 text-purple-100'
                                }`
                            }
                        >
                            <CgProfile className="text-lg mr-3" />
                            Profile
                        </NavLink>
                    </li>

                    {/* Employee Specific Links */}
                    {!roleLoading && role === 'Employee' && (
                        <>
                            <li className="mb-2">
                                <NavLink 
                                    to="/dashboard/worksheet"
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-purple-600 text-white shadow-lg' 
                                                : 'hover:bg-purple-700/50 text-purple-100'
                                        }`
                                    }
                                >
                                    <MdWorkOutline className="text-lg mr-3" />
                                    WorkSheet
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/dashboard/paymenthistory"
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-purple-600 text-white shadow-lg' 
                                                : 'hover:bg-purple-700/50 text-purple-100'
                                        }`
                                    }
                                >
                                    <AiOutlineHistory className="text-lg mr-3" />
                                    Payment History
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* HR Specific Links */}
                    {!roleLoading && role === 'HR' && (
                        <>
                            <li className="mb-2">
                                <NavLink 
                                    to="/dashboard/employeelist"
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-purple-600 text-white shadow-lg' 
                                                : 'hover:bg-purple-700/50 text-purple-100'
                                        }`
                                    }
                                >
                                    <AiOutlineUsergroupAdd className="text-lg mr-3" />
                                    Employee List
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/dashboard/progress"
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-purple-600 text-white shadow-lg' 
                                                : 'hover:bg-purple-700/50 text-purple-100'
                                        }`
                                    }
                                >
                                    <RiFileList3Line className="text-lg mr-3" />
                                    Progress
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Admin Specific Links */}
                    {!roleLoading && role === 'Admin' && (
                        <>
                            <li className="mb-2">
                                <NavLink 
                                    to="/dashboard/allemployeelist"
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-purple-600 text-white shadow-lg' 
                                                : 'hover:bg-purple-700/50 text-purple-100'
                                        }`
                                    }
                                >
                                    <IoMdPeople className="text-lg mr-3" />
                                    All Employee List
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/dashboard/payroll"
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-purple-600 text-white shadow-lg' 
                                                : 'hover:bg-purple-700/50 text-purple-100'
                                        }`
                                    }
                                >
                                    <BsFileEarmarkText className="text-lg mr-3" />
                                    Payroll
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/dashboard/adminmessages"
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-purple-600 text-white shadow-lg' 
                                                : 'hover:bg-purple-700/50 text-purple-100'
                                        }`
                                    }
                                >
                                    <BsChatDots className="text-lg mr-3" />
                                    Messages
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;