import axios from 'axios';

const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';

export const fetchEmployeeData = async () => {
  try {
    const response = await axios.post(API_URL, {
      username: 'test',
      password: '123456'
    });
    
    console.log('Full API Response:', response.data);
    
    // Check if response has TABLE_DATA property
    if (response.data && response.data.TABLE_DATA) {
      const tableData = response.data.TABLE_DATA;
      console.log('TABLE_DATA found:', tableData);
      
      // If TABLE_DATA is an object (not array), convert to array
      if (typeof tableData === 'object' && !Array.isArray(tableData)) {
        const employeesArray = Object.values(tableData);
        console.log('Converted to array:', employeesArray.length, 'employees');
        return employeesArray;
      }
      
      // If already array
      if (Array.isArray(tableData)) {
        console.log('Already array:', tableData.length);
        return tableData;
      }
    }
    
    console.warn('No TABLE_DATA found, returning empty array');
    return [];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
