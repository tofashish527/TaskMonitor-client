import React from 'react';
import { NavLink } from 'react-router';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    logout()
      .then(() => console.log("Log Out Successfully!"))
      .catch((error) => console.log(error));
  };

  const navlinks = <>
    <li><NavLink to="/">Home</NavLink></li>
    {user && <>
    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    <li><NavLink to="/contact">Contact Us</NavLink></li>
    </>}
  </>;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left: Logo + Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navlinks}
          </ul>
        </div>
        <Logo />
      </div>

      {/* Center: Navlinks for large screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navlinks}
        </ul>
      </div>

      {/* Right: Conditional Auth */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-lime-400 ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} />
              </div>
            </div>
            <ul tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
              <li>
                <button onClick={handleLogOut} className="text-red-500 text-lg bg-gray-200 font-bold hover:text-white hover:bg-blue-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/register" className={({ isActive }) =>
              isActive
                ? "btn btn-outline bg-lime-400 text-black"
                : "btn btn-outline hover:bg-lime-400 hover:text-black"
            }>
              Register
            </NavLink>
            <NavLink to="/login" className={({ isActive }) =>
              isActive
                ? "btn btn-outline bg-lime-400 text-black"
                : "btn btn-outline hover:bg-lime-400 hover:text-black"
            }>
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


