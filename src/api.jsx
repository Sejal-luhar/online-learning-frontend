import axios from 'axios';

const API = axios.create({
  baseURL: 'https://online-learning-backend-683d.onrender.com', // Adjust the base URL to your backend
  withCredentials: true,  // Important if you're using sessions or cookies for authentication
});

export default API;
