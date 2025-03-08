import React, { useState } from 'react';
import { Eye, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

interface Certificate {
  id: string;
  title: string;
  category: string;
  uploadDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Flagged';
  points: number;
  file: string;
}

const ViewCertificates = () => {
  const navigate = useNavigate();
  
  // Temporary data - replace with actual data fetching
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
    navigate(`/student/certificates/${certificate.id}`);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">View Certificates</h1>
        <p className="text-gray-600 mt-2">View and manage your uploaded certificates.</p>
      </div>

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
            <p className="text-gray-600">Start by uploading your certificates from the Upload section.</p>
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

export default ViewCertificates;
