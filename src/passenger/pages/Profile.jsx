import { useState } from 'react';
import { User, Mail, Phone, Edit2, Save, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import TrustScore from '@/passenger/components/TrustScore';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const stats = [
    { label: 'Reports Submitted', value: user?.reportsSubmitted || 0 },
    { label: 'Reports Approved', value: user?.reportsApproved || 0 },
    { label: 'Accuracy Rate', value: `${Math.round(((user?.reportsApproved || 0) / (user?.reportsSubmitted || 1)) * 100)}%` },
    { label: 'Member Since', value: new Date(user?.joinedDate || Date.now()).toLocaleDateString() },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
            My Profile
          </h1>

          {/* Profile Header */}
          <Card className="mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="primary">{user?.role}</Badge>
                    {user?.isActive && <Badge variant="success">Active</Badge>}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={isEditing ? <Save /> : <Edit2 />}
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    icon={<User className="h-5 w-5 text-gray-400" />}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Email"
                    type="email"
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    icon={<Phone className="h-5 w-5 text-gray-400" />}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </Card>

              {/* Stats */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Activity Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust Score */}
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary-600" />
                  Trust Score
                </h3>
                <TrustScore score={user?.trustScore || 0} />
              </Card>

              {/* Points */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Reward Points</h3>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-600">{user?.points || 0}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Points Earned</p>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
