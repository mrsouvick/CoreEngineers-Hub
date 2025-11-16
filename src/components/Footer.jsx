import React from 'react';
import { FaBook, FaYoutube, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <FaBook className="h-8 w-8 text-primary-400 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                CoreEngineers Hub
              </span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Making semester-wise learning simple, accurate, and accessible for every MAKAUT engineering student.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-gray-800 rounded-xl hover:bg-gray-700">
                <FaYoutube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-gray-800 rounded-xl hover:bg-gray-700">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-gray-800 rounded-xl hover:bg-gray-700">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-gray-800 rounded-xl hover:bg-gray-700">
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <FaGraduationCap className="mr-2 text-primary-400" />
                Engineering Branches
              </h3>
              <ul className="space-y-3">
                {['Electronics & Communication', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Computer Science'].map((branch) => (
                  <li key={branch}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">
                      {branch}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                {['Study Materials', 'Question Papers', 'Video Lectures', 'Roadmaps', 'Formula Books'].map((resource) => (
                  <li key={resource}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/discussion" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">
                    Discussion Room
                  </Link>
                </li>
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-base text-center md:text-left">
              &copy; 2024 CoreEngineers Hub. All rights reserved. Built with <FaHeart className="inline text-red-500 mx-1" /> for MAKAUT students.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-300 text-sm">10,000+ Students Trusted</span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-2 border-gray-800 flex items-center justify-center text-white text-xs font-bold">
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;