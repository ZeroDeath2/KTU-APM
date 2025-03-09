import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface StaffFormData {
  name: string;
  email: string;
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

const EditStaff: React.FC = () => {
  const navigate = useNavigate();
  const { staffId } = useParams();
  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    email: '',
    department: '',
  });

  const [error, setError] = useState<string>('');

  useEffect(() => {
    // TODO: Fetch staff data
    // This is a placeholder. Replace with actual API call
    const fetchStaffData = async () => {
      try {
        // Simulating API call with dummy data
        const staffData = {
          name: 'Prof. Sarah Wilson',
          email: 'sarah.wilson@ktu.edu',
          department: 'Computer Science and Engineering',
        };
        setFormData(staffData);
      } catch (error) {
        console.error('Error fetching staff data:', error);
        setError('Failed to load staff data');
        navigate('/admin/staff');
      }
    };

    if (staffId) {
      fetchStaffData();
    }
  }, [staffId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // TODO: Add API call to update staff
      console.log('Updating staff with data:', { ...formData, staffId });
      
      // Navigate back to staff list after successful update
      navigate('/admin/staff');
    } catch (error) {
      console.error('Error updating staff:', error);
      setError('Failed to update staff member. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center">
        <button
          onClick={() => navigate('/admin/staff')}
          className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Staff Member</h1>
          <p className="text-gray-600 mt-2">Update staff member information.</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100 w-full max-w-2xl">
          <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-semibold text-gray-900">Staff Information</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

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
                placeholder="Enter staff member's full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter staff member's email"
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

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm font-medium"
              >
                Update Staff Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditStaff;
