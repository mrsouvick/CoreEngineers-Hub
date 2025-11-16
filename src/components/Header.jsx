import React, { useState } from 'react';
import { FaBars, FaTimes, FaBook, FaUserGraduate, FaComments, FaUser, FaSignOutAlt, FaHome, FaGraduationCap, FaFileAlt, FaUsers } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Courses', href: '#courses', icon: FaGraduationCap },
    { name: 'Resources', href: '/resources', icon: FaBook },
    { name: 'About', href: '#about', icon: FaUsers },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const getUserInitial = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <nav className="container-responsive">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={() => setIsMenuOpen(false)}>
              <div className="relative">
                <FaBook className="h-8 w-8 text-primary-600 animate-float" />
                <div className="absolute -inset-1 bg-primary-200 rounded-full blur-sm opacity-30"></div>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CoreEngineers Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-primary-50"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              );
            })}
            <Link
              to={user ? "/discussion" : "/login"}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-primary-50"
            >
              <FaComments className="w-4 h-4" />
              <span>Discussion</span>
            </Link>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                    {getUserInitial()}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 max-w-32 truncate">
                      {userProfile?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 backdrop-blur-md bg-white/95">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {userProfile?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center transition-colors duration-200"
                    >
                      <FaSignOutAlt className="mr-3 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-primary-50"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-primary text-sm py-3 px-6"
                >
                  <FaUserGraduate className="inline mr-2" />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            {user && (
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                {getUserInitial()}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
            <div className="px-4 pt-6 pb-8 space-y-2">
              {/* User Info */}
              {user && (
                <div className="pb-4 border-b border-gray-200 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg">
                      {getUserInitial()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-gray-900 truncate">
                        {userProfile?.displayName || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-4 text-gray-700 hover:text-primary-600 px-4 py-4 text-base font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
                <Link
                  to={user ? "/discussion" : "/login"}
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary-600 px-4 py-4 text-base font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaComments className="w-5 h-5" />
                  <span>Discussion Room</span>
                </Link>
              </div>

              {/* Auth Buttons */}
              {!user ? (
                <div className="pt-6 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center btn-ghost py-4 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login to Account
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center btn-primary py-4 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 mt-6 font-semibold"
                >
                  <FaSignOutAlt className="mr-3" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;