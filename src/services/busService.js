import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';
import { mockBuses, mockRoutes } from '@/utils/mockData';

const isMockMode = apiConfig.mockMode;

// Get all buses
export const getAllBuses = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: mockBuses };
  }

  return api.get(API_ENDPOINTS.BUS.GET_ALL);
};

// Get bus by ID
export const getBusById = async (busId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const bus = mockBuses.find(b => b.id === busId);
    return { success: true, data: bus };
  }

  return api.get(API_ENDPOINTS.BUS.GET_BY_ID(busId));
};

// Get buses by route
export const getBusesByRoute = async (routeId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const buses = mockBuses.filter(b => b.routeId === routeId);
    return { success: true, data: buses };
  }

  return api.get(API_ENDPOINTS.BUS.GET_BY_ROUTE(routeId));
};

// Track bus
export const trackBus = async (busId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const bus = mockBuses.find(b => b.id === busId);
    return { success: true, data: bus };
  }

  return api.get(API_ENDPOINTS.BUS.TRACK(busId));
};

// Get ETA for bus at stop
export const getBusETA = async (busId, stopId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const bus = mockBuses.find(b => b.id === busId);
    return { 
      success: true, 
      data: { 
        eta: bus?.eta || 10,
        distance: 2.5,
        status: bus?.status,
      } 
    };
  }

  return api.get(API_ENDPOINTS.BUS.GET_ETA(busId, stopId));
};

// Get all routes
export const getAllRoutes = async () => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, data: mockRoutes };
  }

  return api.get(API_ENDPOINTS.ROUTE.GET_ALL);
};

// Get route by ID
export const getRouteById = async (routeId) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const route = mockRoutes.find(r => r.id === routeId);
    return { success: true, data: route };
  }

  return api.get(API_ENDPOINTS.ROUTE.GET_BY_ID(routeId));
};

// Search buses by route number or name
export const searchBuses = async (query) => {
  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const filtered = mockBuses.filter(bus => 
      bus.routeNumber.toLowerCase().includes(query.toLowerCase()) ||
      bus.currentStop.toLowerCase().includes(query.toLowerCase())
    );
    return { success: true, data: filtered };
  }

  return api.get(`${API_ENDPOINTS.BUS.GET_ALL}?search=${query}`);
};

export default {
  getAllBuses,
  getBusById,
  getBusesByRoute,
  trackBus,
  getBusETA,
  getAllRoutes,
  getRouteById,
  searchBuses,
};
