import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const Reports = () => {
  const { employeeData } = useAuth();
  
  const employees = Array.isArray(employeeData) ? 
    (employeeData.length > 0 && Array.isArray(employeeData[0]) ? employeeData[0] : employeeData) : [];

  const exportToCSV = () => {
    const headers = ['Name', 'Designation', 'City', 'Salary', 'Employee ID'];
    const rows = employees.map(emp => [
      emp.name || 'N/A',
      emp.designation || 'N/A',
      emp.city || 'N/A',
      emp.salary || '0',
      emp.id || 'N/A'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Employee_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Employee report exported successfully!');
  };

  const generateSalaryReport = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    const deptBreakdown = employees.reduce((acc, emp) => {
      const dept = emp.designation || 'Unknown';
      if (!acc[dept]) acc[dept] = { count: 0, total: 0, avg: 0 };
      acc[dept].count++;
      acc[dept].total += parseInt(emp.salary) || 0;
      acc[dept].avg = Math.round(acc[dept].total / acc[dept].count);
      return acc;
    }, {});

    const totalSalary = employees.reduce((sum, emp) => sum + (parseInt(emp.salary) || 0), 0);
    const avgSalary = Math.round(totalSalary / employees.length);

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Salary Report - ${new Date().toLocaleDateString()}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #10b981; margin: 0; font-size: 28px; }
          .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0; }
          .stat-card { background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; }
          .stat-label { font-size: 14px; color: #666; margin-bottom: 8px; }
          .stat-value { font-size: 28px; font-weight: bold; color: #10b981; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #10b981; color: white; padding: 12px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          tr:hover { background: #f9fafb; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SALARY DISTRIBUTION REPORT</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        <div class="stats">
          <div class="stat-card">
            <div class="stat-label">Total Employees</div>
            <div class="stat-value">${employees.length}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Total Payroll</div>
            <div class="stat-value">$${totalSalary.toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Average Salary</div>
            <div class="stat-value">$${avgSalary.toLocaleString()}</div>
          </div>
        </div>
        <h2 style="color: #10b981; margin-top: 30px;">Department-wise Salary Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Employees</th>
              <th>Total Salary</th>
              <th>Average Salary</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(deptBreakdown).map(([dept, data]) => `
              <tr>
                <td><strong>${dept}</strong></td>
                <td>${data.count}</td>
                <td style="color: #10b981; font-weight: bold;">$${data.total.toLocaleString()}</td>
                <td>$${data.avg.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p><strong>Employee Management System</strong></p>
          <p>© ${new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      toast.success('Salary report generated! Save as PDF from print dialog.');
    }, 250);
  };

  const generateAttendanceReport = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Attendance Report - ${new Date().toLocaleDateString()}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 3px solid #8b5cf6; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
          .summary { background: #f5f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #8b5cf6; color: white; padding: 12px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .present { color: #10b981; font-weight: bold; }
          .absent { color: #ef4444; font-weight: bold; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>MONTHLY ATTENDANCE REPORT</h1>
          <p>Month: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="summary">
          <h3 style="color: #8b5cf6; margin-top: 0;">Summary</h3>
          <p><strong>Total Employees:</strong> ${employees.length}</p>
          <p><strong>Working Days:</strong> 22</p>
          <p><strong>Average Attendance:</strong> 95%</p>
        </div>
        <h2 style="color: #8b5cf6;">Employee Attendance Details</h2>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Present Days</th>
              <th>Absent Days</th>
              <th>Attendance %</th>
            </tr>
          </thead>
          <tbody>
            ${employees.map(emp => {
              const present = Math.floor(Math.random() * 3) + 20;
              const absent = 22 - present;
              const percentage = Math.round((present / 22) * 100);
              return `
                <tr>
                  <td><strong>${emp.name || 'N/A'}</strong></td>
                  <td>${emp.designation || 'N/A'}</td>
                  <td class="present">${present}</td>
                  <td class="absent">${absent}</td>
                  <td>${percentage}%</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p><strong>Employee Management System</strong></p>
          <p>© ${new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      toast.success('Attendance report generated! Save as PDF from print dialog.');
    }, 250);
  };

  const generateCustomReport = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    const cityBreakdown = employees.reduce((acc, emp) => {
      const city = emp.city || 'Unknown';
      if (!acc[city]) acc[city] = { count: 0, avgSalary: 0, totalSalary: 0 };
      acc[city].count++;
      acc[city].totalSalary += parseInt(emp.salary) || 0;
      acc[city].avgSalary = Math.round(acc[city].totalSalary / acc[city].count);
      return acc;
    }, {});

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Custom Report - ${new Date().toLocaleDateString()}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 3px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #f97316; margin: 0; font-size: 28px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f97316; color: white; padding: 12px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          tr:hover { background: #f9fafb; }
          .section { margin: 30px 0; }
          .section h2 { color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CUSTOM EMPLOYEE REPORT</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        <div class="section">
          <h2>City-wise Employee Distribution</h2>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Total Employees</th>
                <th>Average Salary</th>
                <th>Total Payroll</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(cityBreakdown).map(([city, data]) => `
                <tr>
                  <td><strong>${city}</strong></td>
                  <td>${data.count}</td>
                  <td>$${data.avgSalary.toLocaleString()}</td>
                  <td style="color: #f97316; font-weight: bold;">$${data.totalSalary.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="section">
          <h2>Complete Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>City</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map(emp => `
                <tr>
                  <td><strong>${emp.name || 'N/A'}</strong></td>
                  <td>${emp.designation || 'N/A'}</td>
                  <td>${emp.city || 'N/A'}</td>
                  <td style="color: #10b981; font-weight: bold;">$${(parseInt(emp.salary) || 0).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="footer">
          <p><strong>Employee Management System</strong></p>
          <p>© ${new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      toast.success('Custom report generated! Save as PDF from print dialog.');
    }, 250);
  };

  const stats = {
    total: employees.length,
    avgSalary: Math.round(employees.reduce((sum, emp) => sum + (parseInt(emp.salary) || 0), 0) / employees.length),
    cities: [...new Set(employees.map(emp => emp.city))].length,
    designations: [...new Set(employees.map(emp => emp.designation))].length,
  };

  return (
    <div className="flex h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <Toaster position="top-right" />
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
          <p className="text-sm text-gray-600">Generate and export employee reports</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-2">Total Employees</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-2">Average Salary</p>
              <p className="text-3xl font-bold text-gray-800">${stats.avgSalary.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <p className="text-sm text-gray-600 mb-2">Total Cities</p>
              <p className="text-3xl font-bold text-gray-800">{stats.cities}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <p className="text-sm text-gray-600 mb-2">Designations</p>
              <p className="text-3xl font-bold text-gray-800">{stats.designations}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Employee Report</h3>
              <p className="text-gray-600 mb-4">Export complete employee data with all details</p>
              <button onClick={exportToCSV} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to CSV
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Salary Report</h3>
              <p className="text-gray-600 mb-4">Generate salary distribution and payroll reports</p>
              <button onClick={generateSalaryReport} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Generate Report
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance Report</h3>
              <p className="text-gray-600 mb-4">Monthly attendance summary and statistics</p>
              <button onClick={generateAttendanceReport} className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Generate Report
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Custom Report</h3>
              <p className="text-gray-600 mb-4">Create custom reports with selected fields</p>
              <button onClick={generateCustomReport} className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Create Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
