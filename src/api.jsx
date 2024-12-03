import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Adjust the base URL to your backend
  withCredentials: true,  // Important if you're using sessions or cookies for authentication
});

export default API;
