import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getAllRoutes, deleteRoute } from '@/services/adminService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable from '@/admin/components/DataTable';
import RouteForm from '@/admin/components/RouteForm';

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const response = await getAllRoutes();
      setRoutes(response.data);
    } catch (error) {
      console.error('Error loading routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedRoute(null);
    setShowModal(true);
  };

  const handleEdit = (route) => {
    setSelectedRoute(route);
    setShowModal(true);
  };

  const handleDelete = async (route) => {
    if (window.confirm(`Are you sure you want to delete route ${route.routeNumber}?`)) {
      try {
        await deleteRoute(route.id);
        toast.success('Route deleted successfully');
        loadRoutes();
      } catch (error) {
        toast.error('Failed to delete route');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    loadRoutes();
  };

  const columns = [
    { header: 'Route Number', accessor: 'routeNumber' },
    { header: 'Name', accessor: 'name' },
    { header: 'Distance', accessor: 'distance', render: (row) => `${row.distance} km` },
    { header: 'Stops', accessor: 'stops', render: (row) => row.stops?.length || 0 },
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {row.status}
      </span>
    )},
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
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
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Manage Routes
              </h1>
              <Button icon={<Plus />} onClick={handleAdd}>
                Add Route
              </Button>
            </div>

            <Card>
              <DataTable columns={columns} data={routes} loading={loading} />
            </Card>

            {showModal && (
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedRoute ? 'Edit Route' : 'Add New Route'}
                size="lg"
              >
                <RouteForm
                  route={selectedRoute}
                  onSuccess={handleFormSuccess}
                  onCancel={() => setShowModal(false)}
                />
              </Modal>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManageRoutes;
