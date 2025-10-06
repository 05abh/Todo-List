import React, { createContext, useState, useEffect } from 'react';
import { authAPI, securityUtils } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = securityUtils.getToken();
    if (token) {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.data.user);
      } catch (error) {
        securityUtils.removeToken();
      }
    }
    setLoading(false);
  };

  const login = async (userData) => {
    try {
      const response = await authAPI.login(userData);
      const { user, token } = response.data.data;
      
      securityUtils.setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { user, token } = response.data.data;
      
      securityUtils.setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    securityUtils.removeToken();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};