import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const List = () => {
  const navigate = useNavigate();
  const { employeeData, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Employee Dashboard</h1>
            <div className="flex gap-2 md:gap-4">
              <button
                onClick={() => navigate('/chart')}
                className="px-3 md:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm md:text-base"
              >
                📊 Charts
              </button>
              <button
                onClick={() => navigate('/map')}
                className="px-3 md:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm md:text-base"
              >
                🗺️ Map
              </button>
              <button
                onClick={handleLogout}
                className="px-3 md:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Employee List ({employeeData?.length || 0})
            </h2>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden">
            {employeeData?.map((employee, index) => (
              <div
                key={index}
                onClick={() => navigate(`/details/${index}`)}
                className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer active:bg-gray-100 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                  <span className="text-sm font-medium text-green-600">${employee.salary}</span>
                </div>
                <p className="text-sm text-gray-600">{employee.designation}</p>
                <p className="text-xs text-gray-500 mt-1">{employee.city}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeData?.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${employee.salary}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => navigate(`/details/${index}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
