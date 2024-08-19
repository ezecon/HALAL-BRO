import axios from 'axios';

const API_URL = 'https://halal-bro-server.vercel.app/api/v2/auth';

// Register user
export const registerUser = async (email, password, displayName) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, displayName });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user with email/password
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user with Google
export const loginWithGoogle = async (idToken) => {
  try {
    const response = await axios.post(`${API_URL}/google-signin`, { idToken });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
