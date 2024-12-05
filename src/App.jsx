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
    const token = localStorage.getItem('token');

    // Optional: Add token expiry validation logic here
    setIsAuthenticated(!!token);

    // Redirect to login if not authenticated when accessing protected routes
    if (!token && window.location.pathname !== '/auth' && window.location.pathname !== '/signup') {
      navigate('/auth');
    }
  }, [navigate]);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/auth');
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
