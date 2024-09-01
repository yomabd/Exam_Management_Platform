import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://exam-management-platform.onrender.com',
  baseURL: 'http://localhost:3005',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
