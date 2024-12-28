import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiration = localStorage.getItem('expiration');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedExpiration && new Date(storedExpiration) > new Date()) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setExpiration(storedExpiration);
      setUserId(storedUserId);
      setUsername(storedUsername);
    } else {
      // Si el token ha expirado, limpiar el almacenamiento
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    }
  }, []);

  const login = (authData) => {
    setIsAuthenticated(true);
    setToken(authData.token);
    setExpiration(authData.expiration);
    setUserId(authData.userid);
    setUsername(authData.username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('expiration', authData.expiration);
    localStorage.setItem('userId', authData.userid);
    localStorage.setItem('username', authData.username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setExpiration(null);
    setUserId(null);
    setUsername(null);

    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      token, 
      expiration, 
      userId, 
      username, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

