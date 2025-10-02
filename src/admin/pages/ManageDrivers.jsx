import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getAllDrivers, deleteDriver } from '@/services/adminService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable from '@/admin/components/DataTable';
import DriverForm from '@/admin/components/DriverForm';

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const response = await getAllDrivers();
      setDrivers(response.data);
    } catch (error) {
      console.error('Error loading drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedDriver(null);
    setShowModal(true);
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const handleDelete = async (driver) => {
    if (window.confirm(`Are you sure you want to delete driver ${driver.name}?`)) {
      try {
        await deleteDriver(driver.id);
        toast.success('Driver deleted successfully');
        loadDrivers();
      } catch (error) {
        toast.error('Failed to delete driver');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    loadDrivers();
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'License', accessor: 'licenseNumber' },
    { header: 'Bus Assigned', accessor: 'busAssigned' },
    { header: 'Rating', accessor: 'rating', render: (row) => `⭐ ${row.rating || 0}` },
    { header: 'Trips', accessor: 'tripsCompleted' },
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
                Manage Drivers
              </h1>
              <Button icon={<Plus />} onClick={handleAdd}>
                Add Driver
              </Button>
            </div>

            <Card>
              <DataTable columns={columns} data={drivers} loading={loading} />
            </Card>

            {showModal && (
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedDriver ? 'Edit Driver' : 'Add New Driver'}
                size="lg"
              >
                <DriverForm
                  driver={selectedDriver}
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

export default ManageDrivers;
