import React, { useState } from 'react';

const AuthForm = ({ onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
