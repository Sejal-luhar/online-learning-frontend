import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/auth'); // Redirect to login if user is not logged in
    } else {
      setUser(user); // Set the user data to state
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    localStorage.removeItem('token'); // Clear token (if used)
    navigate('/auth'); // Redirect to login page
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      <Navbar/>
      <div className='flex'>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-md h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className="text-white hover:text-blue-800 font-medium"
              onClick={() => navigate('/profile')}
            >
              My Profile
            </button>
          </li>
      
        
          <li>
            <button
              className="text-white hover:text-blue-800 font-medium"
              onClick={() => navigate('/about-us')}
            >
              About us
            </button>
          </li>
          <li>
            <button
              className="text-red-600 hover:text-red-800 font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username || 'User'}</h1>
          <p className="text-gray-600 mb-4">Email: {user?.email}</p>
          {/* Profile Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Course Progress</h2>
              <p>Your progress in the latest enrolled courses will appear here.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Messages</h2>
              <p>Check your messages and notifications from instructors or peers.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default Profile;
