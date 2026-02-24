import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';

const List = () => {
  const navigate = useNavigate();
  const { employeeData } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const employees = Array.isArray(employeeData) ? employeeData : [];

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(employees.map(emp => emp.city))];
    return uniqueCities.sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.designation?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = !filterCity || emp.city === filterCity;
      return matchesSearch && matchesCity;
    });
  }, [employees, searchTerm, filterCity]);

  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'salary') {
        aVal = parseInt(aVal) || 0;
        bVal = parseInt(bVal) || 0;
      }
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredEmployees, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedEmployees.slice(start, start + itemsPerPage);
  }, [sortedEmployees, currentPage, itemsPerPage]);

  const stats = useMemo(() => {
    const totalSalary = employees.reduce((sum, emp) => sum + (parseInt(emp.salary) || 0), 0);
    return {
      total: employees.length,
      filtered: filteredEmployees.length,
      avgSalary: employees.length ? Math.round(totalSalary / employees.length) : 0,
      cities: cities.length
    };
  }, [employees, filteredEmployees, cities]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <Toaster position="top-right" />
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
              <p className="text-sm text-gray-600">Manage and view all employee records</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Employees" value={stats.total} color="blue" />
            <StatCard title="Showing" value={stats.filtered} color="green" />
            <StatCard title="Avg Salary" value={`$${stats.avgSalary.toLocaleString()}`} color="purple" />
            <StatCard title="Cities" value={stats.cities} color="orange" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or designation..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <select
                value={filterCity}
                onChange={(e) => { setFilterCity(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Cities</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="salary-desc">Salary (High-Low)</option>
                <option value="salary-asc">Salary (Low-High)</option>
                <option value="city-asc">City (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th onClick={() => handleSort('name')} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center gap-2">
                        Name {sortBy === 'name' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Designation</th>
                    <th onClick={() => handleSort('city')} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center gap-2">
                        City {sortBy === 'city' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                      </div>
                    </th>
                    <th onClick={() => handleSort('salary')} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center gap-2">
                        Salary {sortBy === 'salary' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedEmployees.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{employee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.designation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">${employee.salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button onClick={() => navigate(`/details/${employees.indexOf(employee)}`)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedEmployees.length)} of {sortedEmployees.length} results
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
                    Previous
                  </button>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-xl shadow-lg p-4 text-white`}>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default List;
