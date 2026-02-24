import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchEmployeeData } from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setEmployeeData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (username === 'test' && password === '123456') {
      setLoading(true);
      try {
        const data = await fetchEmployeeData();
        console.log('Fetched employee data:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('Setting', data.length, 'employees to context');
          setEmployeeData(data);
          login();
          toast.success(`Login successful! Loaded ${data.length} employees`);
          setTimeout(() => navigate('/dashboard'), 500);
        } else {
          console.error('Invalid data format:', data);
          toast.error('No employee data found');
        }
      } catch (err) {
        console.error('Login error:', err);
        toast.error('Connection failed');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-center" />
      
      {/* Left Side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight" style={{fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', letterSpacing: '-0.02em'}}>Jotish EMS</h1>
            <p className="text-xl text-gray-700 font-medium">Employee Management Made Simple</p>
          </div>
          
          <div className="mt-12 space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">Real-time Analytics</span>
            </div>
            
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">Location Tracking</span>
            </div>
            
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">Secure & Fast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight" style={{fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', letterSpacing: '-0.02em'}}>Jotish EMS</h1>
            <p className="text-sm text-gray-600 font-medium">Employee Management System</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <p className="text-gray-600">Enter your credentials to access your employee dashboard and manage your workforce efficiently.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition text-base"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition text-base"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Logging in...' : 'Continue'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600 mb-2 text-center font-medium">Demo Account</p>
            <div className="flex justify-center gap-6 text-sm mb-3">
              <div className="text-center">
                <span className="text-gray-500 block mb-1">Username</span>
                <span className="font-mono font-bold text-gray-900">test</span>
              </div>
              <div className="text-center">
                <span className="text-gray-500 block mb-1">Password</span>
                <span className="font-mono font-bold text-gray-900">123456</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">Use these credentials to explore the system</p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Need help? <a href="#" className="text-yellow-600 hover:text-yellow-700 font-semibold">Contact Support</a>
          </p>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Quick Access</p>
                <p className="text-xs text-gray-600">Login to access employee records, analytics, location tracking, and comprehensive reports all in one place.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mb-4">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Help Center</a>
            </div>
            <p className="text-center text-xs text-gray-500">© 2024 Jotish. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
