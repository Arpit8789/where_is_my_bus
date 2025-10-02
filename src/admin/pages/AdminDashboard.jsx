import { useEffect, useState } from 'react';
import { Users, Bus, Route, TrendingUp, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDashboardStats } from '@/services/adminService';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import StatsCard from '@/admin/components/StatsCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
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

  const statsData = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
      change: '+12%',
    },
    {
      title: 'Active Buses',
      value: `${stats?.activeBuses || 0}/${stats?.totalBuses || 0}`,
      icon: <Bus className="h-6 w-6" />,
      color: 'green',
      change: '+8%',
    },
    {
      title: 'Active Routes',
      value: stats?.activeRoutes || 0,
      icon: <Route className="h-6 w-6" />,
      color: 'purple',
      change: '+5%',
    },
    {
      title: 'Reports Today',
      value: stats?.todayReports || 0,
      icon: <FileText className="h-6 w-6" />,
      color: 'yellow',
      change: '+15%',
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
              Admin Dashboard
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} index={index} />
              ))}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-xl font-semibold mb-4">System Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Drivers</span>
                    <span className="font-semibold text-lg">{stats?.totalDrivers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Active Drivers</span>
                    <span className="font-semibold text-lg text-green-600">{stats?.activeDrivers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Active Users</span>
                    <span className="font-semibold text-lg text-blue-600">{stats?.activeUsers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Routes</span>
                    <span className="font-semibold text-lg">{stats?.totalRoutes || 0}</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-semibold mb-4">Reports Status</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Approved Reports</span>
                    <span className="font-semibold text-lg text-green-600">{stats?.approvedReports || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700">Pending Reports</span>
                    <span className="font-semibold text-lg text-yellow-600">{stats?.pendingReports || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Today's Reports</span>
                    <span className="font-semibold text-lg">{stats?.todayReports || 0}</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
