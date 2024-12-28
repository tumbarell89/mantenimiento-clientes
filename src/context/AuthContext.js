import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken && storedUserId) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const login = (newToken, newUserId) => {
    setIsAuthenticated(true);
    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

