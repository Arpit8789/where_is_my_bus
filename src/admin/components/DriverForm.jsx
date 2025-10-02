import { useState } from 'react';
import toast from 'react-hot-toast';
import { createDriver, updateDriver } from '@/services/adminService';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const DriverForm = ({ driver, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: driver?.name || '',
    email: driver?.email || '',
    phone: driver?.phone || '',
    licenseNumber: driver?.licenseNumber || '',
    busAssigned: driver?.busAssigned || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (driver) {
        await updateDriver(driver.id, formData);
        toast.success('Driver updated successfully');
      } else {
        await createDriver(formData);
        toast.success('Driver created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error('Failed to save driver');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Enter driver name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="driver@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="9876543210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="License Number"
          placeholder="DL1420110012345"
          value={formData.licenseNumber}
          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          required
        />
        <Input
          label="Bus Assigned"
          placeholder="DL-1PC-1234"
          value={formData.busAssigned}
          onChange={(e) => setFormData({ ...formData, busAssigned: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {driver ? 'Update Driver' : 'Create Driver'}
        </Button>
      </div>
    </form>
  );
};

export default DriverForm;
