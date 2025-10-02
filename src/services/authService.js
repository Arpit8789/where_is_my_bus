import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';
import { mockUsers } from '@/utils/mockData';

// Check if mock mode is enabled
const isMockMode = apiConfig.mockMode;

// Login
export const login = async (credentials) => {
  if (isMockMode) {
    // Mock login
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    
    const user = mockUsers.find(u => u.email === credentials.email);
    if (user) {
      return {
        success: true,
        data: {
          user,
          token: 'mock-token-' + Date.now(),
        },
      };
    }
    throw new Error('Invalid credentials');
  }

  return api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

// Register
export const register = async (userData) => {
  if (isMockMode) {
    // Mock registration
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newUser = {
      id: 'user-' + Date.now(),
      ...userData,
      joinedDate: new Date().toISOString(),
      trustScore: 0,
      points: 0,
    };

    return {
      success: true,
      data: {
        user: newUser,
        token: 'mock-token-' + Date.now(),
      },
    };
  }

  return api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

// Logout
export const logout = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true };
  }

  return api.post(API_ENDPOINTS.AUTH.LOGOUT);
};

// Get user profile
export const getProfile = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, data: mockUsers[0] };
  }

  return api.get(API_ENDPOINTS.AUTH.PROFILE);
};

// Update user profile
export const updateProfile = async (userId, updates) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.id === userId);
    return { success: true, data: { ...user, ...updates } };
  }

  return api.put(API_ENDPOINTS.AUTH.PROFILE, updates);
};

export default {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
};
