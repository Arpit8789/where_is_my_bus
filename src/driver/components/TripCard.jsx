import { Calendar, Clock, MapPin, Star, Users } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const TripCard = ({ trip }) => {
  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Route {trip.route}</p>
            <p className="text-sm text-gray-600">
              {trip.startTime} - {trip.endTime}
            </p>
          </div>
        </div>
        <Badge variant={trip.status === 'completed' ? 'success' : 'warning'}>
          {trip.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {trip.date}
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          {trip.passengers} passengers
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {trip.distance} km
        </div>
      </div>

      <div className="mt-3 pt-3 border-t flex items-center justify-between">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-medium text-gray-900">{trip.rating}</span>
          <span className="text-sm text-gray-600 ml-1">rating</span>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
