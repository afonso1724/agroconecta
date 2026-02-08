import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Farmers } from './pages/Farmers';
import { FarmerDetail } from './pages/FarmerDetail';
import { Validation } from './pages/Validation';
import { Logistics } from './pages/Logistics';
import { Payments } from './pages/Payments';
import { FarmRegister } from './pages/FarmRegister';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/farmers/:id" element={<FarmerDetail />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/farm-register" element={<FarmRegister />} />
        </Route>

        {/* Catch-all: redirect to home or login based on auth */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
