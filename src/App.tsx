/** @jsxImportSource react */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './components/auth/Login';
import StudentDashboard from './pages/student/Dashboard';
import StaffDashboard from './pages/staff/Dashboard';
import ReviewCertificates from './pages/staff/ReviewCertificates';
import StudentDetails from './pages/staff/StudentDetails';
import StaffCertificatePreview from './pages/staff/StaffCertificatePreview';
import FlaggedCertificates from './pages/staff/FlaggedCertificates';
import IncompleteSubmissions from './pages/staff/IncompleteSubmissions';
import UploadCertificates from './pages/student/UploadCert';
import ViewCertificates from './pages/student/ViewCerts';
import CertificatePreview from './pages/student/CertificatePreview';
import RouteTransition from './components/RouteTransition';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedUserType }: { children: React.ReactNode, allowedUserType?: 'student' | 'staff' }) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteTransition>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedUserType="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/upload" 
              element={
                <ProtectedRoute allowedUserType="student">
                  <UploadCertificates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/certificates" 
              element={
                <ProtectedRoute allowedUserType="student">
                  <ViewCertificates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/certificates/:id" 
              element={
                <ProtectedRoute allowedUserType="student">
                  <CertificatePreview />
                </ProtectedRoute>
              } 
            />

            {/* Staff Routes */}
            <Route 
              path="/staff/dashboard" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <StaffDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/review" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <ReviewCertificates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/flagged" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <FlaggedCertificates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/incomplete" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <IncompleteSubmissions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/students/:id" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <StudentDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/certificates/:id" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <StaffCertificatePreview />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteTransition>
      </Router>
    </AuthProvider>
  );
}

export default App;