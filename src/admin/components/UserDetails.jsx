import { useState } from 'react';
import { User, Mail, Phone, Shield, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateTrustScore } from '@/services/adminService';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

const UserDetails = ({ user, onClose, onUpdate }) => {
  const [trustScore, setTrustScore] = useState(user.trustScore || 0);
  const [loading, setLoading] = useState(false);

  const handleUpdateTrustScore = async () => {
    setLoading(true);
    try {
      await updateTrustScore(user.id, trustScore);
      toast.success('Trust score updated successfully');
      onUpdate();
      onClose();
    } catch (error) {
      toast.error('Failed to update trust score');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="flex items-center space-x-4 pb-6 border-b">
        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <Badge variant={user.isActive ? 'success' : 'danger'}>
            {user.isActive ? 'Active' : 'Banned'}
          </Badge>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        <div className="flex items-center text-gray-700">
          <Mail className="h-5 w-5 mr-3 text-gray-400" />
          {user.email}
        </div>
        <div className="flex items-center text-gray-700">
          <Phone className="h-5 w-5 mr-3 text-gray-400" />
          {user.phone}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 py-6 border-y">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-600">{user.points || 0}</p>
          <p className="text-sm text-gray-600">Points</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{user.reportsSubmitted || 0}</p>
          <p className="text-sm text-gray-600">Reports</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{user.reportsApproved || 0}</p>
          <p className="text-sm text-gray-600">Approved</p>
        </div>
      </div>

      {/* Trust Score */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Update Trust Score
        </label>
        <div className="flex space-x-2">
          <Input
            type="number"
            value={trustScore}
            onChange={(e) => setTrustScore(parseInt(e.target.value))}
            icon={<Shield className="h-5 w-5 text-gray-400" />}
          />
          <Button onClick={handleUpdateTrustScore} loading={loading}>
            Update
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
