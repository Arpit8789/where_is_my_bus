import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Bus, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'passenger' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(formData);
    setLoading(false);
  };

  // Quick Login Functions
  const quickLogin = (role) => {
    const credentials = {
      passenger: { email: 'passenger@gmail.com', password: '11111' },
      driver: { email: 'driver@gmail.com', password: '11111' },
      admin: { email: 'admin@gmail.com', password: '11111' },
    };
    
    setLoading(true);
    login(credentials[role]);
  };

  const roles = [
    { 
      value: 'passenger', 
      label: 'Passenger', 
      icon: <User className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    { 
      value: 'driver', 
      label: 'Driver', 
      icon: <Bus className="h-5 w-5" />,
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Login Buttons */}
      <div>
        <p className="text-sm text-gray-600 mb-3 text-center">Quick Login (Demo)</p>
        <div className="grid grid-cols-3 gap-3">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => quickLogin(role.value)}
              disabled={loading}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${role.color} ${
                loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {role.icon}
              <span className="text-xs font-medium mt-2">{role.label}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Email: {formData.role}@gmail.com | Password: 11111
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or login manually</span>
        </div>
      </div>

      {/* Manual Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setFormData({ ...formData, role: role.value, email: `${role.value}@gmail.com` })}
                className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center space-x-2 ${
                  formData.role === role.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {role.icon}
                <span className="text-sm font-medium">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Login as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
        </Button>
      </form>

      {/* Demo Credentials */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
        <div className="space-y-1 text-xs text-blue-700">
          <p>• Passenger: passenger@gmail.com / 11111</p>
          <p>• Driver: driver@gmail.com / 11111</p>
          <p>• Admin: admin@gmail.com / 11111</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
