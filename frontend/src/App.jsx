import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeDirectory from './pages/EmployeeDirectory';
import Payroll from './pages/Payroll';
import TalentManagement from './pages/TalentManagement';

export default function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['admin', 'hr', 'finance']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute roles={['admin', 'hr']}>
              <EmployeeDirectory />
            </ProtectedRoute>
          } />
          <Route path="/payroll" element={
            <ProtectedRoute roles={['admin', 'finance']}>
              <Payroll />
            </ProtectedRoute>
          } />
          <Route path="/talent" element={
            <ProtectedRoute roles={['admin', 'hr']}>
              <TalentManagement />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
