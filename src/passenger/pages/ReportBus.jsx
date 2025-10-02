import { useState } from 'react';
import { MapPin, Camera, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ReportForm from '@/passenger/components/ReportForm';
import { mockReports } from '@/utils/mockData';

const ReportBus = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentReports, setRecentReports] = useState(mockReports);

  const handleReportSuccess = (report) => {
    setShowSuccess(true);
    setRecentReports([report, ...recentReports]);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Report Bus Location
          </h1>
          <p className="text-gray-600 mb-8">
            Help the community by reporting bus locations and earn rewards
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Form */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-semibold mb-6">Submit Report</h2>
                <ReportForm onSuccess={handleReportSuccess} />
              </Card>

              {/* Success Message */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <Card className="bg-green-50 border-2 border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">Report Submitted!</p>
                        <p className="text-sm text-green-700">You've earned 10 points 🎉</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Points Info */}
              <Card>
                <h3 className="font-semibold mb-4">Earn Rewards</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Report Location</p>
                      <p className="text-xs text-gray-600">+10 points</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Camera className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Add Photo</p>
                      <p className="text-xs text-gray-600">+5 bonus points</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Verified Report</p>
                      <p className="text-xs text-gray-600">+10 bonus points</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tips */}
              <Card>
                <h3 className="font-semibold mb-4">Reporting Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Report only when you see the bus
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Include clear photos if possible
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Accurate reports increase trust score
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    False reports may reduce points
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="mt-8">
            <Card>
              <h2 className="text-xl font-semibold mb-6">Your Recent Reports</h2>
              <div className="space-y-4">
                {recentReports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Bus {report.busNumber}</p>
                        <p className="text-sm text-gray-600">{report.location.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        report.status === 'approved' ? 'text-green-600' : 
                        report.status === 'pending' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(report.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportBus;
