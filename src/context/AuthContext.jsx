import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [employeeData, setEmployeeData] = useState(() => {
    const saved = localStorage.getItem('employeeData');
    return saved ? JSON.parse(saved) : [];
  });

  const [employeePhotos, setEmployeePhotos] = useState(() => {
    const saved = localStorage.getItem('employeePhotos');
    return saved ? JSON.parse(saved) : {};
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setEmployeeData([]);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('employeeData');
  };

  const setEmployeeDataWithLog = (data) => {
    console.log('Setting employee data in context:', data.length);
    setEmployeeData(data);
    localStorage.setItem('employeeData', JSON.stringify(data));
  };

  const updateEmployee = (id, updatedData) => {
    const updated = employeeData.map(emp => 
      emp.id === id ? { ...emp, ...updatedData } : emp
    );
    setEmployeeDataWithLog(updated);
  };

  const deleteEmployee = (id) => {
    const filtered = employeeData.filter(emp => emp.id !== id);
    setEmployeeDataWithLog(filtered);
  };

  const updateEmployeePhoto = (id, photoUrl) => {
    const updated = { ...employeePhotos, [id]: photoUrl };
    setEmployeePhotos(updated);
    localStorage.setItem('employeePhotos', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      employeeData, 
      setEmployeeData: setEmployeeDataWithLog,
      updateEmployee,
      deleteEmployee,
      employeePhotos,
      updateEmployeePhoto
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
