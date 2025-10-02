import { useState, useEffect } from 'react';
import { Edit2, Ban, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getAllUsers, banUser, unbanUser } from '@/services/adminService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable from '@/admin/components/DataTable';
import UserDetails from '@/admin/components/UserDetails';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.filter(u => u.role === 'passenger'));
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleBanUser = async (user) => {
    if (window.confirm(`Are you sure you want to ban ${user.name}?`)) {
      try {
        await banUser(user.id);
        toast.success('User banned successfully');
        loadUsers();
      } catch (error) {
        toast.error('Failed to ban user');
      }
    }
  };

  const handleUnbanUser = async (user) => {
    try {
      await unbanUser(user.id);
      toast.success('User unbanned successfully');
      loadUsers();
    } catch (error) {
      toast.error('Failed to unban user');
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Trust Score', accessor: 'trustScore' },
    { header: 'Points', accessor: 'points' },
    { header: 'Reports', accessor: 'reportsSubmitted' },
    { 
      header: 'Status', 
      accessor: 'isActive', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.isActive ? 'Active' : 'Banned'}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewDetails(row)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          {row.isActive ? (
            <button
              onClick={() => handleBanUser(row)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <Ban className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => handleUnbanUser(row)}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
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
              Manage Users
            </h1>

            <Card>
              <DataTable columns={columns} data={users} loading={loading} />
            </Card>

            {showModal && selectedUser && (
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="User Details"
                size="lg"
              >
                <UserDetails 
                  user={selectedUser} 
                  onClose={() => setShowModal(false)}
                  onUpdate={loadUsers}
                />
              </Modal>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
