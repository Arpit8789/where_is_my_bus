import { useState } from 'react';
import toast from 'react-hot-toast';
import { createBus, updateBus } from '@/services/adminService';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const BusForm = ({ bus, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    registrationNumber: bus?.registrationNumber || '',
    routeNumber: bus?.routeNumber || '',
    capacity: bus?.capacity || 50,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (bus) {
        await updateBus(bus.id, formData);
        toast.success('Bus updated successfully');
      } else {
        await createBus(formData);
        toast.success('Bus created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error('Failed to save bus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Registration Number"
        placeholder="DL-1PC-1234"
        value={formData.registrationNumber}
        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Route Number"
          placeholder="764"
          value={formData.routeNumber}
          onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
          required
        />
        <Input
          label="Capacity"
          type="number"
          placeholder="50"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {bus ? 'Update Bus' : 'Create Bus'}
        </Button>
      </div>
    </form>
  );
};

export default BusForm;
