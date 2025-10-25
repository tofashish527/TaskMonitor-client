import React from "react";
import { NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    logout()
      .then(() => console.log("Logged Out Successfully!"))
      .catch((error) => console.log(error));
  };

  const navlinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive 
              ? "text-emerald-300 bg-emerald-900/50 font-semibold py-3 px-4 rounded-lg" 
              : "text-gray-200 hover:text-emerald-300 py-3 px-4 rounded-lg hover:bg-emerald-700/30 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive 
                  ? "text-emerald-300 bg-emerald-900/50 font-semibold py-3 px-4 rounded-lg" 
                  : "text-gray-200 hover:text-emerald-300 py-3 px-4 rounded-lg hover:bg-emerald-700/30 transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </li>
          
        </>
      )}
      <li>
        <NavLink 
          to="/allfeatured" 
          className={({ isActive }) => 
            isActive 
              ? "text-emerald-300 bg-emerald-900/50 font-semibold py-3 px-4 rounded-lg" 
              : "text-gray-200 hover:text-emerald-300 py-3 px-4 rounded-lg hover:bg-emerald-700/30 transition-colors"
          }
        >
          Featured Products
        </NavLink>
      </li>
      <li>
            <NavLink 
              to="/sales-history" 
              className={({ isActive }) => 
                isActive 
                  ? "text-emerald-300 bg-emerald-900/50 font-semibold py-3 px-4 rounded-lg" 
                  : "text-gray-200 hover:text-emerald-300 py-3 px-4 rounded-lg hover:bg-emerald-700/30 transition-colors"
              }
            >
              Sales History
            </NavLink>
          </li>
      <li>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            isActive 
              ? "text-emerald-300 bg-emerald-900/50 font-semibold py-3 px-4 rounded-lg" 
              : "text-gray-200 hover:text-emerald-300 py-3 px-4 rounded-lg hover:bg-emerald-700/30 transition-colors"
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 w-full p-3 bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 shadow-lg z-50 border-b border-emerald-700">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo + Mobile Dropdown */}
          <div className="flex items-center">
            <div className="dropdown dropdown-bottom lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost text-gray-200 hover:text-emerald-300 hover:bg-emerald-700/50 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu menu-lg z-[1] mt-3 p-4 shadow bg-gradient-to-b from-emerald-800 to-green-900 rounded-box w-64 border border-emerald-700 space-y-2">
                {navlinks}
                {/* Mobile Auth Buttons */}
                {!user && (
                  <div className="flex flex-col gap-3 pt-4 border-t border-emerald-700 mt-4">
                    <NavLink 
                      to="/register" 
                      className="btn border-emerald-600 text-gray-200 bg-emerald-500/30 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-colors w-full text-center"
                    >
                      Register
                    </NavLink>
                    <NavLink 
                      to="/login" 
                      className="btn bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500 hover:border-emerald-500 transition-colors w-full text-center"
                    >
                      Login
                    </NavLink>
                  </div>
                )}
                {user && (
                  <div className="pt-4 border-t border-emerald-700 mt-4">
                    <button 
                      onClick={handleLogOut} 
                      className="w-full text-red-300 font-semibold hover:bg-red-900/50 hover:text-white transition-colors py-3 px-4 rounded-lg text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </ul>
            </div>
            <Logo />
          </div>

          {/* Center: Navlinks for large screens */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-1">{navlinks}</ul>
          </div>

          {/* Right: Auth Buttons / Avatar - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-emerald-700/50">
                  <div className="w-10 rounded-full ring ring-emerald-400 ring-offset-2 ring-offset-emerald-900">
                    <img src={user.photoURL} alt="avatar" />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow menu menu-sm bg-gradient-to-b from-emerald-800 to-green-900 rounded-box w-40 border border-emerald-700">
                  <li>
                    <button onClick={handleLogOut} className="text-red-300 font-semibold hover:bg-red-900/50 hover:text-white transition-colors">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <NavLink to="/register" className="btn border-emerald-600 text-gray-200 bg-emerald-700/30 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-colors">
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile: Show user avatar on mobile when logged in */}
          {user && (
            <div className="lg:hidden">
              <div className="dropdown dropdown-end">
                <div tabIndex={1} role="button" className="btn btn-ghost btn-circle avatar hover:bg-emerald-700/50 p-1">
                  <div className="w-8 rounded-full ring ring-emerald-400 ring-offset-2 ring-offset-emerald-900">
                    <img src={user.photoURL} alt="avatar" />
                  </div>
                </div>
                <ul tabIndex={1} className="dropdown-content menu menu-sm z-[1] mt-3 p-2 shadow bg-gradient-to-b from-emerald-800 to-green-900 rounded-box w-40 border border-emerald-700">
                  <li>
                    <button onClick={handleLogOut} className="text-red-300 font-semibold hover:bg-red-900/50 hover:text-white transition-colors">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile: Show auth buttons when not logged in */}
          {!user && (
            <div className="lg:hidden flex items-center gap-2">
              <NavLink to="/register" className="btn btn-sm border-emerald-600 text-gray-200 bg-emerald-700/30 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-colors px-3">
                Register
              </NavLink>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;