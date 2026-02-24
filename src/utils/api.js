import axios from 'axios';

const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';

export const fetchEmployeeData = async () => {
  try {
    const response = await axios.post(API_URL, {
      username: 'test',
      password: '123456'
    });
    
    console.log('API Response:', response.data);
    
    if (response.data?.TABLE_DATA?.data && Array.isArray(response.data.TABLE_DATA.data)) {
      const rawData = response.data.TABLE_DATA.data;
      
      // Transform array of arrays to array of objects
      const employees = rawData.map((row, index) => ({
        id: index + 1,
        name: row[0] || 'Unknown',
        designation: row[1] || 'N/A',
        city: row[2] || 'N/A',
        empId: row[3] || '',
        joinDate: row[4] || '',
        salary: row[5] ? row[5].replace(/[$,]/g, '') : '0'
      }));
      
      console.log('✅ Transformed', employees.length, 'employees');
      console.log('Sample:', employees[0]);
      return employees;
    }
    
    console.error('❌ Invalid data structure');
    return [];
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};
