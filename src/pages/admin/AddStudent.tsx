import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface StudentFormData {
  name: string;
  ktuId: string;
  department: string;
  assignedStaffId: string;
}

interface Staff {
  id: string;
  name: string;
  department: string;
}

const departments = [
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Electrical and Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
];

// Temporary staff data - replace with API call
const staffList: Staff[] = [
  { id: '1', name: 'Prof. Sarah Wilson', department: 'Computer Science and Engineering' },
  { id: '2', name: 'Prof. Michael Brown', department: 'Electronics and Communication Engineering' },
  { id: '3', name: 'Prof. Emily Davis', department: 'Mechanical Engineering' },
  { id: '4', name: 'Prof. James Wilson', department: 'Civil Engineering' },
  { id: '5', name: 'Prof. Lisa Anderson', department: 'Information Technology' },
];

const AddStudent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    ktuId: '',
    department: '',
    assignedStaffId: '',
  });

  const [staffSearch, setStaffSearch] = useState('');
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>(staffList);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter staff based on search term
    const filtered = staffList.filter(staff => 
      staff.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      staff.department.toLowerCase().includes(staffSearch.toLowerCase())
    );
    setFilteredStaff(filtered);
  }, [staffSearch]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStaffDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Add API call to create student
      console.log('Creating student with data:', formData);
      
      // Navigate back to students list after successful creation
      navigate('/admin/students');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStaffSelect = (staff: Staff) => {
    setFormData(prev => ({
      ...prev,
      assignedStaffId: staff.id
    }));
    setStaffSearch(staff.name);
    setIsStaffDropdownOpen(false);
  };

  const clearStaffSelection = () => {
    setFormData(prev => ({
      ...prev,
      assignedStaffId: ''
    }));
    setStaffSearch('');
  };

  const selectedStaff = staffList.find(staff => staff.id === formData.assignedStaffId);

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center">
        <button
          onClick={() => navigate('/admin/students')}
          className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
          <p className="text-gray-600 mt-2">Add a new student and assign a staff member.</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100 w-full max-w-2xl">
          <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter student's full name"
              />
            </div>

            <div>
              <label htmlFor="ktuId" className="block text-sm font-medium text-gray-700 mb-2">
                KTU ID
              </label>
              <input
                type="text"
                id="ktuId"
                name="ktuId"
                value={formData.ktuId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter KTU ID"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative" ref={dropdownRef}>
              <label htmlFor="staff" className="block text-sm font-medium text-gray-700 mb-2">
                Assign Staff Member
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="staff"
                  value={staffSearch}
                  onChange={(e) => {
                    setStaffSearch(e.target.value);
                    setIsStaffDropdownOpen(true);
                  }}
                  onFocus={() => setIsStaffDropdownOpen(true)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Search for staff member"
                  required
                />
                {staffSearch && (
                  <button
                    type="button"
                    onClick={clearStaffSelection}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              {isStaffDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                  {filteredStaff.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-700">No staff members found</div>
                  ) : (
                    filteredStaff.map(staff => (
                      <button
                        key={staff.id}
                        type="button"
                        onClick={() => handleStaffSelect(staff)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200"
                      >
                        <div className="font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-600">{staff.department}</div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm font-medium"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddStudent;