// Application Constants

// User Roles
export const USER_ROLES = {
  PASSENGER: 'passenger',
  DRIVER: 'driver',
  ADMIN: 'admin',
};

// Bus Status
export const BUS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELAYED: 'delayed',
  BREAKDOWN: 'breakdown',
};

// Route Status
export const ROUTE_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
};

// Report Status
export const REPORT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Trust Score Levels
export const TRUST_LEVELS = {
  BEGINNER: { min: 0, max: 100, label: 'Beginner', color: 'gray' },
  BRONZE: { min: 101, max: 300, label: 'Bronze', color: 'orange' },
  SILVER: { min: 301, max: 600, label: 'Silver', color: 'gray' },
  GOLD: { min: 601, max: 1000, label: 'Gold', color: 'yellow' },
  PLATINUM: { min: 1001, max: Infinity, label: 'Platinum', color: 'purple' },
};

// Badge Types
export const BADGE_TYPES = {
  FIRST_REPORT: 'first_report',
  REPORTER_10: 'reporter_10',
  REPORTER_50: 'reporter_50',
  REPORTER_100: 'reporter_100',
  ACCURACY_MASTER: 'accuracy_master',
  DAILY_STREAK: 'daily_streak',
  COMMUNITY_HELPER: 'community_helper',
};

// Points System
export const POINTS = {
  REPORT_BUS: 10,
  VALIDATED_REPORT: 20,
  DAILY_LOGIN: 5,
  COMPLETE_CHALLENGE: 50,
  REFERRAL: 100,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: [28.6139, 77.2090], // Delhi coordinates
  DEFAULT_ZOOM: 12,
  MIN_ZOOM: 10,
  MAX_ZOOM: 18,
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// Time Formats
export const TIME_FORMATS = {
  DATE: 'dd/MM/yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
  DATETIME_FULL: 'dd MMM yyyy, hh:mm a',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  REGISTER_SUCCESS: 'Account created successfully!',
  REPORT_SUCCESS: 'Report submitted successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PASSENGER_DASHBOARD: '/dashboard',
  TRACK_BUS: '/track',
  REPORT_BUS: '/report',
  REWARDS: '/rewards',
  PROFILE: '/profile',
  DRIVER_DASHBOARD: '/driver',
  DRIVER_ROUTE: '/driver/route',
  DRIVER_MESSAGES: '/driver/messages',
  DRIVER_PERFORMANCE: '/driver/performance',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_ROUTES: '/admin/routes',
  ADMIN_DRIVERS: '/admin/drivers',
  ADMIN_FLEET: '/admin/fleet',
  ADMIN_USERS: '/admin/users',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_ANALYTICS: '/admin/analytics',
};

export default {
  USER_ROLES,
  BUS_STATUS,
  ROUTE_STATUS,
  REPORT_STATUS,
  TRUST_LEVELS,
  BADGE_TYPES,
  POINTS,
  PAGINATION,
  MAP_CONFIG,
  TIME_FORMATS,
  FILE_UPLOAD,
  STORAGE_KEYS,
  TOAST_MESSAGES,
  ROUTES,
};
