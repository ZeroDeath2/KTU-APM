import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, FileText, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

interface FlaggedCertificate {
  id: string;
  title: string;
  studentName: string;
  category: string;
  points: number;
  uploadDate: string;
}

const FlaggedCertificates = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof FlaggedCertificate>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Temporary data - replace with actual data fetching
  const [certificates, setCertificates] = useState<FlaggedCertificate[]>([
    {
      id: '1',
      title: 'NSS Certificate',
      studentName: 'John Doe',
      category: 'NSS/NCC',
      points: 15,
      uploadDate: '2024-03-08'
    },
    {
      id: '2',
      title: 'Technical Workshop',
      studentName: 'Jane Smith',
      category: 'Technical Events',
      points: 10,
      uploadDate: '2024-03-07'
    },
    {
      id: '3',
      title: 'Sports Meet',
      studentName: 'Mike Johnson',
      category: 'Sports',
      points: 20,
      uploadDate: '2024-03-06'
    }
  ]);

  const handleSort = (field: keyof FlaggedCertificate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }

    const sortedCertificates = [...certificates].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setCertificates(sortedCertificates);
  };

  const getSortIcon = (field: keyof FlaggedCertificate) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const handleView = (certificateId: string) => {
    navigate(`/staff/certificates/${certificateId}`);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Flagged Certificates</h1>
        <p className="text-gray-600 mt-2">Review and manage certificates that have been flagged for review.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Certificates Under Review</h2>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
              <FileText className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No flagged certificates!</h3>
            <p className="text-gray-600">There are no certificates that require review at this time.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('title')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Certificate Name</span>
                      {getSortIcon('title')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('studentName')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Student Name</span>
                      {getSortIcon('studentName')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('category')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Category</span>
                      {getSortIcon('category')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('points')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Expected Points</span>
                      {getSortIcon('points')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleSort('uploadDate')}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span>Upload Date</span>
                      {getSortIcon('uploadDate')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100">
                {certificates.map((cert) => (
                  <tr
                    key={cert.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cert.studentName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cert.category}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                        {cert.points} points
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cert.uploadDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleView(cert.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="View Certificate"
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

export default FlaggedCertificates;
