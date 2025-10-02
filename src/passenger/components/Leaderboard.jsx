import { Trophy, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';

const Leaderboard = ({ data, currentUserId }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-3">
      {data.map((entry, index) => (
        <motion.div
          key={entry.userId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            entry.userId === currentUserId
              ? 'bg-primary-50 border-2 border-primary-200'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {entry.name}
                {entry.userId === currentUserId && (
                  <Badge variant="primary" className="ml-2">You</Badge>
                )}
              </p>
              <p className="text-sm text-gray-600">
                {entry.reportsSubmitted} reports • Trust: {entry.trustScore}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary-600">{entry.points}</p>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Leaderboard;
