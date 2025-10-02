import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getAllReports, validateReport } from '@/services/adminService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable from '@/admin/components/DataTable';
import ReportCard from '@/admin/components/ReportCard';
import { getTimeAgo } from '@/utils/helpers';

const ValidateReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await getAllReports();
      setReports(response.data);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleApprove = async (report) => {
    try {
      await validateReport(report.id, { status: 'approved' });
      toast.success('Report approved successfully');
      loadReports();
    } catch (error) {
      toast.error('Failed to approve report');
    }
  };

  const handleReject = async (report) => {
    try {
      await validateReport(report.id, { status: 'rejected' });
      toast.success('Report rejected');
      loadReports();
    } catch (error) {
      toast.error('Failed to reject report');
    }
  };

  const columns = [
    { header: 'Bus Number', accessor: 'busNumber' },
    { header: 'Route', accessor: 'routeNumber' },
    { header: 'Location', accessor: 'location', render: (row) => row.location?.name },
    { header: 'Reported By', accessor: 'reportedBy', render: (row) => row.reportedBy?.name },
    { header: 'Time', accessor: 'timestamp', render: (row) => getTimeAgo(row.timestamp) },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === 'approved' ? 'bg-green-100 text-green-800' :
          row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(row)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Eye className="h-4 w-4" />
          </button>
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(row)}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleReject(row)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      ),
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
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Validate Reports
            </h1>

            <Card>
              <DataTable columns={columns} data={reports} loading={loading} />
            </Card>

            {showModal && selectedReport && (
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Report Details"
                size="lg"
              >
                <ReportCard
                  report={selectedReport}
                  onApprove={() => {
                    handleApprove(selectedReport);
                    setShowModal(false);
                  }}
                  onReject={() => {
                    handleReject(selectedReport);
                    setShowModal(false);
                  }}
                />
              </Modal>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ValidateReports;
