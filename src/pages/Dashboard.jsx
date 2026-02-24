import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { employeeData } = useAuth();

  const employees = Array.isArray(employeeData) ? employeeData : [];

  console.log('Dashboard - employeeData:', employeeData);
  console.log('Dashboard - employees array:', employees.length);

  const stats = useMemo(() => {
    console.log('Calculating stats for', employees.length, 'employees');
    if (employees.length === 0) {
      return { total: 0, avgSalary: 0, totalSalary: 0, cities: 0, designations: 0, maxSalary: 0, minSalary: 0 };
    }
    const totalSalary = employees.reduce((sum, emp) => sum + (parseInt(emp.salary) || 0), 0);
    const cities = [...new Set(employees.map(emp => emp.city))];
    const designations = [...new Set(employees.map(emp => emp.designation))];
    
    const salaries = employees.map(e => parseInt(e.salary) || 0);
    const maxSalary = Math.max(...salaries);
    const minSalary = Math.min(...salaries);

    return {
      total: employees.length,
      avgSalary: employees.length ? Math.round(totalSalary / employees.length) : 0,
      totalSalary,
      cities: cities.length,
      designations: designations.length,
      maxSalary,
      minSalary
    };
  }, [employees]);

  const topEmployees = useMemo(() => {
    return [...employees]
      .sort((a, b) => (parseInt(b.salary) || 0) - (parseInt(a.salary) || 0))
      .slice(0, 5);
  }, [employees]);

  const cityData = useMemo(() => {
    const counts = {};
    employees.forEach(emp => {
      if (emp.city) counts[emp.city] = (counts[emp.city] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [employees]);

  const salaryRanges = useMemo(() => {
    const ranges = { '0-50k': 0, '50k-100k': 0, '100k-150k': 0, '150k+': 0 };
    employees.forEach(emp => {
      const salary = parseInt(emp.salary) || 0;
      if (salary < 50000) ranges['0-50k']++;
      else if (salary < 100000) ranges['50k-100k']++;
      else if (salary < 150000) ranges['100k-150k']++;
      else ranges['150k+']++;
    });
    return Object.entries(ranges).map(([name, value]) => ({ name, value }));
  }, [employees]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="flex h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <Toaster position="top-right" />
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
              <p className="text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Employees" value={stats.total} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} color="blue" trend="+12%" />
            <StatCard title="Avg Salary" value={`$${stats.avgSalary.toLocaleString()}`} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="green" trend="+8%" />
            <StatCard title="Cities" value={stats.cities} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>} color="purple" trend="+3" />
            <StatCard title="Departments" value={stats.designations} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} color="orange" trend="+5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Salary Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salaryRanges}>
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Employee by City</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={cityData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Top Earners</h3>
                <button onClick={() => navigate('/list')} className="text-blue-600 hover:text-blue-800 font-medium text-sm">View All</button>
              </div>
              <div className="space-y-3">
                {topEmployees.map((emp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer" onClick={() => navigate(`/details/${employees.indexOf(emp)}`)}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{emp.name?.charAt(0) || 'E'}</div>
                      <div>
                        <p className="font-bold text-gray-800">{emp.name || 'Unknown'}</p>
                        <p className="text-sm text-gray-600">{emp.designation || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${parseInt(emp.salary || 0).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{emp.city || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <QuickStat label="Highest Salary" value={`$${stats.maxSalary.toLocaleString()}`} />
                <QuickStat label="Lowest Salary" value={`$${stats.minSalary.toLocaleString()}`} />
                <QuickStat label="Total Payroll" value={`$${stats.totalSalary.toLocaleString()}`} />
                <button onClick={() => navigate('/chart')} className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  View Full Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, trend }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-lg">{icon}</div>
        <span className="text-sm bg-white/20 px-2 py-1 rounded">{trend}</span>
      </div>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

const QuickStat = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="font-bold text-gray-800">{value}</span>
  </div>
);

export default Dashboard;
