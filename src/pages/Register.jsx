import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import API from '../api';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <AuthForm onSubmit={handleRegister} buttonText="Register" />
      </div>
    </div>
  );
};

export default Register;
