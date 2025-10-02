import { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle, MapPin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { startRoute, pauseRoute, completeRoute, checkInAtStop } from '@/services/driverService';
import { getAllRoutes } from '@/services/busService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BaseMap from '@/components/map/BaseMap';
import MapMarker from '@/components/map/MapMarker';
import RouteControl from '@/driver/components/RouteControl';
import StopsList from '@/driver/components/StopsList';
import { ROUTE_STATUS } from '@/utils/constants';

const ActiveRoute = () => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeStatus, setRouteStatus] = useState(ROUTE_STATUS.ACTIVE);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [checkedStops, setCheckedStops] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const response = await getAllRoutes();
      setRoutes(response.data);
      if (response.data.length > 0) {
        setSelectedRoute(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    }
  };

  const handleStartRoute = async () => {
    try {
      await startRoute(user.id, { routeId: selectedRoute.id });
      setRouteStatus(ROUTE_STATUS.ACTIVE);
      toast.success('Route started successfully!');
    } catch (error) {
      toast.error('Failed to start route');
    }
  };

  const handlePauseRoute = async () => {
    try {
      await pauseRoute(user.id);
      setRouteStatus(ROUTE_STATUS.PAUSED);
      toast.success('Route paused');
    } catch (error) {
      toast.error('Failed to pause route');
    }
  };

  const handleCompleteRoute = async () => {
    try {
      await completeRoute(user.id);
      setRouteStatus(ROUTE_STATUS.COMPLETED);
      setCheckedStops([]);
      setCurrentStopIndex(0);
      toast.success('Route completed! Great job! 🎉');
    } catch (error) {
      toast.error('Failed to complete route');
    }
  };

  const handleCheckIn = async (stop) => {
    try {
      await checkInAtStop(user.id, stop.id);
      setCheckedStops([...checkedStops, stop.id]);
      setCurrentStopIndex(currentStopIndex + 1);
      toast.success(`Checked in at ${stop.name}`);
      setShowSidebar(false); // Close sidebar after check-in on mobile
    } catch (error) {
      toast.error('Failed to check in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-gray-900">Active Route</h1>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {showSidebar ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Desktop Title */}
        <div className="hidden lg:block flex-1 p-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Active Route Management
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Mobile Overlay / Desktop Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <>
              {/* Mobile Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSidebar(false)}
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              />

              {/* Sidebar Content */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="lg:hidden fixed inset-y-0 left-0 w-80 bg-white overflow-y-auto z-50 shadow-2xl"
              >
                <div className="p-4 space-y-4">
                  {/* Close Button */}
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-xl font-bold">Route Details</h2>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Route Controls */}
                  <Card>
                    <h2 className="text-base font-semibold mb-4">Route Controls</h2>
                    <RouteControl
                      status={routeStatus}
                      onStart={handleStartRoute}
                      onPause={handlePauseRoute}
                      onComplete={handleCompleteRoute}
                    />
                  </Card>

                  {/* Route Info */}
                  <Card>
                    <h2 className="text-base font-semibold mb-4">Route Info</h2>
                    {selectedRoute && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-600">Route Number</p>
                          <p className="font-semibold text-base">{selectedRoute.routeNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Route Name</p>
                          <p className="font-medium text-sm">{selectedRoute.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-600">Distance</p>
                            <p className="font-medium text-sm">{selectedRoute.distance} km</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Stops</p>
                            <p className="font-medium text-sm">{selectedRoute.stops.length}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Stops Checklist */}
                  <Card>
                    <h2 className="text-base font-semibold mb-4">Stops Checklist</h2>
                    {selectedRoute && (
                      <StopsList
                        stops={selectedRoute.stops}
                        checkedStops={checkedStops}
                        currentStopIndex={currentStopIndex}
                        onCheckIn={handleCheckIn}
                        disabled={routeStatus !== ROUTE_STATUS.ACTIVE}
                      />
                    )}
                  </Card>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar - Always Visible */}
        <div className="hidden lg:block lg:w-96 bg-white border-r overflow-y-auto h-screen sticky top-0">
          <div className="p-6 space-y-4">
            {/* Route Controls */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">Route Controls</h2>
              <RouteControl
                status={routeStatus}
                onStart={handleStartRoute}
                onPause={handlePauseRoute}
                onComplete={handleCompleteRoute}
              />
            </Card>

            {/* Route Info */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">Route Info</h2>
              {selectedRoute && (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Route Number</p>
                    <p className="font-semibold text-lg">{selectedRoute.routeNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Route Name</p>
                    <p className="font-medium">{selectedRoute.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Distance</p>
                    <p className="font-medium">{selectedRoute.distance} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stops</p>
                    <p className="font-medium">{selectedRoute.stops.length}</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Stops Checklist */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">Stops Checklist</h2>
              {selectedRoute && (
                <StopsList
                  stops={selectedRoute.stops}
                  checkedStops={checkedStops}
                  currentStopIndex={currentStopIndex}
                  onCheckIn={handleCheckIn}
                  disabled={routeStatus !== ROUTE_STATUS.ACTIVE}
                />
              )}
            </Card>
          </div>
        </div>

        {/* Main Content - Map */}
        <div className="flex-1">
          <div className="p-2 sm:p-4 lg:p-6">
            {/* Map Card */}
            <Card padding="none" className="overflow-hidden">
              <BaseMap 
                center={selectedRoute?.stops[0] ? [selectedRoute.stops[0].lat, selectedRoute.stops[0].lng] : [28.6139, 77.2090]}
                zoom={12}
                className="h-[calc(100vh-120px)] sm:h-[calc(100vh-100px)] lg:h-[800px] w-full"
              >
                {selectedRoute?.stops.map((stop, index) => (
                  <MapMarker
                    key={stop.id}
                    position={[stop.lat, stop.lng]}
                    title={stop.name}
                    description={`Stop ${index + 1} of ${selectedRoute.stops.length}`}
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{stop.name}</p>
                      <p className="text-xs">Stop #{stop.order}</p>
                      {checkedStops.includes(stop.id) && (
                        <p className="text-xs text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Checked In
                        </p>
                      )}
                    </div>
                  </MapMarker>
                ))}
              </BaseMap>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRoute;
