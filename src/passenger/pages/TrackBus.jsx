import { useState, useEffect } from 'react';
import { Search, Navigation, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllBuses, getAllRoutes, searchBuses } from '@/services/busService';
import BaseMap from '@/components/map/BaseMap';
import MapMarker from '@/components/map/MapMarker';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import BusSearch from '@/passenger/components/BusSearch';
import BusCard from '@/passenger/components/BusCard';
import { Marker, Popup } from 'react-leaflet';

const TrackBus = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setFilteredBuses(buses);
    }
  }, [searchQuery, buses]);

  const loadData = async () => {
    try {
      const [busesRes, routesRes] = await Promise.all([
        getAllBuses(),
        getAllRoutes()
      ]);
      setBuses(busesRes.data);
      setFilteredBuses(busesRes.data);
      setRoutes(routesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchBuses(searchQuery);
      setFilteredBuses(response.data);
    } catch (error) {
      console.error('Error searching buses:', error);
    }
  };

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setMapCenter([bus.currentLocation.lat, bus.currentLocation.lng]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Track Your Bus
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Bus List */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <BusSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  routes={routes}
                />
              </Card>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredBuses.length === 0 ? (
                  <Card>
                    <p className="text-center text-gray-600 py-8">
                      No buses found
                    </p>
                  </Card>
                ) : (
                  filteredBuses.map((bus) => (
                    <BusCard
                      key={bus.id}
                      bus={bus}
                      isSelected={selectedBus?.id === bus.id}
                      onClick={() => handleBusSelect(bus)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Main - Map */}
            <div className="lg:col-span-2">
              <Card padding="none" className="overflow-hidden">
                <BaseMap 
                  center={mapCenter} 
                  zoom={13}
                  className="h-[700px] w-full"
                >
                  {filteredBuses.map((bus) => (
                    <MapMarker
                      key={bus.id}
                      position={[bus.currentLocation.lat, bus.currentLocation.lng]}
                      type="bus"
                      title={`Bus ${bus.registrationNumber}`}
                      description={`Route ${bus.routeNumber} - ${bus.currentStop}`}
                      onClick={() => handleBusSelect(bus)}
                    >
                      <div className="space-y-2">
                        <p className="font-semibold">Route {bus.routeNumber}</p>
                        <p className="text-sm">Current: {bus.currentStop}</p>
                        <p className="text-sm">Next: {bus.nextStop}</p>
                        <p className="text-sm">ETA: {bus.eta} min</p>
                        <p className="text-sm">Passengers: {bus.passengerCount}/{bus.capacity}</p>
                      </div>
                    </MapMarker>
                  ))}
                </BaseMap>
              </Card>

              {/* Selected Bus Details */}
              {selectedBus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <Card>
                    <h3 className="text-lg font-semibold mb-4">Bus Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Route Number</p>
                        <p className="font-semibold">{selectedBus.routeNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bus Number</p>
                        <p className="font-semibold">{selectedBus.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Current Location</p>
                        <p className="font-semibold">{selectedBus.currentStop}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Stop</p>
                        <p className="font-semibold">{selectedBus.nextStop}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ETA to Next Stop</p>
                        <p className="font-semibold">{selectedBus.eta} minutes</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Occupancy</p>
                        <p className="font-semibold">{selectedBus.passengerCount}/{selectedBus.capacity}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackBus;
