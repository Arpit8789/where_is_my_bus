import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const ShiftScheduler = ({ driver, onSave }) => {
  const [shifts, setShifts] = useState([
    { day: 'Monday', startTime: '08:00', endTime: '16:00' },
    { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
    { day: 'Wednesday', startTime: '08:00', endTime: '16:00' },
    { day: 'Thursday', startTime: '08:00', endTime: '16:00' },
    { day: 'Friday', startTime: '08:00', endTime: '16:00' },
  ]);

  const handleShiftChange = (index, field, value) => {
    const newShifts = [...shifts];
    newShifts[index][field] = value;
    setShifts(newShifts);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-primary-600" />
        <h3 className="font-semibold">Weekly Schedule for {driver?.name}</h3>
      </div>

      {shifts.map((shift, index) => (
        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-24 font-medium text-gray-700">{shift.day}</div>
          <div className="flex items-center space-x-2 flex-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <Input
              type="time"
              value={shift.startTime}
              onChange={(e) => handleShiftChange(index, 'startTime', e.target.value)}
              className="w-32"
            />
            <span className="text-gray-500">to</span>
            <Input
              type="time"
              value={shift.endTime}
              onChange={(e) => handleShiftChange(index, 'endTime', e.target.value)}
              className="w-32"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <Button onClick={() => onSave(shifts)}>
          Save Schedule
        </Button>
      </div>
    </div>
  );
};

export default ShiftScheduler;
