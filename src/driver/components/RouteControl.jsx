import { Play, Pause, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ROUTE_STATUS } from '@/utils/constants';

const RouteControl = ({ status, onStart, onPause, onComplete }) => {
  const getStatusBadge = () => {
    switch (status) {
      case ROUTE_STATUS.ACTIVE:
        return <Badge variant="success">Active</Badge>;
      case ROUTE_STATUS.PAUSED:
        return <Badge variant="warning">Paused</Badge>;
      case ROUTE_STATUS.COMPLETED:
        return <Badge variant="info">Completed</Badge>;
      default:
        return <Badge variant="default">Inactive</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Current Status</p>
        {getStatusBadge()}
      </div>

      <div className="space-y-3">
        {status !== ROUTE_STATUS.ACTIVE && status !== ROUTE_STATUS.COMPLETED && (
          <Button
            variant="primary"
            className="w-full"
            icon={<Play />}
            onClick={onStart}
          >
            Start Route
          </Button>
        )}

        {status === ROUTE_STATUS.ACTIVE && (
          <>
            <Button
              variant="warning"
              className="w-full"
              icon={<Pause />}
              onClick={onPause}
            >
              Pause Route
            </Button>
            <Button
              variant="success"
              className="w-full"
              icon={<CheckCircle />}
              onClick={onComplete}
            >
              Complete Route
            </Button>
          </>
        )}

        {status === ROUTE_STATUS.PAUSED && (
          <Button
            variant="primary"
            className="w-full"
            icon={<Play />}
            onClick={onStart}
          >
            Resume Route
          </Button>
        )}

        {status === ROUTE_STATUS.COMPLETED && (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-green-600 font-semibold">Route Completed!</p>
            <p className="text-sm text-gray-600">Great job today!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteControl;
