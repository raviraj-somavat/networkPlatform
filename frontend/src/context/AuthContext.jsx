import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Sign up action
  const signUp = async (formData) => {
    try {
      const response = await api.post('/auth/signup', formData);
      const data = response.data;
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.msg || error.response?.data?.message || error.message || 'Signup failed';
      return { success: false, error: message };
    }
  };

  // Sign in action
  const signIn = async (credentials) => {
    try {
      const response = await api.post('/auth/signin', credentials);
      const data = response.data;
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.msg || error.response?.data?.message || error.message || 'Sign in failed';
      return { success: false, error: message };
    }
  };

  // Sign out action
  const signOut = async () => {
    try {
      await api.get('/auth/signout');
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
