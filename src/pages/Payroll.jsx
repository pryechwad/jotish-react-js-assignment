import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const Payroll = () => {
  const navigate = useNavigate();
  const { employeeData } = useAuth();

  const employees = useMemo(() => {
    if (!employeeData || !Array.isArray(employeeData)) return [];
    if (employeeData.length > 0 && Array.isArray(employeeData[0])) {
      return employeeData[0];
    }
    return employeeData;
  }, [employeeData]);

  const stats = useMemo(() => {
    if (employees.length === 0) {
      return { total: 0, avgSalary: 0, totalSalary: 0, maxSalary: 0, minSalary: 0 };
    }
    const totalSalary = employees.reduce((sum, emp) => sum + (parseInt(emp.salary) || 0), 0);
    const salaries = employees.map(e => parseInt(e.salary) || 0);
    const maxSalary = Math.max(...salaries);
    const minSalary = Math.min(...salaries);

    return {
      total: employees.length,
      avgSalary: employees.length ? Math.round(totalSalary / employees.length) : 0,
      totalSalary,
      maxSalary,
      minSalary
    };
  }, [employees]);

  const deptBreakdown = useMemo(() => {
    return employees.reduce((acc, emp) => {
      const dept = emp.designation || 'Unknown';
      if (!acc[dept]) acc[dept] = { count: 0, total: 0 };
      acc[dept].count++;
      acc[dept].total += parseInt(emp.salary) || 0;
      return acc;
    }, {});
  }, [employees]);

  const cityBreakdown = useMemo(() => {
    return employees.reduce((acc, emp) => {
      const city = emp.city || 'Unknown';
      if (!acc[city]) acc[city] = { count: 0, total: 0 };
      acc[city].count++;
      acc[city].total += parseInt(emp.salary) || 0;
      return acc;
    }, {});
  }, [employees]);

  const downloadReport = () => {
    // Create a printable HTML document
    const printWindow = window.open('', '', 'width=800,height=600');
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payroll Report - ${new Date().toLocaleDateString()}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #2563eb; margin: 0; font-size: 28px; }
          .header p { color: #666; margin: 5px 0; }
          .section { margin: 30px 0; }
          .section-title { background: #2563eb; color: white; padding: 10px; font-size: 18px; font-weight: bold; margin-bottom: 15px; }
          .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
          .stat-card { background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; }
          .stat-label { font-size: 12px; color: #666; margin-bottom: 5px; }
          .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 12px; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
          tr:hover { background: #f9fafb; }
          .breakdown-item { display: flex; justify-content: space-between; padding: 10px; background: #f9fafb; margin: 5px 0; border-radius: 5px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #666; font-size: 12px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>EMPLOYEE PAYROLL REPORT</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>Employee Management System</p>
        </div>

        <div class="section">
          <div class="section-title">PAYROLL SUMMARY</div>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Employees</div>
              <div class="stat-value">${stats.total}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Payroll</div>
              <div class="stat-value">$${stats.totalSalary.toLocaleString()}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Average Salary</div>
              <div class="stat-value">$${stats.avgSalary.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">EMPLOYEE SALARY DETAILS</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>City</th>
                <th style="text-align: right;">Salary</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map(emp => `
                <tr>
                  <td><strong>${emp.name || 'N/A'}</strong></td>
                  <td>${emp.designation || 'N/A'}</td>
                  <td>${emp.city || 'N/A'}</td>
                  <td style="text-align: right; color: #059669; font-weight: bold;">$${(parseInt(emp.salary) || 0).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">DEPARTMENT BREAKDOWN</div>
          ${Object.entries(deptBreakdown).sort((a, b) => b[1].total - a[1].total).map(([dept, data]) => `
            <div class="breakdown-item">
              <div>
                <strong>${dept}</strong>
                <span style="color: #666; font-size: 12px; margin-left: 10px;">${data.count} employees</span>
              </div>
              <div style="color: #059669; font-weight: bold;">$${data.total.toLocaleString()}</div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">CITY BREAKDOWN</div>
          ${Object.entries(cityBreakdown).sort((a, b) => b[1].total - a[1].total).map(([city, data]) => `
            <div class="breakdown-item">
              <div>
                <strong>${city}</strong>
                <span style="color: #666; font-size: 12px; margin-left: 10px;">${data.count} employees</span>
              </div>
              <div style="color: #2563eb; font-weight: bold;">$${data.total.toLocaleString()}</div>
            </div>
          `).join('')}
        </div>

        <div class="footer">
          <p><strong>Employee Management System</strong></p>
          <p>© ${new Date().getFullYear()} All Rights Reserved</p>
          <p>This is a computer-generated report and does not require a signature.</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.print();
      toast.success('Print dialog opened! Save as PDF from print options.');
    }, 250);
  };

  return (
    <div className="flex h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <Toaster position="top-right" />
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Payroll Management</h2>
              <p className="text-blue-100">Comprehensive salary breakdown and analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={downloadReport} className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold flex items-center gap-2 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </button>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">A</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {employees.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Payroll Data</h3>
              <p className="text-gray-600 mb-6">Please login again to load employee data</p>
              <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Go to Login
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">Total Payroll</p>
                  <p className="text-3xl font-bold mt-1">${stats.totalSalary.toLocaleString()}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">Average Salary</p>
                  <p className="text-3xl font-bold mt-1">${stats.avgSalary.toLocaleString()}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">Total Employees</p>
                  <p className="text-3xl font-bold mt-1">{stats.total}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Department Breakdown
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {Object.entries(deptBreakdown).sort((a, b) => b[1].total - a[1].total).map(([dept, data]) => (
                      <div key={dept} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition">
                        <div>
                          <p className="font-bold text-gray-800">{dept}</p>
                          <p className="text-sm text-gray-600">{data.count} employees</p>
                        </div>
                        <p className="text-xl font-bold text-green-600">${data.total.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    City Breakdown
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {Object.entries(cityBreakdown).sort((a, b) => b[1].total - a[1].total).map(([city, data]) => (
                      <div key={city} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition">
                        <div>
                          <p className="font-bold text-gray-800">{city}</p>
                          <p className="text-sm text-gray-600">{data.count} employees</p>
                        </div>
                        <p className="text-xl font-bold text-blue-600">${data.total.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Employee Salary Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Designation</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">City</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Salary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {employees.map((emp, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm font-semibold text-gray-800">{emp.name || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{emp.designation || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{emp.city || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">${(parseInt(emp.salary) || 0).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payroll;
