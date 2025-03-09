import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface StudentFormData {
  name: string;
  ktuId: string;
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

const AddStudent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    ktuId: '',
    department: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const staffId = localStorage.getItem('userId'); // Get staff ID from local storage
    
    try {
      // TODO: Add API call to create student
      console.log('Creating student with data:', { ...formData, staffId });
      
      // Navigate back to students list after successful creation
      navigate('/staff/students');
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

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center">
        <button
          onClick={() => navigate('/staff/students')}
          className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
          <p className="text-gray-600 mt-2">Add a new student to your assigned list.</p>
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