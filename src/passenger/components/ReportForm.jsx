import { useState } from 'react';
import { MapPin, Bus, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PhotoUpload from './PhotoUpload';
import { mockBuses, mockRoutes } from '@/utils/mockData';

const ReportForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: '',
    routeNumber: '',
    location: '',
    description: '',
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newReport = {
        id: 'report-' + Date.now(),
        busNumber: formData.busNumber,
        routeNumber: formData.routeNumber,
        reportedBy: {
          id: user.id,
          name: user.name,
        },
        location: {
          name: formData.location,
          lat: 28.6139,
          lng: 77.2090,
        },
        timestamp: new Date().toISOString(),
        photo: formData.photo,
        description: formData.description,
        status: 'pending',
        pointsAwarded: 0,
      };

      toast.success('Report submitted successfully!');
      onSuccess?.(newReport);

      // Reset form
      setFormData({
        busNumber: '',
        routeNumber: '',
        location: '',
        description: '',
        photo: null,
      });
    } catch (error) {
      toast.error('Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Bus Number"
          placeholder="e.g., DL-1PC-1234"
          icon={<Bus className="h-5 w-5 text-gray-400" />}
          value={formData.busNumber}
          onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
          required
        />
        <Input
          label="Route Number"
          placeholder="e.g., 764"
          value={formData.routeNumber}
          onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
          required
        />
      </div>

      <Input
        label="Location / Stop Name"
        placeholder="e.g., Connaught Place"
        icon={<MapPin className="h-5 w-5 text-gray-400" />}
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows="3"
          placeholder="Add any additional details..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <PhotoUpload
        photo={formData.photo}
        onPhotoChange={(photo) => setFormData({ ...formData, photo })}
      />

      <Button type="submit" className="w-full" loading={loading}>
        Submit Report
      </Button>
    </form>
  );
};

export default ReportForm;
