import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit } from 'react-icons/fa';
import Logo from '../Shared/Logo';

const DashboardLayout = () => {
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
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <Logo></Logo>
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/worksheet">
                            <FaBoxOpen className="inline-block mr-2" />
                            WorkSheet
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/employeelist'>
                            <FaBoxOpen className="inline-block mr-2"/>
                            Employee List
                        </NavLink>
                    </li>
                   <li>
                        <NavLink to="/dashboard/allemployeelist">
                            <FaBoxOpen className="inline-block mr-2" />
                            All Emplyee List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/progress">
                            <FaBoxOpen className="inline-block mr-2" />
                           Progress
                        </NavLink>
                    </li>
                   

                 
                   
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;