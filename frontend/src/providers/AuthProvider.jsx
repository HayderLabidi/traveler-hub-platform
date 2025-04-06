
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/authService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check for token and fetch user data on mount
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          console.log('Current user data:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Authentication error:', error);
          // If token is invalid, clear it
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const { user: userData, token } = await authService.login({ email, password });
      
      console.log('Login response:', userData);
      setUser(userData);
      
      // Navigate to appropriate dashboard based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (userData.role === 'driver') {
        navigate('/driver/dashboard');
      } else {
        navigate('/passenger/dashboard');
      }

      toast({
        title: "Success!",
        description: `Welcome back, ${userData.username || email}`,
      });
      
      return userData;
    } catch (error) {
      console.error('Login error details:', error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      setUser(response.user);
      
      toast({
        title: "Success!",
        description: "Your account has been created successfully",
      });
      
      // Navigate based on role
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/passenger/dashboard');
      }
      
      return response.user;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // If still loading, show nothing
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      register,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
