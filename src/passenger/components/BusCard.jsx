import { Bus, Clock, Users, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/helpers';

const BusCard = ({ bus, isSelected, onClick }) => {
  const occupancyPercentage = (bus.passengerCount / bus.capacity) * 100;
  
  const getOccupancyColor = () => {
    if (occupancyPercentage < 50) return 'bg-green-500';
    if (occupancyPercentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusVariant = () => {
    switch (bus.status) {
      case 'active': return 'success';
      case 'delayed': return 'warning';
      case 'breakdown': return 'danger';
      default: return 'default';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        onClick={onClick}
        className={cn(
          'cursor-pointer transition-all',
          isSelected ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'
        )}
        padding="default"
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-2 rounded-lg">
                <Bus className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Route {bus.routeNumber}</p>
                <p className="text-xs text-gray-500">{bus.registrationNumber}</p>
              </div>
            </div>
            <Badge variant={getStatusVariant()}>
              {bus.status}
            </Badge>
          </div>

          {/* Location Info */}
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Navigation className="h-4 w-4 mr-2 text-primary-600" />
              <span className="font-medium">Current:</span>
              <span className="ml-1">{bus.currentStop}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Navigation className="h-4 w-4 mr-2 text-secondary-600" />
              <span className="font-medium">Next:</span>
              <span className="ml-1">{bus.nextStop}</span>
            </div>
          </div>

          {/* ETA and Occupancy */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span className="font-medium text-primary-600">{bus.eta} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div className="flex items-center space-x-1">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className={cn('h-2 rounded-full', getOccupancyColor())}
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {bus.passengerCount}/{bus.capacity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BusCard;
