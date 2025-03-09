/** @jsxImportSource react */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import StudentDashboard from './pages/student/Dashboard';
import StaffDashboard from './pages/staff/Dashboard';
import ManageStudents from './pages/staff/ManageStudents';
import AddStudent from './pages/staff/AddStudent';
import EditStudent from './pages/staff/EditStudent';
import StudentDetails from './pages/staff/StudentDetails';
import StaffCertificatePreview from './pages/staff/StaffCertificatePreview';
import FlaggedCertificates from './pages/staff/FlaggedCertificates';
import IncompleteSubmissions from './pages/staff/IncompleteSubmissions';
import UploadCertificates from './pages/student/UploadCert';
import ViewCertificates from './pages/student/ViewCerts';
import CertificatePreview from './pages/student/CertificatePreview';
import RouteTransition from './components/RouteTransition';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminDashboard from './pages/admin/Dashboard';
import AdminManageStudents from './pages/admin/ManageStudents';
import AdminAddStudent from './pages/admin/AddStudent';
import AdminEditStudent from './pages/admin/EditStudent';
import AdminStudentDetails from './pages/admin/StudentDetails';
import AdminCertificatePreview from './pages/admin/CertificatePreview';
import AdminManageStaff from './pages/admin/ManageStaff';
import AdminAddStaff from './pages/admin/AddStaff';
import AdminEditStaff from './pages/admin/EditStaff';
import AdminStaffDetails from './pages/admin/StaffDetails';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedUserType }: { children: React.ReactNode, allowedUserType?: 'student' | 'staff' | 'admin' }) => {
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
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
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
              path="/staff/students" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <ManageStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/students/add" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <AddStudent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/students/:studentId/edit" 
              element={
                <ProtectedRoute allowedUserType="staff">
                  <EditStudent />
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

            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminManageStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students/add" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminAddStudent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students/:studentId/edit" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminEditStudent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students/:id" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminStudentDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/certificates/:id" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminCertificatePreview />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/staff" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminManageStaff />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/staff/add" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminAddStaff />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/staff/:id" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminStaffDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/staff/:staffId/edit" 
              element={
                <ProtectedRoute allowedUserType="admin">
                  <AdminEditStaff />
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