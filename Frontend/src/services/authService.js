import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v2/auth';

// Register user
export const registerUser = async (email, password, displayName) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, displayName });
    return response.data;
  } catch (error) {
    // Ensure error.response.data is defined
    const errorMessage = error.response?.data?.msg || 'Registration failed';
    throw new Error(errorMessage);
  }
};

// Login user with email/password
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Handle token as per your storage method
    // localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    // Ensure error.response.data is defined
    const errorMessage = error.response?.data?.msg || 'Login failed';
    throw new Error(errorMessage);
  }
};

// Login user with Google
export const loginWithGoogle = async (idToken) => {
  try {
    const response = await axios.post(`${API_URL}/google-signin`, { idToken });
    // Handle token as per your storage method
    // localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    // Ensure error.response.data is defined
    const errorMessage = error.response?.data?.msg || 'Google login failed';
    throw new Error(errorMessage);
  }
};
