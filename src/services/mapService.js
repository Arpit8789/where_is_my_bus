import { MAP_CONFIG } from '@/utils/constants';
import { calculateDistance, calculateETA } from '@/utils/helpers';

// Get default map center
export const getDefaultCenter = () => {
  const lat = import.meta.env.VITE_MAP_DEFAULT_CENTER_LAT || MAP_CONFIG.DEFAULT_CENTER[0];
  const lng = import.meta.env.VITE_MAP_DEFAULT_CENTER_LNG || MAP_CONFIG.DEFAULT_CENTER[1];
  return [parseFloat(lat), parseFloat(lng)];
};

// Get default zoom level
export const getDefaultZoom = () => {
  return import.meta.env.VITE_MAP_DEFAULT_ZOOM || MAP_CONFIG.DEFAULT_ZOOM;
};

// Get user's current location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

// Watch user's location
export const watchLocation = (callback, errorCallback) => {
  if (!navigator.geolocation) {
    errorCallback?.(new Error('Geolocation is not supported'));
    return null;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      callback({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      });
    },
    (error) => {
      errorCallback?.(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};

// Clear location watch
export const clearLocationWatch = (watchId) => {
  if (watchId && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};

// Calculate distance between two points
export const getDistance = (point1, point2) => {
  return calculateDistance(point1.lat, point1.lng, point2.lat, point2.lng);
};

// Calculate ETA between two points
export const getETA = (point1, point2, speedKmh = 30) => {
  const distance = getDistance(point1, point2);
  return calculateETA(distance, speedKmh);
};

// Find nearest bus stop
export const findNearestStop = (userLocation, stops) => {
  if (!stops || stops.length === 0) return null;

  let nearest = stops[0];
  let minDistance = getDistance(userLocation, { lat: stops[0].lat, lng: stops[0].lng });

  stops.forEach((stop) => {
    const distance = getDistance(userLocation, { lat: stop.lat, lng: stop.lng });
    if (distance < minDistance) {
      minDistance = distance;
      nearest = stop;
    }
  });

  return { stop: nearest, distance: minDistance };
};

// Check if location is within bounds
export const isLocationInBounds = (location, bounds) => {
  const { lat, lng } = location;
  const { north, south, east, west } = bounds;
  
  return lat <= north && lat >= south && lng <= east && lng >= west;
};

// Generate route polyline coordinates
export const generateRoutePolyline = (stops) => {
  return stops.map(stop => [stop.lat, stop.lng]);
};

// Create map bounds from points
export const createBounds = (points) => {
  if (!points || points.length === 0) return null;

  let north = points[0].lat;
  let south = points[0].lat;
  let east = points[0].lng;
  let west = points[0].lng;

  points.forEach(point => {
    if (point.lat > north) north = point.lat;
    if (point.lat < south) south = point.lat;
    if (point.lng > east) east = point.lng;
    if (point.lng < west) west = point.lng;
  });

  return { north, south, east, west };
};

// Simulate bus movement (for demo purposes)
export const simulateBusMovement = (currentLocation, destination, speedKmh = 30) => {
  const distance = getDistance(currentLocation, destination);
  const timeInHours = distance / speedKmh;
  const steps = Math.ceil(timeInHours * 60); // Steps in minutes

  const latStep = (destination.lat - currentLocation.lat) / steps;
  const lngStep = (destination.lng - currentLocation.lng) / steps;

  return (currentStep) => {
    if (currentStep >= steps) return destination;
    
    return {
      lat: currentLocation.lat + (latStep * currentStep),
      lng: currentLocation.lng + (lngStep * currentStep),
    };
  };
};

// Geocode address to coordinates (mock implementation)
export const geocodeAddress = async (address) => {
  // In real implementation, use geocoding API
  // For now, return mock coordinates
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    lat: 28.6139,
    lng: 77.2090,
    address: address,
  };
};

// Reverse geocode coordinates to address (mock implementation)
export const reverseGeocode = async (lat, lng) => {
  // In real implementation, use reverse geocoding API
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    address: 'Mock Address, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
  };
};

export default {
  getDefaultCenter,
  getDefaultZoom,
  getCurrentLocation,
  watchLocation,
  clearLocationWatch,
  getDistance,
  getETA,
  findNearestStop,
  isLocationInBounds,
  generateRoutePolyline,
  createBounds,
  simulateBusMovement,
  geocodeAddress,
  reverseGeocode,
};
