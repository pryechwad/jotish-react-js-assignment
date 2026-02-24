import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { employeeData } = useAuth();
  const [selectedView, setSelectedView] = useState(null);
  const [showPayrollModal, setShowPayrollModal] = useState(false);

  const employees = useMemo(() => {
    if (!employeeData || !Array.isArray(employeeData)) return [];
    if (employeeData.length > 0 && Array.isArray(employeeData[0])) {
      return employeeData[0];
    }
    return employeeData;
  }, [employeeData]);

  console.log('Dashboard - Employees:', employees.length);

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

  const cityEmployees = useMemo(() => {
    const grouped = {};
    employees.forEach(emp => {
      if (!grouped[emp.city]) grouped[emp.city] = [];
      grouped[emp.city].push(emp);
    });
    return grouped;
  }, [employees]);

  const designationEmployees = useMemo(() => {
    const grouped = {};
    employees.forEach(emp => {
      if (!grouped[emp.designation]) grouped[emp.designation] = [];
      grouped[emp.designation].push(emp);
    });
    return grouped;
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
          {employees.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Employee Data</h3>
              <p className="text-gray-600 mb-6">Please login again to load employee data from the server</p>
              <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Go to Login
              </button>
            </div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div onClick={() => navigate('/list')} className="cursor-pointer">
              <StatCard title="Total Employees" value={stats.total} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} color="blue" trend="+12%" />
            </div>
            <div onClick={() => navigate('/chart')} className="cursor-pointer">
              <StatCard title="Avg Salary" value={`$${stats.avgSalary.toLocaleString()}`} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="green" trend="+8%" />
            </div>
            <div onClick={() => setSelectedView('cities')} className="cursor-pointer">
              <StatCard title="Cities" value={stats.cities} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>} color="purple" trend="+3" />
            </div>
            <div onClick={() => setSelectedView('departments')} className="cursor-pointer">
              <StatCard title="Departments" value={stats.designations} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} color="orange" trend="+5" />
            </div>
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
              <div className="mt-4 grid grid-cols-4 gap-2">
                {salaryRanges.map((range, idx) => (
                  <div key={idx} className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-xs font-semibold text-blue-800">{range.name}</p>
                    <p className="text-lg font-bold text-blue-600">{range.value}</p>
                  </div>
                ))}
              </div>
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
              <div className="mt-4 grid grid-cols-2 gap-2">
                {cityData.map((city, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-800">{city.name}</p>
                      <p className="text-sm font-bold text-gray-600">{city.value} employees</p>
                    </div>
                  </div>
                ))}
              </div>
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
                <div onClick={() => setShowPayrollModal(true)} className="cursor-pointer">
                  <QuickStat label="Total Payroll" value={`$${stats.totalSalary.toLocaleString()}`} clickable />
                </div>
                <button onClick={() => navigate('/chart')} className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  View Full Analytics
                </button>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* Payroll Modal */}
      {showPayrollModal && (
        <PayrollModal employees={employees} stats={stats} onClose={() => setShowPayrollModal(false)} />
      )}

      {/* Modal for Cities/Departments */}
      {selectedView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedView(null)}>
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedView === 'cities' ? 'Employees by City' : 'Employees by Department'}
              </h2>
              <button onClick={() => setSelectedView(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              {selectedView === 'cities' ? (
                <div className="space-y-4">
                  {Object.entries(cityEmployees).sort((a, b) => b[1].length - a[1].length).map(([city, emps]) => (
                    <div key={city} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{city}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {emps.length} employees
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {emps.map(emp => (
                          <div key={emp.id} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedView(null); navigate(`/details/${emp.id}`); }}>
                            <span className="text-sm font-medium text-gray-700">{emp.name}</span>
                            <span className="text-xs text-gray-500">{emp.designation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(designationEmployees).sort((a, b) => b[1].length - a[1].length).map(([designation, emps]) => (
                    <div key={designation} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{designation}</h3>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {emps.length} employees
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {emps.map(emp => (
                          <div key={emp.id} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedView(null); navigate(`/details/${emp.id}`); }}>
                            <span className="text-sm font-medium text-gray-700">{emp.name}</span>
                            <span className="text-xs text-gray-500">{emp.city}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color, trend }) => {
  const colors = {
    blue: 'from-cyan-500 to-blue-600',
    green: 'from-emerald-500 to-teal-600',
    purple: 'from-violet-500 to-purple-600',
    orange: 'from-orange-500 to-red-500'
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

const QuickStat = ({ label, value, clickable }) => (
  <div className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg ${clickable ? 'hover:bg-blue-50 transition' : ''}`}>
    <span className="text-sm text-gray-600">{label}</span>
    <span className="font-bold text-gray-800">{value}</span>
  </div>
);

const PayrollModal = ({ employees, stats, onClose }) => {
  const downloadReport = () => {
    const reportContent = `
╔════════════════════════════════════════════════════════════════════════════╗
║                     EMPLOYEE PAYROLL REPORT                                ║
║                     Generated: ${new Date().toLocaleDateString()}                                  ║
╚════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                            PAYROLL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Employees:        ${stats.total}
Total Payroll:          $${stats.totalSalary.toLocaleString()}
Average Salary:         $${stats.avgSalary.toLocaleString()}
Highest Salary:         $${stats.maxSalary.toLocaleString()}
Lowest Salary:          $${stats.minSalary.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        EMPLOYEE SALARY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${'Name'.padEnd(25)} ${'Designation'.padEnd(20)} ${'City'.padEnd(15)} ${'Salary'.padStart(12)}
${'─'.repeat(25)} ${'─'.repeat(20)} ${'─'.repeat(15)} ${'─'.repeat(12)}
${employees.map(emp => 
  `${(emp.name || 'N/A').padEnd(25)} ${(emp.designation || 'N/A').padEnd(20)} ${(emp.city || 'N/A').padEnd(15)} ${'$' + (parseInt(emp.salary) || 0).toLocaleString().padStart(11)}`
).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        DEPARTMENT BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${Object.entries(employees.reduce((acc, emp) => {
  const dept = emp.designation || 'Unknown';
  if (!acc[dept]) acc[dept] = { count: 0, total: 0 };
  acc[dept].count++;
  acc[dept].total += parseInt(emp.salary) || 0;
  return acc;
}, {})).map(([dept, data]) => 
  `${dept.padEnd(30)} Employees: ${String(data.count).padStart(3)}   Total: $${data.total.toLocaleString().padStart(12)}`
).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                           CITY BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${Object.entries(employees.reduce((acc, emp) => {
  const city = emp.city || 'Unknown';
  if (!acc[city]) acc[city] = { count: 0, total: 0 };
  acc[city].count++;
  acc[city].total += parseInt(emp.salary) || 0;
  return acc;
}, {})).map(([city, data]) => 
  `${city.padEnd(30)} Employees: ${String(data.count).padStart(3)}   Total: $${data.total.toLocaleString().padStart(12)}`
).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    Report Generated by Employee Management System
                              © ${new Date().getFullYear()} All Rights Reserved

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payroll_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deptBreakdown = employees.reduce((acc, emp) => {
    const dept = emp.designation || 'Unknown';
    if (!acc[dept]) acc[dept] = { count: 0, total: 0 };
    acc[dept].count++;
    acc[dept].total += parseInt(emp.salary) || 0;
    return acc;
  }, {});

  const cityBreakdown = employees.reduce((acc, emp) => {
    const city = emp.city || 'Unknown';
    if (!acc[city]) acc[city] = { count: 0, total: 0 };
    acc[city].count++;
    acc[city].total += parseInt(emp.salary) || 0;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Payroll Report</h2>
              <p className="text-blue-100">Comprehensive salary breakdown and analysis</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
              <p className="text-sm opacity-90">Total Payroll</p>
              <p className="text-2xl font-bold mt-1">${stats.totalSalary.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <p className="text-sm opacity-90">Average Salary</p>
              <p className="text-2xl font-bold mt-1">${stats.avgSalary.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
              <p className="text-sm opacity-90">Total Employees</p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Department Breakdown</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(deptBreakdown).sort((a, b) => b[1].total - a[1].total).map(([dept, data]) => (
                  <div key={dept} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{dept}</p>
                      <p className="text-xs text-gray-500">{data.count} employees</p>
                    </div>
                    <p className="font-bold text-green-600">${data.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">City Breakdown</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(cityBreakdown).sort((a, b) => b[1].total - a[1].total).map(([city, data]) => (
                  <div key={city} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{city}</p>
                      <p className="text-xs text-gray-500">{data.count} employees</p>
                    </div>
                    <p className="font-bold text-blue-600">${data.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Employee Salary Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Designation</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">City</th>
                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700">Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((emp, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm font-medium text-gray-800">{emp.name || 'N/A'}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{emp.designation || 'N/A'}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{emp.city || 'N/A'}</td>
                      <td className="px-4 py-2 text-sm font-bold text-green-600 text-right">${(parseInt(emp.salary) || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
          <button onClick={downloadReport} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
