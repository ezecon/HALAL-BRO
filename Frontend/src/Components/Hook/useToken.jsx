import { useState, useEffect } from "react";

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    console.log('Retrieved token from localStorage:', tokenString); // Debugging line
    return tokenString;
  };

  const [token, setToken] = useState(() => getToken()); // Initialize state

  useEffect(() => {
    console.log('Token state updated:', token); // Debugging line
  }, [token]);

  const saveToken = (userToken) => {
    console.log('Saving token:', userToken); // Debugging line
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    console.log('Removing token'); // Debugging line
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
};
