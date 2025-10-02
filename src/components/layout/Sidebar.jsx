import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Route, 
  Users, 
  Bus, 
  FileText, 
  BarChart3, 
  Settings,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES, ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const getMenuItems = () => {
    if (user?.role === USER_ROLES.DRIVER) {
      return [
        { name: 'Dashboard', path: ROUTES.DRIVER_DASHBOARD, icon: LayoutDashboard },
        { name: 'Active Route', path: ROUTES.DRIVER_ROUTE, icon: Route },
        { name: 'Messages', path: ROUTES.DRIVER_MESSAGES, icon: MessageSquare },
        { name: 'Performance', path: ROUTES.DRIVER_PERFORMANCE, icon: TrendingUp },
      ];
    }

    if (user?.role === USER_ROLES.ADMIN) {
      return [
        { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
        { name: 'Routes', path: ROUTES.ADMIN_ROUTES, icon: Route },
        { name: 'Drivers', path: ROUTES.ADMIN_DRIVERS, icon: Users },
        { name: 'Fleet', path: ROUTES.ADMIN_FLEET, icon: Bus },
        { name: 'Users', path: ROUTES.ADMIN_USERS, icon: Users },
        { name: 'Reports', path: ROUTES.ADMIN_REPORTS, icon: FileText },
        { name: 'Analytics', path: ROUTES.ADMIN_ANALYTICS, icon: BarChart3 },
      ];
    }

    return [];
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {getMenuItems().map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive(item.path)
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
