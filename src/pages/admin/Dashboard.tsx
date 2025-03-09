import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Manage Students',
      description: 'View and manage all students in the system',
      icon: GraduationCap,
      href: '/admin/students',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Manage Staff',
      description: 'View and manage staff members',
      icon: Users,
      href: '/admin/staff',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the admin dashboard. Manage your institution's students and staff.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => navigate(card.href)}
            className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${card.gradient} mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </button>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">250</div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <div className="text-3xl font-bold text-emerald-600 mb-2">15</div>
            <div className="text-gray-600">Staff Members</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <div className="text-3xl font-bold text-indigo-600 mb-2">85%</div>
            <div className="text-gray-600">Activity Points Completion</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;