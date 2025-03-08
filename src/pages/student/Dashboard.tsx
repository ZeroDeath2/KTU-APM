import React from 'react';
import { Upload, FileText, Award, Clock } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  const stats = [
    { icon: Upload, label: 'Total Uploads', value: '12', color: 'from-purple-500 to-indigo-500' },
    { icon: FileText, label: 'Pending Approval', value: '3', color: 'from-orange-500 to-pink-500' },
    { icon: Award, label: 'Approved', value: '9', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'Activity Points', value: '45', color: 'from-blue-500 to-cyan-500' },
  ];

  const recentActivities = [
    { title: 'NSS Certificate', status: 'Approved', date: '2024-02-20', points: 15 },
    { title: 'Sports Meet Certificate', status: 'Pending', date: '2024-02-18', points: 10 },
    { title: 'Workshop Certificate', status: 'Approved', date: '2024-02-15', points: 20 },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, #Student!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your activity points and certificates.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="divide-y divide-indigo-100">
          {recentActivities.map((activity, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    activity.status === 'Approved' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
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