import React from 'react';
import { LayoutDashboard, FileCheck, FileX, Flag, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', href: '/staff/dashboard' },
    { icon: FileCheck, text: 'Review Certificates', href: '/staff/review' },
    { icon: Flag, text: 'Flagged Certificates', href: '/staff/flagged' },
    { icon: FileX, text: 'Incomplete Submissions', href: '/staff/incomplete' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">KTU Activity Points Manager</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white">
                <User className="h-5 w-5 mr-2 text-white/80" />
                <span className="text-sm font-medium">#Staff</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-0">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-xl shadow-lg h-[calc(100vh-4rem)] fixed top-16 border-r border-indigo-100 overflow-y-auto">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.text}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8 min-h-[calc(100vh-4rem)] mt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;