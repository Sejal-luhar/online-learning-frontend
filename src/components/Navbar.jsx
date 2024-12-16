import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout', {}, { withCredentials: true }); // Ensure cookies are sent
      localStorage.clear(); // Clear local storage
      setIsAuthenticated(false); // Update authentication state
      navigate('/login'); // Redirect to login
    } catch (err) {
      console.error('Logout failed:', err);
      alert(err.response?.data?.message || 'Logout failed. Please try again.');
    }
  };
  

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-300 flex items-center hover:text-blue-300">
        <img src="https://cdn-icons-png.flaticon.com/128/3749/3749784.png" alt="" className='h-10'/>
          LearnOnline
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-blue-300">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-blue-300">
                My Profile
              </Link>
              <Link to="/about-us" className="text-gray-300 hover:text-blue-300">
                About Us
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-blue-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        {isAuthenticated && (
          <div className="relative">
            <button className="flex items-center text-white hover:text-blue-300">
              <img
                src="/public/9498757.png"
                alt="Profile"
                className="rounded-full w-10 h-10 mr-2 border border-gray-300"
              />
              <span className="hidden md:block font-medium">My Profile</span>
              <svg
                className="w-5 h-5 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white border rounded-md shadow-lg hidden group-hover:block">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                View Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white hover:text-blue-300">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
