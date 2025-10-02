import { useEffect, useState } from 'react';
import { Route, MessageSquare, TrendingUp, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { getDriverPerformance } from '@/services/driverService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

const DriverDashboard = () => {
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
      icon: <Route className="h-5 w-5" />,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Average Rating',
      value: performance?.stats.averageRating || 0,
      icon: <Star className="h-5 w-5" />,
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      label: 'On-Time %',
      value: `${performance?.stats.onTimePercentage || 0}%`,
      icon: <Clock className="h-5 w-5" />,
      color: 'text-green-600 bg-green-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Welcome, {user?.name}! 👋
              </h1>
              <p className="text-gray-600">
                Here's your performance overview for today
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

            {/* Quick Actions */}
            <Card className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to={ROUTES.DRIVER_ROUTE}>
                  <Button variant="primary" className="w-full" icon={<Route />}>
                    Start Route
                  </Button>
                </Link>
                <Link to={ROUTES.DRIVER_MESSAGES}>
                  <Button variant="secondary" className="w-full" icon={<MessageSquare />}>
                    View Messages
                  </Button>
                </Link>
                <Link to={ROUTES.DRIVER_PERFORMANCE}>
                  <Button variant="outline" className="w-full" icon={<TrendingUp />}>
                    Performance
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <h2 className="text-xl font-semibold mb-6">Today's Schedule</h2>
              <div className="space-y-4">
                {performance?.recentTrips.map((trip) => (
                  <div 
                    key={trip.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <Route className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Route {trip.route}</p>
                        <p className="text-sm text-gray-600">
                          {trip.startTime} - {trip.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={trip.status === 'completed' ? 'success' : 'warning'}>
                        {trip.status}
                      </Badge>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{trip.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
