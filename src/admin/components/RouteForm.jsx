import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createRoute, updateRoute } from '@/services/adminService';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const RouteForm = ({ route, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    routeNumber: route?.routeNumber || '',
    name: route?.name || '',
    startPoint: route?.startPoint || '',
    endPoint: route?.endPoint || '',
    distance: route?.distance || '',
    estimatedDuration: route?.estimatedDuration || '',
    fare: route?.fare || '',
    frequency: route?.frequency || '',
    operatingHours: route?.operatingHours || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (route) {
        await updateRoute(route.id, formData);
        toast.success('Route updated successfully');
      } else {
        await createRoute(formData);
        toast.success('Route created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error('Failed to save route');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Route Number"
          placeholder="e.g., 764"
          value={formData.routeNumber}
          onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
          required
        />
        <Input
          label="Route Name"
          placeholder="e.g., CP - Nehru Place"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Point"
          placeholder="e.g., Connaught Place"
          value={formData.startPoint}
          onChange={(e) => setFormData({ ...formData, startPoint: e.target.value })}
          required
        />
        <Input
          label="End Point"
          placeholder="e.g., Nehru Place"
          value={formData.endPoint}
          onChange={(e) => setFormData({ ...formData, endPoint: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Distance (km)"
          type="number"
          step="0.1"
          value={formData.distance}
          onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
          required
        />
        <Input
          label="Duration (min)"
          type="number"
          value={formData.estimatedDuration}
          onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
          required
        />
        <Input
          label="Fare (₹)"
          type="number"
          value={formData.fare}
          onChange={(e) => setFormData({ ...formData, fare: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Frequency"
          placeholder="e.g., 10-15 minutes"
          value={formData.frequency}
          onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
          required
        />
        <Input
          label="Operating Hours"
          placeholder="e.g., 06:00 - 23:00"
          value={formData.operatingHours}
          onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {route ? 'Update Route' : 'Create Route'}
        </Button>
      </div>
    </form>
  );
};

export default RouteForm;
