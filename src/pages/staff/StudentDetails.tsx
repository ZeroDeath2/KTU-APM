import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, ArrowLeft, FileText, Download } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface Certificate {
  id: string;
  title: string;
  category: string;
  uploadDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  points: number;
  file: string;
}

interface Student {
  id: string;
  name: string;
  registerNo: string;
  department: string;
  totalCertificates: number;
  totalPoints: number;
  lastUpload: string;
}

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary data - replace with actual data fetching
  const student: Student = {
    id: '1',
    name: 'John Doe',
    registerNo: 'KTU/2021/001',
    department: 'Computer Science',
    totalCertificates: 5,
    totalPoints: 45,
    lastUpload: '2024-03-08'
  };

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'NSS Certificate',
      category: 'NSS/NCC',
      uploadDate: '2024-03-08',
      status: 'Approved',
      points: 15,
      file: '/path/to/file.pdf'
    },
    {
      id: '2',
      title: 'Technical Workshop',
      category: 'Technical Events',
      uploadDate: '2024-03-07',
      status: 'Pending',
      points: 10,
      file: '/path/to/file2.pdf'
    }
  ]);

  const handleView = (certificate: Certificate) => {
    navigate(`/staff/certificates/${certificate.id}`);
  };

  const handleDownload = (certificate: Certificate) => {
    // Handle certificate download
    console.log('Downloading certificate:', certificate);
  };

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Rejected':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      default:
        return 'bg-gradient-to-r from-orange-500 to-pink-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/staff/review')}
            className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Details</h1>
            <p className="text-gray-600 mt-1">View student certificates and activity points.</p>
          </div>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100 mb-8">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Student Name</p>
            <p className="text-lg font-medium text-gray-900">{student.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Register Number</p>
            <p className="text-lg font-medium text-gray-900">{student.registerNo}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Department</p>
            <p className="text-lg font-medium text-gray-900">{student.department}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Total Certificates</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500">
              {student.totalCertificates}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Total Points</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500">
              {student.totalPoints} points
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Last Upload</p>
            <p className="text-lg font-medium text-gray-900">{student.lastUpload}</p>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900">Uploaded Certificates</h2>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
              <FileText className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates uploaded yet!</h3>
            <p className="text-gray-600">Student hasn't uploaded any certificates.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Upload Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Points</th>
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
                    <td className="px-6 py-4 text-sm text-gray-600">{cert.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cert.uploadDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                        {cert.points} points
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleView(cert)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="View Certificate"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDownload(cert)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                          title="Download Certificate"
                        >
                          <Download className="h-5 w-5" />
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

export default StudentDetails;
