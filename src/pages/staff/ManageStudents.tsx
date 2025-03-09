import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, FileText, ArrowUpDown, UserPlus, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const ManageStudents = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof Student>('totalPoints');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Temporary data - replace with actual data fetching
  const [students, setStudents] = useState<Student[]>([
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
      department: 'Electronics',
      totalCertificates: 3,
      totalPoints: 25,
      lastUpload: '2024-03-07'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      registerNo: 'KTU/2021/003',
      department: 'Mechanical',
      totalCertificates: 7,
      totalPoints: 65,
      lastUpload: '2024-03-06'
    }
  ]);

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }

    const sortedStudents = [...students].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setStudents(sortedStudents);
  };

  const getSortIcon = (field: keyof Student) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const handleView = (studentId: string) => {
    navigate(`/staff/students/${studentId}`);
  };

  const handleEdit = (studentId: string) => {
    navigate(`/staff/students/${studentId}/edit`);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
          <p className="text-gray-600 mt-2">Review and manage student certificates and activity points.</p>
        </div>
        <button
          onClick={() => navigate('/staff/students/add')}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm text-lg font-medium"
        >
          <UserPlus className="h-6 w-6 mr-2" />
          Add Students
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Assigned Students</h2>
        </div>

        {students.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
              <FileText className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students assigned yet!</h3>
            <p className="text-gray-600">Students will appear here once they are assigned to you.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Student Name</span>
                      {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Register No</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('totalCertificates')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Total Certificates</span>
                      {getSortIcon('totalCertificates')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('totalPoints')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Total Points</span>
                      {getSortIcon('totalPoints')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Last Upload</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100">
                {students.map((student) => (
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
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(student.id)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                          title="Edit Student"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleView(student.id)}
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageStudents;
