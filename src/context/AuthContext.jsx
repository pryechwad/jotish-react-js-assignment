import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setEmployeeData([]);
  };

  const setEmployeeDataWithLog = (data) => {
    console.log('Setting employee data in context:', data);
    setEmployeeData(data);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, employeeData, setEmployeeData: setEmployeeDataWithLog }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
