import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { useMemo } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = () => {
  const navigate = useNavigate();
  const { employeeData } = useAuth();

  const employees = useMemo(() => {
    if (!employeeData || !Array.isArray(employeeData)) return [];
    if (employeeData.length > 0 && Array.isArray(employeeData[0])) {
      return employeeData[0];
    }
    return employeeData;
  }, [employeeData]);

  const cityCoordinates = {
    'New York': [40.7128, -74.0060],
    'Los Angeles': [34.0522, -118.2437],
    'Chicago': [41.8781, -87.6298],
    'Houston': [29.7604, -95.3698],
    'Phoenix': [33.4484, -112.0740],
    'Philadelphia': [39.9526, -75.1652],
    'San Antonio': [29.4241, -98.4936],
    'San Diego': [32.7157, -117.1611],
    'Dallas': [32.7767, -96.7970],
    'San Jose': [37.3382, -121.8863],
    'Austin': [30.2672, -97.7431],
    'Jacksonville': [30.3322, -81.6557],
    'Mumbai': [19.0760, 72.8777],
    'Delhi': [28.7041, 77.1025],
    'Bangalore': [12.9716, 77.5946],
    'Hyderabad': [17.3850, 78.4867],
    'Chennai': [13.0827, 80.2707],
    'Kolkata': [22.5726, 88.3639],
    'Pune': [18.5204, 73.8567],
    'Ahmedabad': [23.0225, 72.5714]
  };

  const cityEmployeeCounts = employees.reduce((acc, emp) => {
    if (emp.city) {
      if (!acc[emp.city]) {
        acc[emp.city] = { count: 0, employees: [] };
      }
      acc[emp.city].count++;
      acc[emp.city].employees.push(emp);
    }
    return acc;
  }, {});

  const markers = Object.entries(cityEmployeeCounts)
    .filter(([city]) => cityCoordinates[city])
    .map(([city, data]) => ({
      city,
      position: cityCoordinates[city],
      count: data.count,
      employees: data.employees
    }));

  return (
    <div className="flex h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <Toaster position="top-right" />
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Employee Location Map</h2>
              <p className="text-sm text-gray-600">Geographic distribution of employees across cities</p>
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="h-[500px] md:h-[600px]">
              <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.map((marker, index) => (
                  <Marker key={index} position={marker.position}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg mb-2">{marker.city}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {marker.count} employee{marker.count > 1 ? 's' : ''}
                        </p>
                        <div className="max-h-40 overflow-y-auto">
                          {marker.employees.slice(0, 5).map((emp, i) => (
                            <div key={i} className="text-xs py-1 border-t">
                              <p className="font-medium">{emp.name}</p>
                              <p className="text-gray-500">{emp.designation}</p>
                            </div>
                          ))}
                          {marker.count > 5 && (
                            <p className="text-xs text-gray-500 mt-1">
                              +{marker.count - 5} more...
                            </p>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">City Distribution</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(cityEmployeeCounts)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([city, data], index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-purple-200 hover:shadow-lg transition">
                    <p className="font-semibold text-gray-800">{city}</p>
                    <p className="text-2xl font-bold text-blue-600">{data.count}</p>
                    <p className="text-xs text-gray-500">employees</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
