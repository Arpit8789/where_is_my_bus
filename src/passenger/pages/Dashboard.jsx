import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/utils/constants';
import { getAllBuses } from '@/services/busService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import Badge from '@/components/ui/Badge';

const Dashboard = () => {
  const { user } = useAuth();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const response = await getAllBuses();
      setBuses(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error loading buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    { 
      label: 'Trust Score', 
      value: user?.trustScore || 0, 
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    { 
      label: 'Total Points', 
      value: user?.points || 0, 
      icon: <Award className="h-5 w-5" />,
      color: 'text-yellow-600'
    },
    { 
      label: 'Reports', 
      value: user?.reportsSubmitted || 0, 
      icon: <MapPin className="h-5 w-5" />,
      color: 'text-green-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Track your buses and earn rewards for helping the community
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
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
                  <div className={`${stat.color} bg-gray-100 p-3 rounded-full`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to={ROUTES.TRACK_BUS}>
                <Button variant="primary" className="w-full" icon={<Bus />}>
                  Track Bus
                </Button>
              </Link>
              <Link to={ROUTES.REPORT_BUS}>
                <Button variant="secondary" className="w-full" icon={<MapPin />}>
                  Report Bus
                </Button>
              </Link>
              <Link to={ROUTES.REWARDS}>
                <Button variant="outline" className="w-full" icon={<Award />}>
                  View Rewards
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Active Buses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Active Buses Nearby</h2>
              <Link to={ROUTES.TRACK_BUS}>
                <Button variant="ghost" size="sm" icon={<ArrowRight />}>
                  View All
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader />
              </div>
            ) : (
              <div className="space-y-4">
                {buses.map((bus) => (
                  <div 
                    key={bus.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <Bus className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Route {bus.routeNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          {bus.currentStop} → {bus.nextStop}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={bus.status === 'active' ? 'success' : 'warning'}>
                        {bus.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">
                        ETA: {bus.eta} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
