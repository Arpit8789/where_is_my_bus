import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';
import { 
  mockRoutes, 
  mockBuses, 
  mockUsers, 
  mockReports, 
  mockAnalytics 
} from '@/utils/mockData';

const isMockMode = apiConfig.mockMode;

// ============= ROUTE MANAGEMENT =============

// Get all routes
export const getAllRoutes = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockRoutes };
  }

  return api.get(API_ENDPOINTS.ROUTE.GET_ALL);
};

// Create route
export const createRoute = async (routeData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newRoute = {
      id: 'route-' + Date.now(),
      ...routeData,
      createdAt: new Date().toISOString(),
    };
    return { success: true, data: newRoute };
  }

  return api.post(API_ENDPOINTS.ROUTE.CREATE, routeData);
};

// Update route
export const updateRoute = async (routeId, routeData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const route = mockRoutes.find(r => r.id === routeId);
    return { 
      success: true, 
      data: { ...route, ...routeData, updatedAt: new Date().toISOString() } 
    };
  }

  return api.put(API_ENDPOINTS.ROUTE.UPDATE(routeId), routeData);
};

// Delete route
export const deleteRoute = async (routeId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'Route deleted successfully' };
  }

  return api.delete(API_ENDPOINTS.ROUTE.DELETE(routeId));
};

// ============= DRIVER MANAGEMENT =============

// Get all drivers
export const getAllDrivers = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const drivers = mockUsers.filter(u => u.role === 'driver');
    return { success: true, data: drivers };
  }

  return api.get(API_ENDPOINTS.DRIVER.GET_ALL);
};

// Create driver
export const createDriver = async (driverData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newDriver = {
      id: 'driver-' + Date.now(),
      ...driverData,
      role: 'driver',
      createdAt: new Date().toISOString(),
      rating: 0,
      tripsCompleted: 0,
    };
    return { success: true, data: newDriver };
  }

  return api.post(API_ENDPOINTS.DRIVER.CREATE, driverData);
};

// Update driver
export const updateDriver = async (driverId, driverData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const driver = mockUsers.find(u => u.id === driverId);
    return { 
      success: true, 
      data: { ...driver, ...driverData, updatedAt: new Date().toISOString() } 
    };
  }

  return api.put(API_ENDPOINTS.DRIVER.UPDATE(driverId), driverData);
};

// Delete driver
export const deleteDriver = async (driverId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'Driver deleted successfully' };
  }

  return api.delete(API_ENDPOINTS.DRIVER.DELETE(driverId));
};

// ============= FLEET MANAGEMENT =============

// Get all buses
export const getAllBuses = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockBuses };
  }

  return api.get(API_ENDPOINTS.BUS.GET_ALL);
};

// Create bus
export const createBus = async (busData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newBus = {
      id: 'bus-' + Date.now(),
      ...busData,
      createdAt: new Date().toISOString(),
      status: 'inactive',
    };
    return { success: true, data: newBus };
  }

  return api.post(API_ENDPOINTS.BUS.CREATE, busData);
};

// Update bus
export const updateBus = async (busId, busData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const bus = mockBuses.find(b => b.id === busId);
    return { 
      success: true, 
      data: { ...bus, ...busData, updatedAt: new Date().toISOString() } 
    };
  }

  return api.put(API_ENDPOINTS.BUS.UPDATE(busId), busData);
};

// Delete bus
export const deleteBus = async (busId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'Bus deleted successfully' };
  }

  return api.delete(API_ENDPOINTS.BUS.DELETE(busId));
};

// ============= USER MANAGEMENT =============

// Get all users
export const getAllUsers = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockUsers };
  }

  return api.get(API_ENDPOINTS.USER.GET_ALL);
};

// Update user
export const updateUser = async (userId, userData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.id === userId);
    return { 
      success: true, 
      data: { ...user, ...userData, updatedAt: new Date().toISOString() } 
    };
  }

  return api.put(API_ENDPOINTS.USER.UPDATE(userId), userData);
};

// Ban user
export const banUser = async (userId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'User banned successfully' };
  }

  return api.post(API_ENDPOINTS.USER.BAN(userId));
};

// Unban user
export const unbanUser = async (userId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'User unbanned successfully' };
  }

  return api.post(API_ENDPOINTS.USER.UNBAN(userId));
};

// Update trust score
export const updateTrustScore = async (userId, score) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: { userId, trustScore: score } };
  }

  return api.put(API_ENDPOINTS.USER.UPDATE_TRUST_SCORE(userId), { score });
};

// ============= REPORT MANAGEMENT =============

// Get all reports
export const getAllReports = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockReports };
  }

  return api.get(API_ENDPOINTS.REPORT.GET_ALL);
};

// Validate report (approve/reject)
export const validateReport = async (reportId, validation) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const report = mockReports.find(r => r.id === reportId);
    return {
      success: true,
      data: {
        ...report,
        status: validation.status,
        validatedBy: 'admin@whereismybus.com',
        validatedAt: new Date().toISOString(),
      },
    };
  }

  return api.post(API_ENDPOINTS.REPORT.VALIDATE(reportId), validation);
};

// Delete report
export const deleteReport = async (reportId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: 'Report deleted successfully' };
  }

  return api.delete(API_ENDPOINTS.REPORT.DELETE(reportId));
};

// ============= ANALYTICS =============

// Get dashboard stats
export const getDashboardStats = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: mockAnalytics.dashboardStats };
  }

  return api.get(API_ENDPOINTS.ANALYTICS.DASHBOARD_STATS);
};

// Get user growth data
export const getUserGrowth = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockAnalytics.userGrowth };
  }

  return api.get(API_ENDPOINTS.ANALYTICS.USER_GROWTH);
};

// Get route popularity data
export const getRoutePopularity = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockAnalytics.routePopularity };
  }

  return api.get(API_ENDPOINTS.ANALYTICS.ROUTE_POPULARITY);
};

// Get reports timeline data
export const getReportsTimeline = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockAnalytics.reportsTimeline };
  }

  return api.get(API_ENDPOINTS.ANALYTICS.REPORTS_TIMELINE);
};

export default {
  // Routes
  getAllRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
  // Drivers
  getAllDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  // Fleet
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
  // Users
  getAllUsers,
  updateUser,
  banUser,
  unbanUser,
  updateTrustScore,
  // Reports
  getAllReports,
  validateReport,
  deleteReport,
  // Analytics
  getDashboardStats,
  getUserGrowth,
  getRoutePopularity,
  getReportsTimeline,
};
