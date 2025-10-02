import { useState, useEffect } from 'react';
import { Award, Trophy, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import RewardsCard from '@/passenger/components/RewardsCard';
import Leaderboard from '@/passenger/components/Leaderboard';
import BadgeDisplay from '@/passenger/components/BadgeDisplay';
import { mockBadges, mockLeaderboard, mockChallenges } from '@/utils/mockData';
import { getTrustLevel, getTrustLevelProgress } from '@/utils/helpers';

const Rewards = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState(mockBadges);
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [challenges, setChallenges] = useState(mockChallenges);

  const trustLevel = getTrustLevel(user?.trustScore || 0);
  const levelProgress = getTrustLevelProgress(user?.trustScore || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Rewards & Achievements
          </h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <RewardsCard
              title="Total Points"
              value={user?.points || 0}
              icon={<Award className="h-6 w-6" />}
              color="yellow"
            />
            <RewardsCard
              title="Trust Score"
              value={user?.trustScore || 0}
              icon={<TrendingUp className="h-6 w-6" />}
              color="blue"
            />
            <RewardsCard
              title="Current Level"
              value={trustLevel.label}
              icon={<Trophy className="h-6 w-6" />}
              color={trustLevel.color}
            />
          </div>

          {/* Trust Level Progress */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Trust Level Progress</h2>
              <Badge variant="primary">{trustLevel.label}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Current Score: {user?.trustScore || 0}</span>
                <span>Next Level: {trustLevel.max === Infinity ? 'Max Level' : trustLevel.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="bg-primary-600 h-3 rounded-full"
                />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Badges Section */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold mb-6">Your Badges</h2>
                <BadgeDisplay badges={badges} />
              </Card>

              {/* Active Challenges */}
              <Card className="mt-6">
                <h2 className="text-xl font-semibold mb-6">Active Challenges</h2>
                <div className="space-y-4">
                  {challenges.filter(c => c.status === 'active').map((challenge) => (
                    <div key={challenge.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{challenge.icon}</span>
                          <div>
                            <h3 className="font-semibold">{challenge.title}</h3>
                            <p className="text-sm text-gray-600">{challenge.description}</p>
                          </div>
                        </div>
                        <Badge variant="warning">+{challenge.reward} pts</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{challenge.progress}/{challenge.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-secondary-600 h-2 rounded-full"
                            style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Leaderboard Section */}
            <div>
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Community Leaderboard</h2>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <Leaderboard data={leaderboard} currentUserId={user?.id} />
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rewards;
