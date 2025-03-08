import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flag, ArrowLeft } from 'lucide-react';
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

const CertificatePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary data - replace with actual data fetching
  const certificate: Certificate = {
    id: '1',
    title: 'NSS Certificate',
    category: 'NSS/NCC',
    uploadDate: '2024-03-08',
    status: 'Approved',
    points: 15,
    file: '/path/to/file.pdf'
  };

  const handleFlagIncorrect = () => {
    // Handle flagging certificate as incorrect
    console.log('Flagging certificate as incorrect:', id);
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

  const details = [
    { label: 'Certificate Title', value: certificate.title, type: 'text' },
    { label: 'Category', value: certificate.category, type: 'text' },
    { 
      label: 'Points', 
      value: `${certificate.points} points`, 
      type: 'badge',
      className: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    { 
      label: 'Status', 
      value: certificate.status, 
      type: 'badge',
      className: getStatusColor(certificate.status)
    },
    { label: 'Upload Date', value: certificate.uploadDate, type: 'text' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/student/certificates')}
            className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Certificate Details</h1>
            <p className="text-gray-600 mt-1">View certificate information and details.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
        <div className="flex">
          {/* Certificate Preview - Left Side */}
          <div className="w-1/2 border-r border-indigo-100">
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80"
                alt="Certificate Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Certificate Details - Right Side */}
          <div className="w-1/2 p-8">
            <div className="grid grid-cols-2 gap-6">
              {details.map((detail, index) => (
                <div
                  key={index}
                  className={`p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-indigo-100 ${
                    index === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <label className="block text-sm font-medium text-gray-500 mb-2">{detail.label}</label>
                  {detail.type === 'badge' ? (
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white ${detail.className}`}>
                      {detail.value}
                    </span>
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{detail.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={handleFlagIncorrect}
                className="inline-flex items-center px-6 py-3 border border-red-500 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
              >
                <Flag className="h-5 w-5 mr-2" />
                Flag as Incorrect
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertificatePreview;
