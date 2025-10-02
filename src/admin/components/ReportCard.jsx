import { MapPin, User, Clock, Image } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getTimeAgo } from '@/utils/helpers';

const ReportCard = ({ report, onApprove, onReject }) => {
  return (
    <div className="space-y-6">
      {/* Report Status */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">Report Details</h3>
          <Badge variant={
            report.status === 'approved' ? 'success' :
            report.status === 'pending' ? 'warning' : 'danger'
          }>
            {report.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{getTimeAgo(report.timestamp)}</p>
      </div>

      {/* Bus Info */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex items-center text-gray-700">
          <strong className="w-32">Bus Number:</strong>
          <span>{report.busNumber}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <strong className="w-32">Route:</strong>
          <span>{report.routeNumber}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <strong className="w-32">Location:</strong>
          <span>{report.location?.name}</span>
        </div>
      </div>

      {/* Reporter Info */}
      <div className="flex items-center space-x-2 text-gray-700">
        <User className="h-4 w-4 text-gray-400" />
        <span>Reported by: <strong>{report.reportedBy?.name}</strong></span>
      </div>

      {/* Description */}
      {report.description && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
          <p className="text-gray-600">{report.description}</p>
        </div>
      )}

      {/* Photo */}
      {report.photo && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Photo:</p>
          <img src={report.photo} alt="Report" className="w-full h-48 object-cover rounded-lg" />
        </div>
      )}

      {/* Actions */}
      {report.status === 'pending' && (
        <div className="flex space-x-3 pt-4 border-t">
          <Button variant="success" className="flex-1" onClick={onApprove}>
            Approve Report
          </Button>
          <Button variant="danger" className="flex-1" onClick={onReject}>
            Reject Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
