import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import List from './pages/List';
import Details from './pages/Details';
import Camera from './pages/Camera';
import PhotoResult from './pages/PhotoResult';
import Chart from './pages/Chart';
import Map from './pages/Map';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
          <Route
            path="/camera"
            element={
              <ProtectedRoute>
                <Camera />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photo-result"
            element={
              <ProtectedRoute>
                <PhotoResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chart"
            element={
              <ProtectedRoute>
                <Chart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
