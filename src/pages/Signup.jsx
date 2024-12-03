import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Ensure this API instance is correctly set up

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is 'student'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log("Signup data:", { username, email, password, role }); // Log the data being sent

    try {
      // API call to signup endpoint
      const response = await API.post('/auth/signup', { username, email, password, role });

      console.log('Signup successful:', response.data);

      // Redirect to login page on success
      navigate('/auth');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);

      // Set appropriate error message
      if (err.response?.data?.message) {
        setError(err.response.data.message); // Use error message from response
      } else if (err.response?.status === 400) {
        setError('Bad Request: Please check your input.');
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

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

          {/* Role Selection */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {error}
          </div>
        )}

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/auth')}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
