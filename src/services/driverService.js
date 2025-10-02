import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';
import { mockDriverPerformance, mockMessages } from '@/utils/mockData';
import { ROUTE_STATUS } from '@/utils/constants';

const isMockMode = apiConfig.mockMode;

// Start route
export const startRoute = async (driverId, routeData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      data: {
        routeId: 'route-' + Date.now(),
        status: ROUTE_STATUS.ACTIVE,
        startTime: new Date().toISOString(),
      },
    };
  }

  return api.post(API_ENDPOINTS.DRIVER.START_ROUTE(driverId), routeData);
};

// Pause route
export const pauseRoute = async (driverId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: { status: ROUTE_STATUS.PAUSED },
    };
  }

  return api.post(API_ENDPOINTS.DRIVER.PAUSE_ROUTE(driverId));
};

// Complete route
export const completeRoute = async (driverId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      data: {
        status: ROUTE_STATUS.COMPLETED,
        endTime: new Date().toISOString(),
      },
    };
  }

  return api.post(API_ENDPOINTS.DRIVER.COMPLETE_ROUTE(driverId));
};

// Check in at stop
export const checkInAtStop = async (driverId, stopId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      data: {
        stopId,
        checkedInAt: new Date().toISOString(),
      },
    };
  }

  return api.post(API_ENDPOINTS.DRIVER.CHECK_IN(driverId, stopId));
};

// Get driver performance
export const getDriverPerformance = async (driverId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: mockDriverPerformance };
  }

  return api.get(API_ENDPOINTS.DRIVER.GET_PERFORMANCE(driverId));
};

// Get driver messages
export const getDriverMessages = async (driverId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockMessages };
  }

  return api.get(API_ENDPOINTS.MESSAGE.GET_ALL(driverId));
};

// Send message
export const sendMessage = async (messageData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: {
        id: 'msg-' + Date.now(),
        ...messageData,
        timestamp: new Date().toISOString(),
      },
    };
  }

  return api.post(API_ENDPOINTS.MESSAGE.SEND, messageData);
};

// Send bulk message
export const sendBulkMessage = async (messageData) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      data: {
        messagesSent: 42,
        timestamp: new Date().toISOString(),
      },
    };
  }

  return api.post(API_ENDPOINTS.MESSAGE.BULK_SEND, messageData);
};

export default {
  startRoute,
  pauseRoute,
  completeRoute,
  checkInAtStop,
  getDriverPerformance,
  getDriverMessages,
  sendMessage,
  sendBulkMessage,
};
