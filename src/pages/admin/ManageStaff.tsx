import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, FileText, ArrowUpDown, UserPlus, Pencil, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

interface Staff {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedStudents: number;
  totalStudentPoints: number;
  lastActive: string;
}

interface DeleteConfirmationProps {
  isOpen: boolean;
  staffName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ isOpen, staffName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Staff Member</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold text-gray-900">{staffName}</span>? 
          This action cannot be undone. All assigned students will need to be reassigned to other staff members.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200"
          >
            Delete Staff Member
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageStaff = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof Staff>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Temporary data - replace with actual data fetching
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: '1',
      name: 'Prof. Sarah Wilson',
      email: 'sarah.wilson@ktu.edu',
      department: 'Computer Science',
      assignedStudents: 15,
      totalStudentPoints: 450,
      lastActive: '2024-03-08'
    },
    {
      id: '2',
      name: 'Prof. Michael Brown',
      email: 'michael.brown@ktu.edu',
      department: 'Electronics',
      assignedStudents: 12,
      totalStudentPoints: 380,
      lastActive: '2024-03-07'
    },
    {
      id: '3',
      name: 'Prof. Emily Davis',
      email: 'emily.davis@ktu.edu',
      department: 'Mechanical',
      assignedStudents: 18,
      totalStudentPoints: 520,
      lastActive: '2024-03-08'
    }
  ]);

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; staffId: string; staffName: string; }>({
    isOpen: false,
    staffId: '',
    staffName: ''
  });

  const handleSort = (field: keyof Staff) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }

    const sortedStaff = [...staffList].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      // Handle different types of values
      if (field === 'lastActive') {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return sortDirection === 'asc' 
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      } else if (typeof aValue === 'number') {
        return sortDirection === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      } else {
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        if (sortDirection === 'asc') {
          return aString < bString ? -1 : aString > bString ? 1 : 0;
        } else {
          return bString < aString ? -1 : bString > aString ? 1 : 0;
        }
      }
    });

    setStaffList(sortedStaff);
  };

  const getSortIcon = (field: keyof Staff) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const handleView = (staffId: string) => {
    navigate(`/admin/staff/${staffId}`);
  };

  const handleEdit = (staffId: string) => {
    navigate(`/admin/staff/${staffId}/edit`);
  };

  const handleDeleteClick = (staff: Staff) => {
    setDeleteConfirmation({
      isOpen: true,
      staffId: staff.id,
      staffName: staff.name
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      // TODO: Add API call to delete staff
      console.log('Deleting staff:', deleteConfirmation.staffId);
      
      // Remove staff from local state
      setStaffList(staffList.filter(staff => staff.id !== deleteConfirmation.staffId));
      
      // Close confirmation dialog
      setDeleteConfirmation({ isOpen: false, staffId: '', staffName: '' });
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, staffId: '', staffName: '' });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Staff</h1>
          <p className="text-gray-600 mt-2">Add and manage staff members who oversee student activity points.</p>
        </div>
        <button
          onClick={() => navigate('/admin/staff/add')}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm text-lg font-medium"
        >
          <UserPlus className="h-6 w-6 mr-2" />
          Add Staff
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Staff Members</h2>
        </div>

        {staffList.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members yet!</h3>
            <p className="text-gray-600">Add staff members to start managing student activity points.</p>
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
                      <span>Staff Name</span>
                      {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('assignedStudents')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Assigned Students</span>
                      {getSortIcon('assignedStudents')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('totalStudentPoints')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Total Points</span>
                      {getSortIcon('totalStudentPoints')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('lastActive')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Last Active</span>
                      {getSortIcon('lastActive')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100">
                {staffList.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{staff.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{staff.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{staff.department}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                        {staff.assignedStudents}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500">
                        {staff.totalStudentPoints} points
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{staff.lastActive}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(staff.id)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                          title="Edit Staff Member"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleView(staff.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="View Staff Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(staff)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete Staff Member"
                        >
                          <Trash2 className="h-5 w-5" />
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

      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        staffName={deleteConfirmation.staffName}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </DashboardLayout>
  );
};

export default ManageStaff;