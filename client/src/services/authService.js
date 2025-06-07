import api from './api';

// Register a new user
export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
    localStorage.setItem('token', response.data.data.token);
  }

  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await api.post('/users/login', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
    localStorage.setItem('token', response.data.data.token);
  }

  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
  }

  return response.data;
};