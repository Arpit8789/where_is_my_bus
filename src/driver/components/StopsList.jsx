import { CheckCircle, Circle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import CheckInButton from './CheckInButton';

const StopsList = ({ stops, checkedStops, currentStopIndex, onCheckIn, disabled }) => {
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {stops.map((stop, index) => {
        const isChecked = checkedStops.includes(stop.id);
        const isCurrent = index === currentStopIndex;
        const isPast = index < currentStopIndex;

        return (
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 border rounded-lg transition-colors ${
              isCurrent
                ? 'bg-primary-50 border-primary-500'
                : isChecked
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isChecked ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : isCurrent ? (
                  <MapPin className="h-5 w-5 text-primary-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <p className={`font-medium ${isCurrent ? 'text-primary-900' : 'text-gray-900'}`}>
                    {stop.name}
                  </p>
                  <p className="text-xs text-gray-600">Stop #{stop.order}</p>
                </div>
              </div>

              {isCurrent && !isChecked && (
                <CheckInButton
                  onCheckIn={() => onCheckIn(stop)}
                  disabled={disabled}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StopsList;
