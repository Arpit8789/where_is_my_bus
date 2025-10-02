import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS, USER_ROLES, ROUTES } from '@/utils/constants';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/helpers';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = getLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
    const storedUser = getLocalStorage(STORAGE_KEYS.USER_DATA);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      // This will be replaced with actual API call
      // For now, mock login based on email
      const { email, password } = credentials;

      // Mock validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Mock user data based on role
      let mockUser;
      let mockToken = 'mock-jwt-token-' + Date.now();

      if (email.includes('admin')) {
        mockUser = {
          id: '3',
          name: 'Admin User',
          email: email,
          role: USER_ROLES.ADMIN,
        };
      } else if (email.includes('driver')) {
        mockUser = {
          id: '2',
          name: 'Rahul Kumar',
          email: email,
          role: USER_ROLES.DRIVER,
          licenseNumber: 'DL1420110012345',
        };
      } else {
        mockUser = {
          id: '1',
          name: 'Arpit Anand',
          email: email,
          role: USER_ROLES.PASSENGER,
          trustScore: 450,
          points: 1250,
        };
      }

      // Save to state and localStorage
      setToken(mockToken);
      setUser(mockUser);
      setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      setLocalStorage(STORAGE_KEYS.USER_DATA, mockUser);

      toast.success('Logged in successfully!');

      // Redirect based on role
      if (mockUser.role === USER_ROLES.ADMIN) {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (mockUser.role === USER_ROLES.DRIVER) {
        navigate(ROUTES.DRIVER_DASHBOARD);
      } else {
        navigate(ROUTES.PASSENGER_DASHBOARD);
      }

      return { success: true, user: mockUser };
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const { name, email, password, phone, role } = userData;

      // Mock validation
      if (!name || !email || !password || !phone) {
        throw new Error('All fields are required');
      }

      // Mock registration
      const mockUser = {
        id: 'user-' + Date.now(),
        name,
        email,
        phone,
        role: role || USER_ROLES.PASSENGER,
        trustScore: 0,
        points: 0,
        joinedDate: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      setToken(mockToken);
      setUser(mockUser);
      setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      setLocalStorage(STORAGE_KEYS.USER_DATA, mockUser);

      toast.success('Account created successfully!');
      navigate(ROUTES.PASSENGER_DASHBOARD);

      return { success: true, user: mockUser };
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    removeLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
    removeLocalStorage(STORAGE_KEYS.USER_DATA);
    toast.success('Logged out successfully!');
    navigate(ROUTES.HOME);
  };

  // Update user profile
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setLocalStorage(STORAGE_KEYS.USER_DATA, updatedUser);
    toast.success('Profile updated successfully!');
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
