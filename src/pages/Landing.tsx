import React, { useState, useRef } from 'react';
import { GraduationCap, Menu, X, Upload, FileCheck, BarChart, Users, ClipboardList, Award, Clock, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const studentRef = useRef<HTMLDivElement>(null);
  const staffRef = useRef<HTMLDivElement>(null);

  const handleDownloadGuidelines = () => {
    const link = document.createElement('a');
    link.href = '/files/act.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">KTU Activity Points Manager</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">Home</Link>
              <button 
                onClick={handleDownloadGuidelines}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Guidelines
              </button>
              <button 
                onClick={() => scrollToSection(studentRef)}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Student
              </button>
              <button 
                onClick={() => scrollToSection(staffRef)}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Staff
              </button>
              <Link to="/about" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">About Us</Link>
              <Link to="/login" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium">Log in</Link>
            </div>  

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">Home</Link>
              <button 
                onClick={handleDownloadGuidelines}
                className="block text-gray-900 hover:text-blue-600 px-3 py-2 font-medium w-full text-left"
              >
                Guidelines
              </button>
              <button 
                onClick={() => scrollToSection(studentRef)}
                className="block text-gray-900 hover:text-blue-600 px-3 py-2 font-medium w-full text-left"
              >
                Student
              </button>
              <button 
                onClick={() => scrollToSection(staffRef)}
                className="block text-gray-900 hover:text-blue-600 px-3 py-2 font-medium w-full text-left"
              >
                Staff
              </button>
              <Link to="/about" className="block text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">About Us</Link>
              <Link to="/login" className="block bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium mt-4">Log in</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="relative">
          <div className="absolute inset-0">
            <img
              className="w-full h-[600px] object-cover"
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80"
              alt="College Campus"
            />
            <div className="absolute inset-0 bg-blue-900 mix-blend-multiply opacity-60"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">KTU Activity Points Manager</h1>
            <p className="mt-6 text-xl text-white max-w-3xl">
              Streamline your academic journey with our comprehensive activity points management system. Track, submit, and manage your co-curricular activities with ease.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link to="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Get Started
              </Link>
              <button
                onClick={handleDownloadGuidelines}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                View Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose KTU Activity Points Manager?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to manage your activity points in one place
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">Easy Submission</h3>
                <p className="mt-4 text-gray-600">
                  Submit your activity certificates and documents with just a few clicks
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">Real-time Tracking</h3>
                <p className="mt-4 text-gray-600">
                  Monitor your progress and point accumulation in real-time
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">Instant Verification</h3>
                <p className="mt-4 text-gray-600">
                  Quick certificate verification and classification by an accurate AI model
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Student Benefits */}
          <div ref={studentRef} className="mb-16 scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                For Students
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Streamline your activity points journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Upload</h3>
                <p className="text-gray-600">
                  Simple certificate upload process with instant feedback
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor your activity points progress in real-time
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Status</h3>
                <p className="text-gray-600">
                  Get instant updates on certificate approval status
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Records</h3>
                <p className="text-gray-600">
                  Access all your certificates and records digitally
                </p>
              </div>
            </div>
          </div>

          {/* Staff Benefits */}
          <div ref={staffRef} className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                For Staff
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Efficient certificate management and verification
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Review</h3>
                <p className="text-gray-600">
                  Streamlined certificate review and approval process
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Management</h3>
                <p className="text-gray-600">
                  Track and manage student progress efficiently
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Reports</h3>
                <p className="text-gray-600">
                  Generate comprehensive activity point reports
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Access</h3>
                <p className="text-gray-600">
                  Role-based access control and data security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <GraduationCap className="h-10 w-10 text-white mx-auto" />
            <p className="mt-4 text-white">&copy; 2025 KTU Activity Points Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;