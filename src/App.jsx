import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ROUTES, USER_ROLES } from '@/utils/constants';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

// Auth Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Auth Pages
import Login from '@/pages/Login'; // Temporary, create separate Login page
import Register from '@/passenger/pages/PassengerHome'; // Temporary, create separate Register page

// Passenger Pages
import PassengerHome from '@/passenger/pages/PassengerHome';
import Dashboard from '@/passenger/pages/Dashboard';
import TrackBus from '@/passenger/pages/TrackBus';
import ReportBus from '@/passenger/pages/ReportBus';
import Rewards from '@/passenger/pages/Rewards';
import Profile from '@/passenger/pages/Profile';

// Driver Pages
import DriverDashboard from '@/driver/pages/DriverDashboard';
import ActiveRoute from '@/driver/pages/ActiveRoute';
import Messages from '@/driver/pages/Messages';
import Performance from '@/driver/pages/Performance';

// Admin Pages
import AdminDashboard from '@/admin/pages/AdminDashboard';
import ManageRoutes from '@/admin/pages/ManageRoutes';
import ManageDrivers from '@/admin/pages/ManageDrivers';
import ManageFleet from '@/admin/pages/ManageFleet';
import ManageUsers from '@/admin/pages/ManageUsers';
import ValidateReports from '@/admin/pages/ValidateReports';
import Analytics from '@/admin/pages/Analytics';

// Layout wrapper for pages with sidebar
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.HOME} element={<PassengerHome />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<PassengerHome />} />

                {/* Passenger Routes */}
                <Route
                  path={ROUTES.PASSENGER_DASHBOARD}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.TRACK_BUS}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                      <TrackBus />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.REPORT_BUS}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                      <ReportBus />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.REWARDS}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                      <Rewards />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PASSENGER]}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Driver Routes */}
                <Route
                  path={ROUTES.DRIVER_DASHBOARD}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                      <DashboardLayout>
                        <DriverDashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.DRIVER_ROUTE}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                      <DashboardLayout>
                        <ActiveRoute />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.DRIVER_MESSAGES}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                      <DashboardLayout>
                        <Messages />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.DRIVER_PERFORMANCE}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                      <DashboardLayout>
                        <Performance />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path={ROUTES.ADMIN_DASHBOARD}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                      <DashboardLayout>
                        <AdminDashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.ADMIN_ROUTES}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                      <DashboardLayout>
                        <ManageRoutes />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.ADMIN_DRIVERS}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                      <DashboardLayout>
                        <ManageDrivers />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.ADMIN_FLEET}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                      <DashboardLayout>
                        <ManageFleet />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.ADMIN_USERS}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                      <DashboardLayout>
                        <ManageUsers />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.ADMIN_REPORTS}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                      <DashboardLayout>
                        <ValidateReports />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.ADMIN_ANALYTICS}
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                      <DashboardLayout>
                        <Analytics />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                {/* 404 Redirect */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </main>

            <Footer />
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
