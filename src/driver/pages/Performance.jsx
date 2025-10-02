import { useState, useEffect } from 'react';
import { TrendingUp, Star, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { getDriverPerformance } from '@/services/driverService';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import PerformanceChart from '@/driver/components/PerformanceChart';
import TripCard from '@/driver/components/TripCard';

const Performance = () => {
  const { user } = useAuth();
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerformance();
  }, []);

  const loadPerformance = async () => {
    try {
      const response = await getDriverPerformance(user.id);
      setPerformance(response.data);
    } catch (error) {
      console.error('Error loading performance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Trips',
      value: performance?.stats.totalTrips || 0,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Average Rating',
      value: performance?.stats.averageRating || 0,
      icon: <Star className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'On-Time %',
      value: `${performance?.stats.onTimePercentage || 0}%`,
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Passengers Served',
      value: performance?.stats.passengersServed || 0,
      icon: <Award className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
              Performance Metrics
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Performance Chart */}
            <Card className="mb-8">
              <h2 className="text-xl font-semibold mb-6">Weekly Performance</h2>
              <PerformanceChart data={performance?.weeklyPerformance || []} />
            </Card>

            {/* Recent Trips */}
            <Card>
              <h2 className="text-xl font-semibold mb-6">Recent Trips</h2>
              <div className="space-y-4">
                {performance?.recentTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
