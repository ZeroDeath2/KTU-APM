import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Download, UserCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface Student {
  id: string;
  name: string;
  registerNo: string;
  department: string;
  totalCertificates: number;
  totalPoints: number;
  lastUpload: string;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedStudents: number;
  totalStudentPoints: number;
  lastActive: string;
  students: Student[];
}

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary data - replace with actual data fetching
  const staff: Staff = {
    id: '1',
    name: 'Prof. Sarah Wilson',
    email: 'sarah.wilson@ktu.edu',
    department: 'Computer Science',
    assignedStudents: 15,
    totalStudentPoints: 450,
    lastActive: '2024-03-08',
    students: [
      {
        id: '1',
        name: 'John Doe',
        registerNo: 'KTU/2021/001',
        department: 'Computer Science',
        totalCertificates: 5,
        totalPoints: 45,
        lastUpload: '2024-03-08'
      },
      {
        id: '2',
        name: 'Jane Smith',
        registerNo: 'KTU/2021/002',
        department: 'Computer Science',
        totalCertificates: 3,
        totalPoints: 30,
        lastUpload: '2024-03-07'
      }
    ]
  };

  const handleViewStudent = (studentId: string) => {
    navigate(`/admin/students/${studentId}`);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/admin/staff')}
            className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Details</h1>
            <p className="text-gray-600 mt-1">View staff member information and assigned students.</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/admin/staff/${id}/edit`)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm font-medium"
        >
          Edit Staff Member
        </button>
      </div>

      {/* Staff Info Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100 mb-8">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Staff Information</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <UserCircle className="w-16 h-16 text-indigo-600" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{staff.name}</h3>
              <p className="text-lg text-gray-600">{staff.department}</p>
              <p className="text-gray-600">{staff.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
              <p className="text-sm font-medium text-gray-500 mb-1">Assigned Students</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                {staff.assignedStudents}
              </span>
            </div>
            <div className="p-4 rounded-lg border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
              <p className="text-sm font-medium text-gray-500 mb-1">Total Student Points</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500">
                {staff.totalStudentPoints} points
              </span>
            </div>
            <div className="p-4 rounded-lg border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
              <p className="text-sm font-medium text-gray-500 mb-1">Last Active</p>
              <p className="text-lg font-medium text-gray-900">{staff.lastActive}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Students Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Assigned Students</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Register No</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Department</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Total Certificates</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Total Points</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Last Upload</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100">
              {staff.students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.registerNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.department}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                      {student.totalCertificates}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500">
                      {student.totalPoints} points
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.lastUpload}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleViewStudent(student.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="View Student Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDetails;
