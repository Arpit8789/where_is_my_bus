import { Search, Filter } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const BusSearch = ({ searchQuery, setSearchQuery, routes }) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by route number or location..."
        icon={<Search className="h-5 w-5 text-gray-400" />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Filters
        </label>
        <div className="flex flex-wrap gap-2">
          {routes.slice(0, 4).map((route) => (
            <button
              key={route.id}
              onClick={() => setSearchQuery(route.routeNumber)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-primary-100 hover:text-primary-700 rounded-full transition-colors"
            >
              Route {route.routeNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusSearch;
