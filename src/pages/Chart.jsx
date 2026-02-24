import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { useMemo } from 'react';

const Chart = () => {
  const navigate = useNavigate();
  const { employeeData } = useAuth();

  const employees = useMemo(() => {
    if (!employeeData || !Array.isArray(employeeData)) return [];
    if (employeeData.length > 0 && Array.isArray(employeeData[0])) {
      return employeeData[0];
    }
    return employeeData;
  }, [employeeData]);

  const topTenEmployees = employees.slice(0, 10).map(emp => ({
    name: emp.name?.split(' ')[0] || 'Unknown',
    salary: parseInt(emp.salary) || 0
  }));

  const cityCounts = employees.reduce((acc, emp) => {
    if (emp.city) {
      acc[emp.city] = (acc[emp.city] || 0) + 1;
    }
    return acc;
  }, {});

  const cityData = Object.entries(cityCounts).map(([city, count]) => ({
    name: city,
    value: count
  })).slice(0, 8);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

  return (
    <div className="flex h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <Toaster position="top-right" />
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Employee Analytics</h2>
              <p className="text-sm text-gray-600">Comprehensive data visualization and insights</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Top 10 Employees by Salary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTenEmployees}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="salary" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Employees by City</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Employees"
              value={employees.length}
              color="blue"
            />
            <StatCard
              title="Average Salary"
              value={`$${Math.round(employees.reduce((sum, emp) => sum + (parseInt(emp.salary) || 0), 0) / employees.length) || 0}`}
              color="green"
            />
            <StatCard
              title="Cities"
              value={Object.keys(cityCounts).length}
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colorClasses = {
    blue: 'from-cyan-500 to-blue-600',
    green: 'from-emerald-500 to-teal-600',
    purple: 'from-violet-500 to-purple-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg p-6 text-white`}>
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default Chart;
