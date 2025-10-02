// API Configuration - CHANGE THIS FILE WHEN BACKEND IS READY

// Get environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },

  // Bus endpoints
  BUS: {
    GET_ALL: '/buses',
    GET_BY_ID: (id) => `/buses/${id}`,
    GET_BY_ROUTE: (routeId) => `/buses/route/${routeId}`,
    TRACK: (busId) => `/buses/${busId}/track`,
    GET_ETA: (busId, stopId) => `/buses/${busId}/eta/${stopId}`,
  },

  // Route endpoints
  ROUTE: {
    GET_ALL: '/routes',
    GET_BY_ID: (id) => `/routes/${id}`,
    CREATE: '/routes',
    UPDATE: (id) => `/routes/${id}`,
    DELETE: (id) => `/routes/${id}`,
    GET_STOPS: (id) => `/routes/${id}/stops`,
  },

  // Driver endpoints
  DRIVER: {
    GET_ALL: '/drivers',
    GET_BY_ID: (id) => `/drivers/${id}`,
    CREATE: '/drivers',
    UPDATE: (id) => `/drivers/${id}`,
    DELETE: (id) => `/drivers/${id}`,
    START_ROUTE: (driverId) => `/drivers/${driverId}/route/start`,
    PAUSE_ROUTE: (driverId) => `/drivers/${driverId}/route/pause`,
    COMPLETE_ROUTE: (driverId) => `/drivers/${driverId}/route/complete`,
    CHECK_IN: (driverId, stopId) => `/drivers/${driverId}/checkin/${stopId}`,
    GET_PERFORMANCE: (driverId) => `/drivers/${driverId}/performance`,
  },

  // Report endpoints
  REPORT: {
    GET_ALL: '/reports',
    GET_BY_ID: (id) => `/reports/${id}`,
    CREATE: '/reports',
    UPDATE: (id) => `/reports/${id}`,
    DELETE: (id) => `/reports/${id}`,
    VALIDATE: (id) => `/reports/${id}/validate`,
    GET_USER_REPORTS: (userId) => `/reports/user/${userId}`,
  },

  // Reward endpoints
  REWARD: {
    GET_USER_POINTS: (userId) => `/rewards/${userId}/points`,
    GET_LEADERBOARD: '/rewards/leaderboard',
    GET_BADGES: (userId) => `/rewards/${userId}/badges`,
    GET_CHALLENGES: '/rewards/challenges',
    CLAIM_REWARD: (userId, rewardId) => `/rewards/${userId}/claim/${rewardId}`,
  },

  // User endpoints
  USER: {
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    BAN: (id) => `/users/${id}/ban`,
    UNBAN: (id) => `/users/${id}/unban`,
    UPDATE_TRUST_SCORE: (id) => `/users/${id}/trust-score`,
  },

  // Message endpoints
  MESSAGE: {
    GET_ALL: (driverId) => `/messages/${driverId}`,
    SEND: '/messages',
    BULK_SEND: '/messages/bulk',
  },

  // Analytics endpoints
  ANALYTICS: {
    DASHBOARD_STATS: '/analytics/dashboard',
    USER_GROWTH: '/analytics/user-growth',
    ROUTE_POPULARITY: '/analytics/route-popularity',
    REPORTS_TIMELINE: '/analytics/reports-timeline',
    DRIVER_PERFORMANCE: '/analytics/driver-performance',
  },
};

// Export configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  mockMode: MOCK_MODE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default apiConfig;
