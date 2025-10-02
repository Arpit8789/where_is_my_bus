import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getAllBuses, deleteBus } from '@/services/adminService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable from '@/admin/components/DataTable';
import BusForm from '@/admin/components/BusForm';

const ManageFleet = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const response = await getAllBuses();
      setBuses(response.data);
    } catch (error) {
      console.error('Error loading buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedBus(null);
    setShowModal(true);
  };

  const handleEdit = (bus) => {
    setSelectedBus(bus);
    setShowModal(true);
  };

  const handleDelete = async (bus) => {
    if (window.confirm(`Are you sure you want to delete bus ${bus.registrationNumber}?`)) {
      try {
        await deleteBus(bus.id);
        toast.success('Bus deleted successfully');
        loadBuses();
      } catch (error) {
        toast.error('Failed to delete bus');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    loadBuses();
  };

  const columns = [
    { header: 'Registration No.', accessor: 'registrationNumber' },
    { header: 'Route', accessor: 'routeNumber' },
    { header: 'Capacity', accessor: 'capacity' },
    { header: 'Current Stop', accessor: 'currentStop' },
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        row.status === 'active' ? 'bg-green-100 text-green-800' :
        row.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {row.status}
      </span>
    )},
    { header: 'Driver', accessor: 'driver', render: (row) => row.driver?.name || 'Unassigned' },
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
                Manage Fleet
              </h1>
              <Button icon={<Plus />} onClick={handleAdd}>
                Add Bus
              </Button>
            </div>

            <Card>
              <DataTable columns={columns} data={buses} loading={loading} />
            </Card>

            {showModal && (
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedBus ? 'Edit Bus' : 'Add New Bus'}
                size="lg"
              >
                <BusForm
                  bus={selectedBus}
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

export default ManageFleet;
