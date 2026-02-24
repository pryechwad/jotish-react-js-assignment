import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Debug = () => {
  const { employeeData } = useAuth();
  const [info, setInfo] = useState({});

  useEffect(() => {
    const debugInfo = {
      isArray: Array.isArray(employeeData),
      length: employeeData?.length || 0,
      type: typeof employeeData,
      firstItemType: employeeData?.[0] ? typeof employeeData[0] : 'N/A',
      firstItemIsArray: Array.isArray(employeeData?.[0]),
      firstItemLength: Array.isArray(employeeData?.[0]) ? employeeData[0].length : 'N/A',
      sample: employeeData?.[0]?.[0] || employeeData?.[0] || null
    };
    setInfo(debugInfo);
    console.log('DEBUG INFO:', debugInfo);
    console.log('RAW DATA:', employeeData);
  }, [employeeData]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Debug Information</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(info, null, 2)}
        </pre>
        <hr className="my-4" />
        <h2 className="font-bold mb-2">Raw Data:</h2>
        <pre className="text-xs overflow-auto max-h-96 bg-gray-50 p-4 rounded">
          {JSON.stringify(employeeData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Debug;
