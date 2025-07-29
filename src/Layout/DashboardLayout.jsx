import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome } from 'react-icons/fa';              
import { MdWorkOutline } from 'react-icons/md';        
import { AiOutlineHistory, AiOutlineUsergroupAdd } from 'react-icons/ai';  
import { RiFileList3Line } from 'react-icons/ri';      
import { IoMdPeople } from 'react-icons/io';           
import { BsFileEarmarkText, BsChatDots } from 'react-icons/bs'; 

import Logo from '../Shared/Logo';
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
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
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                </div>

                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <Logo />
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    {!roleLoading && role === 'Employee' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/worksheet">
                                    <MdWorkOutline className="inline-block mr-2" />
                                    WorkSheet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymenthistory">
                                    <AiOutlineHistory className="inline-block mr-2" />
                                    Payment History
                                </NavLink>
                            </li>
                        </>
                    )}
                    {!roleLoading && role === 'HR' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/employeelist">
                                    <AiOutlineUsergroupAdd className="inline-block mr-2" />
                                    Employee List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/progress">
                                    <RiFileList3Line className="inline-block mr-2" />
                                    Progress
                                </NavLink>
                            </li>
                        </>
                    )}
                    {!roleLoading && role === 'Admin' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/allemployeelist">
                                    <IoMdPeople className="inline-block mr-2" />
                                    All Employee List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payroll">
                                    <BsFileEarmarkText className="inline-block mr-2" />
                                    Payroll
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminmessages">
                                    <BsChatDots className="inline-block mr-2" />
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
