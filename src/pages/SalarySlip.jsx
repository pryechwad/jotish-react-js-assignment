import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMemo } from 'react';

const SalarySlip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employeeData } = useAuth();
  
  const employees = useMemo(() => {
    if (!employeeData || !Array.isArray(employeeData)) return [];
    if (employeeData.length > 0 && Array.isArray(employeeData[0])) {
      return employeeData[0];
    }
    return employeeData;
  }, [employeeData]);
  
  const employee = employees.find(emp => emp.id === parseInt(id));

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Not Found</h2>
          <button onClick={() => navigate('/list')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentMonth = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  
  const salary = parseInt(employee.salary || 0);
  const basicSalary = Math.round(salary * 0.5);
  const hra = Math.round(salary * 0.2);
  const allowances = Math.round(salary * 0.15);
  const bonus = Math.round(salary * 0.15);
  
  const grossSalary = basicSalary + hra + allowances + bonus;
  const providentFund = Math.round(grossSalary * 0.12);
  const tax = Math.round(grossSalary * 0.1);
  const totalDeductions = providentFund + tax;
  const netSalary = grossSalary - totalDeductions;

  return (
    <div className="min-h-screen bg-gray-100 p-4 print:p-0 print:bg-white">
      {/* Print Button - Hidden in print */}
      <div className="max-w-4xl mx-auto mb-4 print:hidden">
        <div className="flex gap-2 justify-end">
          <button onClick={() => navigate('/list')} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Back to List
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Print Salary Slip
          </button>
        </div>
      </div>

      {/* Salary Slip */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        {/* Header */}
        <div className="border-4 border-blue-600 p-8">
          <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">JOTISH EMS</h1>
            <p className="text-gray-600 text-sm">Employee Management System</p>
            <p className="text-gray-600 text-sm">123 Business Street, Corporate City, CC 12345</p>
            <p className="text-gray-600 text-sm">Phone: (555) 123-4567 | Email: hr@jotishems.com</p>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">SALARY SLIP</h2>
            <p className="text-gray-600">For the month of {currentMonth}</p>
          </div>

          {/* Employee Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded">
            <div>
              <p className="text-sm text-gray-600">Employee Name</p>
              <p className="font-bold text-gray-800">{employee.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Employee ID</p>
              <p className="font-bold text-gray-800">{employee.empId || employee.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Designation</p>
              <p className="font-bold text-gray-800">{employee.designation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="font-bold text-gray-800">Operations</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-bold text-gray-800">{employee.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Joining</p>
              <p className="font-bold text-gray-800">{employee.joinDate || 'N/A'}</p>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-blue-700 p-3 text-left">EARNINGS</th>
                  <th className="border border-blue-700 p-3 text-right">AMOUNT ($)</th>
                  <th className="border border-blue-700 p-3 text-left">DEDUCTIONS</th>
                  <th className="border border-blue-700 p-3 text-right">AMOUNT ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">Basic Salary</td>
                  <td className="border border-gray-300 p-3 text-right font-semibold">{basicSalary.toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">Provident Fund (12%)</td>
                  <td className="border border-gray-300 p-3 text-right font-semibold">{providentFund.toLocaleString()}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">House Rent Allowance</td>
                  <td className="border border-gray-300 p-3 text-right font-semibold">{hra.toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">Income Tax (10%)</td>
                  <td className="border border-gray-300 p-3 text-right font-semibold">{tax.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Special Allowance</td>
                  <td className="border border-gray-300 p-3 text-right font-semibold">{allowances.toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">-</td>
                  <td className="border border-gray-300 p-3 text-right">-</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Performance Bonus</td>
                  <td className="border border-gray-300 p-3 text-right font-semibold">{bonus.toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">-</td>
                  <td className="border border-gray-300 p-3 text-right">-</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border border-gray-300 p-3">GROSS EARNINGS</td>
                  <td className="border border-gray-300 p-3 text-right">{grossSalary.toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">TOTAL DEDUCTIONS</td>
                  <td className="border border-gray-300 p-3 text-right">{totalDeductions.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Net Salary */}
          <div className="bg-green-600 text-white p-4 rounded mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">NET SALARY (Take Home)</p>
                <p className="text-3xl font-bold">${netSalary.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">In Words</p>
                <p className="text-lg font-semibold">{numberToWords(netSalary)} Dollars Only</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-600 mb-2">Generated on: {currentDate}</p>
                <p className="text-xs text-gray-500 italic">This is a computer-generated document and does not require a signature.</p>
              </div>
              <div className="text-right">
                <div className="border-t-2 border-gray-800 inline-block px-8 pt-2">
                  <p className="text-sm font-semibold">Authorized Signatory</p>
                  <p className="text-xs text-gray-600">HR Department</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-xs font-semibold text-gray-800 mb-2">IMPORTANT NOTES:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• This salary slip is confidential and should not be shared with unauthorized persons.</li>
              <li>• Please verify all details and report any discrepancies to HR within 7 days.</li>
              <li>• Salary is credited to your registered bank account on the last working day of the month.</li>
              <li>• For queries, contact HR at hr@jotishems.com or call (555) 123-4567.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0.5cm;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to convert number to words
function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (num === 0) return 'Zero';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
  if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
  if (num < 1000000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
  
  return num.toLocaleString();
}

export default SalarySlip;
