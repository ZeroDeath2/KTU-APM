import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flag, ArrowLeft, CheckCircle, XCircle, FileEdit, Save, UserCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface Certificate {
  id: string;
  title: string;
  category: string;
  uploadDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Flagged';
  points: number;
  file: string;
  studentName: string;
  assignedStaff: {
    id: string;
    name: string;
    department: string;
    email: string;
  };
}

type EditableField = 'title' | 'category' | 'points';

interface DetailField {
  label: string;
  value: string | number;
  type: 'text' | 'badge';
  className?: string;
  editable?: boolean;
  field?: EditableField;
}

interface EditedData {
  title: string;
  category: string;
  points: number;
}

const CertificatePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditedData>({
    title: '',
    category: '',
    points: 0
  });

  // Temporary data - replace with actual data fetching
  const certificate: Certificate = {
    id: '1',
    title: 'NSS Certificate',
    category: 'NSS/NCC',
    uploadDate: '2024-03-08',
    status: 'Flagged',
    points: 15,
    file: '/path/to/file.pdf',
    studentName: 'John Doe',
    assignedStaff: {
      id: '1',
      name: 'Prof. Sarah Wilson',
      department: 'Computer Science',
      email: 'sarah.wilson@ktu.edu'
    }
  };

  const handleAccept = () => {
    // Handle accepting certificate
    console.log('Accepting certificate:', id);
    // Navigate back after action
    navigate(-1);
  };

  const handleReject = () => {
    // Handle rejecting certificate
    console.log('Rejecting certificate:', id);
    // Navigate back after action
    navigate(-1);
  };

  const handleFlagIncorrect = () => {
    // Handle flagging certificate as incorrect
    console.log('Flagging certificate as incorrect:', id);
  };

  const handleManualEntry = () => {
    setIsEditing(true);
    setEditedData({
      title: certificate.title,
      category: certificate.category,
      points: certificate.points
    });
  };

  const handleSaveChanges = () => {
    // Handle saving changes
    console.log('Saving changes:', editedData);
    setIsEditing(false);
  };

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Rejected':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'Flagged':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default:
        return 'bg-gradient-to-r from-orange-500 to-pink-500';
    }
  };

  const details: DetailField[] = [
    { 
      label: 'Certificate Title', 
      value: certificate.title, 
      type: 'text',
      editable: true,
      field: 'title' 
    },
    { 
      label: 'Category', 
      value: certificate.category, 
      type: 'text',
      editable: true,
      field: 'category'
    },
    { 
      label: 'Points', 
      value: certificate.points, 
      type: 'badge',
      className: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      editable: true,
      field: 'points'
    },
    { 
      label: 'Status', 
      value: certificate.status, 
      type: 'badge',
      className: getStatusColor(certificate.status),
      editable: false
    },
    { 
      label: 'Upload Date', 
      value: certificate.uploadDate, 
      type: 'text',
      editable: false
    }
  ];

  const handleInputChange = (field: EditableField, value: string | number) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderInput = (detail: DetailField) => {
    if (!detail.field) return null;

    if (detail.field === 'points') {
      return (
        <input
          type="number"
          value={editedData.points}
          onChange={(e) => handleInputChange(detail.field as EditableField, parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="0"
        />
      );
    }

    return (
      <input
        type="text"
        value={editedData[detail.field]}
        onChange={(e) => handleInputChange(detail.field as EditableField, e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Certificate Details</h1>
            <p className="text-gray-600 mt-1">Review certificate information and details.</p>
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
            <div className="p-4 border-t border-indigo-100">
              <div className="flex justify-center space-x-2">
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <XCircle className="h-5 w-5" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={handleFlagIncorrect}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <Flag className="h-5 w-5" />
                  <span>Flag</span>
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Details - Right Side */}
          <div className="w-1/2 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Certificate Information</h2>
                {isEditing ? (
                  <button
                    onClick={handleSaveChanges}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                ) : (
                  <button
                    onClick={handleManualEntry}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <FileEdit className="h-5 w-5" />
                    <span>Edit Details</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {details.map((detail, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 ${
                      detail.type === 'badge' ? 'col-span-1' : index === 0 ? 'col-span-2' : 'col-span-1'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-500 mb-2">{detail.label}</p>
                    {isEditing && detail.editable ? (
                      renderInput(detail)
                    ) : (
                      detail.type === 'badge' ? (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${detail.className}`}>
                          {detail.value}
                        </span>
                      ) : (
                        <p className="text-lg font-medium text-gray-900">{detail.value}</p>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Information */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Staff</h2>
              <div className="p-4 rounded-lg border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate">
                      {certificate.assignedStaff.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {certificate.assignedStaff.department}
                    </p>
                    <p className="text-sm text-gray-500">
                      {certificate.assignedStaff.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertificatePreview;
