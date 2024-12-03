import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CourseDetail from './components/CourseDetail';
import AboutUs from './components/AboutUs';
import MyCourses from './pages/MyCourse';

const App = () => {
  const navigate=useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by verifying the token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  

  const handleAuthentication = (status) => {
    // Function to dynamically update the authentication state
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate("/auth")
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/auth" 
          element={<Login onLogin={() => handleAuthentication(true)} />} 
        />
        
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Profile onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
                <Route path="/my-courses" element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
              <MyCourses onLogout={handleLogout} />
            </PrivateRoute>} />

              <Route path="/courses/:courseId" element={<CourseDetail />} /> {/* Route to view a single course */}
              <Route path="/about-us" element={<AboutUs />} /> {/* Route to view a single course */}


      </Routes>
    </>
  );
};

export default App;
