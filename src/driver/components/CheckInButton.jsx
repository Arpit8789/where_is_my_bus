import { MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

const CheckInButton = ({ onCheckIn, disabled }) => {
  return (
    <Button
      size="sm"
      variant="primary"
      icon={<MapPin className="h-4 w-4" />}
      onClick={onCheckIn}
      disabled={disabled}
    >
      Check In
    </Button>
  );
};

export default CheckInButton;
