import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Ensure this API instance is set up correctly

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    setError('');
    
    try {
      const response = await API.post('/auth/login', { email, password });
      console.log('Login successful:', response.data); // Check response
      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token); // If your backend provides a token
      console.log('Login Payload:', { email, password }); // Payload being sent
console.log('Login Response:', response.data); // Server response
console.log('Redirecting to dashboard'); // Redirection check

      navigate('/dashboard'); // Redirect to dashboard
      
      
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {error}
          </div>
        )}

        {/* Redirect to Signup */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:underline"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
