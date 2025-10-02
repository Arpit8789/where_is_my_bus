import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const BadgeDisplay = ({ badges }) => {
  const rarityColors = {
    common: 'border-gray-300 bg-gray-50',
    uncommon: 'border-green-300 bg-green-50',
    rare: 'border-blue-300 bg-blue-50',
    epic: 'border-purple-300 bg-purple-50',
    legendary: 'border-yellow-300 bg-yellow-50',
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`relative p-4 border-2 rounded-lg text-center ${
            badge.unlockedAt
              ? rarityColors[badge.rarity] || rarityColors.common
              : 'border-gray-200 bg-gray-100 opacity-60'
          }`}
        >
          {!badge.unlockedAt && (
            <div className="absolute top-2 right-2">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="text-4xl mb-2">{badge.icon}</div>
          <p className="font-semibold text-sm text-gray-900">{badge.name}</p>
          <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
          {badge.unlockedAt && (
            <p className="text-xs text-gray-500 mt-2">
              Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default BadgeDisplay;
