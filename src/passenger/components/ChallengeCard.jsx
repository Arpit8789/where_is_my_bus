import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getTimeAgo } from '@/utils/helpers';

const ChallengeCard = ({ challenge }) => {
  const progressPercentage = (challenge.progress / challenge.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card hover>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{challenge.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
              <p className="text-sm text-gray-600">{challenge.description}</p>
            </div>
          </div>
          <Badge variant="warning">+{challenge.reward} pts</Badge>
        </div>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{challenge.progress}/{challenge.target}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="bg-secondary-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Expiry */}
        {challenge.expiresAt && (
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            Expires {getTimeAgo(challenge.expiresAt)}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default ChallengeCard;
