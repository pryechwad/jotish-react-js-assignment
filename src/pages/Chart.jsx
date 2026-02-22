import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Chart = () => {
  const navigate = useNavigate();
  const { employeeData } = useAuth();

  const topTenEmployees = employeeData?.slice(0, 10).map(emp => ({
    name: emp.name.split(' ')[0],
    salary: parseInt(emp.salary)
  }));

  const cityCounts = employeeData?.reduce((acc, emp) => {
    acc[emp.city] = (acc[emp.city] || 0) + 1;
    return acc;
  }, {});

  const cityData = Object.entries(cityCounts || {}).map(([city, count]) => ({
    name: city,
    value: count
  })).slice(0, 8);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/list')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            ← Back to List
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Employee Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 10 Employees by Salary</h2>
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

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Employees by City</h2>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatCard
            title="Total Employees"
            value={employeeData?.length || 0}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Average Salary"
            value={`$${Math.round(employeeData?.reduce((sum, emp) => sum + parseInt(emp.salary), 0) / employeeData?.length) || 0}`}
            icon="💰"
            color="green"
          />
          <StatCard
            title="Cities"
            value={Object.keys(cityCounts || {}).length}
            icon="🏙️"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default Chart;
