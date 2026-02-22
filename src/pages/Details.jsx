import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employeeData } = useAuth();
  const employee = employeeData[id];

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Not Found</h2>
          <button
            onClick={() => navigate('/list')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/list')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            ← Back to List
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{employee.name}</h1>
            <p className="text-blue-100 text-lg">{employee.designation}</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <DetailItem label="Employee ID" value={employee.id || 'N/A'} />
                <DetailItem label="Designation" value={employee.designation} />
                <DetailItem label="City" value={employee.city} />
              </div>
              <div className="space-y-4">
                <DetailItem label="Salary" value={`$${employee.salary}`} className="text-green-600 font-bold" />
                <DetailItem label="Department" value={employee.department || 'N/A'} />
                <DetailItem label="Email" value={employee.email || 'N/A'} />
              </div>
            </div>

            <div className="border-t pt-6">
              <button
                onClick={() => navigate('/camera')}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center gap-2"
              >
                📷 Capture Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, className = '' }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`text-lg font-medium text-gray-800 ${className}`}>{value}</p>
  </div>
);

export default Details;
