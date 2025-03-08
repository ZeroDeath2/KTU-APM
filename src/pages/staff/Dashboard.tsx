import React from 'react';
import { Users, Flag, FileCheck, FileX, Upload, BarChart } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  // Temporary data - replace with actual data fetching
  const stats = [
    {
      icon: Upload,
      label: 'Total Certificates',
      value: '156',
      subtext: '+12 this week',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Flag,
      label: 'Flagged Certificates',
      value: '8',
      subtext: '5.1% of total',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: FileCheck,
      label: 'Approved Certificates',
      value: '132',
      subtext: '84.6% approved',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FileX,
      label: 'Pending Review',
      value: '16',
      subtext: '10.3% pending',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  const studentStats = [
    {
      icon: Users,
      label: 'Total Students',
      value: '245',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Upload,
      label: 'Students Uploaded',
      value: '178',
      subtext: '72.7% of total',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart,
      label: 'Average Points',
      value: '38.5',
      subtext: 'per student',
      color: 'from-teal-500 to-emerald-500'
    }
  ];

  const recentActivities = [
    {
      studentName: 'John Doe',
      action: 'Certificate Upload',
      category: 'NSS/NCC',
      timestamp: '2 hours ago',
      points: 15,
      status: 'Pending'
    },
    {
      studentName: 'Jane Smith',
      action: 'Certificate Flagged',
      category: 'Sports',
      timestamp: '3 hours ago',
      points: 10,
      status: 'Flagged'
    },
    {
      studentName: 'Mike Johnson',
      action: 'Certificate Approved',
      category: 'Technical Events',
      timestamp: '5 hours ago',
      points: 20,
      status: 'Approved'
    }
  ];

  return (
    <DashboardLayout>
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of student certificates and activity points.</p>
      </div>

      {/* Certificate Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Certificate Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`bg-gradient-to-r ${stat.color} p-4`}>
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-xl">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/80">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    {stat.subtext && (
                      <p className="text-sm font-medium text-white/60">{stat.subtext}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`bg-gradient-to-r ${stat.color} p-4`}>
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-xl">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/80">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    {stat.subtext && (
                      <p className="text-sm font-medium text-white/60">{stat.subtext}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="divide-y divide-indigo-100">
          {recentActivities.map((activity, index) => (
            <div 
              key={index} 
              className="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{activity.studentName}</h3>
                  <p className="text-sm text-gray-600">
                    {activity.action} - {activity.category}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                    activity.status === 'Approved'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : activity.status === 'Flagged'
                      ? 'bg-gradient-to-r from-red-500 to-pink-500'
                      : 'bg-gradient-to-r from-orange-500 to-pink-500'
                  }`}>
                    {activity.status}
                  </span>
                  <span className="text-sm font-medium px-4 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full">
                    {activity.points} points
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
