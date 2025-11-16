import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaArrowLeft, FaCheck } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateStep1 = () => {
    if (!formData.displayName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setError('');
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.displayName);
      navigate('/discussion');
    } catch (error) {
      setError('Failed to create account: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaUserPlus className="text-white text-3xl" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-sm mx-auto">
            Start your engineering journey with thousands of MAKAUT students
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-primary-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            } transition-all duration-300`}>
              {step > 1 ? <FaCheck className="text-sm" /> : '1'}
            </div>
            <div className={`w-12 h-1 rounded-full ${
              step >= 2 ? 'bg-primary-500' : 'bg-gray-200'
            } transition-all duration-300`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-primary-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            } transition-all duration-300`}>
              {step > 2 ? <FaCheck className="text-sm" /> : '2'}
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label htmlFor="displayName" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaUser className="mr-2 text-primary-500" />
                    Full Name
                  </label>
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaEnvelope className="mr-2 text-primary-500" />
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full btn-primary py-4 rounded-xl text-lg font-semibold"
                >
                  Continue to Security
                </button>
              </div>
            )}

            {/* Step 2: Security */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaLock className="mr-2 text-primary-500" />
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="Create a strong password"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Must be at least 6 characters long
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaLock className="mr-2 text-primary-500" />
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-300 transition-all duration-200 text-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary py-4 rounded-xl text-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaCheck className="text-green-600 text-sm" />
            </div>
            <p className="text-sm text-gray-600">Free Forever</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaCheck className="text-blue-600 text-sm" />
            </div>
            <p className="text-sm text-gray-600">Instant Access</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaCheck className="text-purple-600 text-sm" />
            </div>
            <p className="text-sm text-gray-600">Community Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;