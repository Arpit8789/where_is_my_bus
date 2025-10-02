import { useState, useEffect } from 'react';
import { TrendingUp, Users, Bus, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { getUserGrowth, getRoutePopularity, getReportsTimeline } from '@/services/adminService';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import UserGrowthChart from '@/admin/components/UserGrowthChart';
import RouteChart from '@/admin/components/RouteChart';
import AnalyticsChart from '@/admin/components/AnalyticsChart';

const Analytics = () => {
  const [userGrowth, setUserGrowth] = useState([]);
  const [routePopularity, setRoutePopularity] = useState([]);
  const [reportsTimeline, setReportsTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [usersRes, routesRes, reportsRes] = await Promise.all([
        getUserGrowth(),
        getRoutePopularity(),
        getReportsTimeline(),
      ]);
      setUserGrowth(usersRes.data);
      setRoutePopularity(routesRes.data);
      setReportsTimeline(reportsRes.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
              Analytics & Insights
            </h1>

            {/* User Growth Chart */}
            <Card className="mb-8">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">User Growth</h2>
              </div>
              <UserGrowthChart data={userGrowth} />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Route Popularity */}
              <Card>
                <div className="flex items-center mb-6">
                  <Bus className="h-6 w-6 text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold">Route Popularity</h2>
                </div>
                <RouteChart data={routePopularity} />
              </Card>

              {/* Reports Timeline */}
              <Card>
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-yellow-600 mr-2" />
                  <h2 className="text-xl font-semibold">Reports Timeline</h2>
                </div>
                <AnalyticsChart data={reportsTimeline} />
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
