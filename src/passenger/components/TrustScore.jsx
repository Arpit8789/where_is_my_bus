import { Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTrustLevel, getTrustLevelProgress } from '@/utils/helpers';

const TrustScore = ({ score }) => {
  const level = getTrustLevel(score);
  const progress = getTrustLevelProgress(score);

  const getLevelColor = () => {
    switch (level.label) {
      case 'Beginner': return 'text-gray-600';
      case 'Bronze': return 'text-orange-600';
      case 'Silver': return 'text-gray-500';
      case 'Gold': return 'text-yellow-600';
      case 'Platinum': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Score Display */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-3">
          <Shield className="h-10 w-10 text-primary-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{score}</p>
        <p className={`text-lg font-semibold ${getLevelColor()}`}>
          {level.label}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress to next level</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-primary-600 h-3 rounded-full"
          />
        </div>
        {level.max !== Infinity && (
          <p className="text-xs text-gray-500 text-center">
            {level.max - score} points to {Object.values(getTrustLevel(level.max + 1))[0]?.label || 'Max Level'}
          </p>
        )}
      </div>

      {/* Benefits */}
      <div className="pt-4 border-t space-y-2">
        <p className="text-sm font-semibold text-gray-700">Current Benefits:</p>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
            Higher report priority
          </li>
          <li className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
            Bonus rewards multiplier
          </li>
          {score > 300 && (
            <li className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              Exclusive challenges access
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TrustScore;
