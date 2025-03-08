import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Plus, CheckCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface FileUpload {
  file: File;
  preview: string;
  title: string;
  category: string;
  points: string;
}

const UploadCertificates = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'NSS/NCC',
    'Sports',
    'Cultural Activities',
    'Professional Development',
    'Technical Events',
    'Other'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    newFiles.forEach(file => {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles(prev => [...prev, {
            file,
            preview: file.type.startsWith('image/') ? e.target?.result as string : '/pdf-icon.png',
            title: '',
            category: '',
            points: ''
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateFileDetails = (index: number, field: keyof FileUpload, value: string) => {
    setFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, [field]: value } : file
    ));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting files:', files);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Certificates</h1>
        <p className="text-gray-600 mt-2">Upload your certificates and documents to earn activity points.</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drag and drop your certificates here
          </h3>
          <p className="text-gray-500 mb-4">or</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            multiple
            accept="image/*,application/pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium"
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-indigo-100">
          <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-semibold text-gray-900">Uploaded Documents</h2>
          </div>
          <div className="divide-y divide-indigo-100">
            {files.map((file, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {file.file.type.startsWith('image/') ? (
                      <img src={file.preview} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={file.title}
                        onChange={(e) => updateFileDetails(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter certificate title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={file.category}
                        onChange={(e) => updateFileDetails(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                      <input
                        type="number"
                        value={file.points}
                        onChange={(e) => updateFileDetails(index, 'points', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Expected points"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-indigo-100">
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium flex items-center justify-center"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Submit Certificates
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UploadCertificates;