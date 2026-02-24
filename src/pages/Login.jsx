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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 lg:bg-white">
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 lg:bg-white min-h-screen">
        <div className="w-full max-w-md mx-auto bg-white lg:bg-transparent rounded-2xl lg:rounded-none shadow-2xl lg:shadow-none p-6 sm:p-8 lg:p-0">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6 sm:mb-8 text-center">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-lg mb-3 sm:mb-4">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-1 sm:mb-2" style={{fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', letterSpacing: '-0.02em'}}>Jotish EMS</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Employee Management System</p>
          </div>

          <div className="mb-5 sm:mb-6 md:mb-8 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Welcome Back</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition text-sm sm:text-base"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition text-sm sm:text-base"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2.5 sm:p-3">
                <p className="text-xs sm:text-sm text-red-600 font-medium text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : 'Continue'}
            </button>
          </form>

          <div className="mt-4 sm:mt-5 md:mt-6 p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2 sm:mb-3 text-center">Demo Credentials</p>
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
              <div className="text-center bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                <span className="text-gray-500 block mb-1 text-xs">Username</span>
                <span className="font-mono font-bold text-gray-900">test</span>
              </div>
              <div className="text-center bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                <span className="text-gray-500 block mb-1 text-xs">Password</span>
                <span className="font-mono font-bold text-gray-900">123456</span>
              </div>
            </div>
          </div>

          <p className="mt-3 sm:mt-4 md:mt-6 text-center text-xs sm:text-sm text-gray-600">
            Need help? <a href="#" className="text-yellow-600 hover:text-yellow-700 font-semibold">Contact Support</a>
          </p>

          <div className="mt-3 sm:mt-4 md:mt-6 p-2.5 sm:p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-2 sm:gap-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1">Quick Access</p>
                <p className="text-xs text-gray-600">Access employee records, analytics, and reports</p>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">© 2024 Jotish EMS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
