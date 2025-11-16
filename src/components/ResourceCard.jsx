import React from 'react';
import { FaDownload, FaFilePdf, FaMap, FaBook, FaFileAlt, FaUser } from 'react-icons/fa';

const ResourceCard = ({ resource }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'notes':
        return <FaBook className="text-blue-500" />;
      case 'papers':
        return <FaFileAlt className="text-green-500" />;
      case 'roadmap':
        return <FaMap className="text-purple-500" />;
      case 'formulas':
        return <FaFilePdf className="text-red-500" />;
      default:
        return <FaFilePdf className="text-gray-500" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'notes':
        return 'Study Notes';
      case 'papers':
        return 'Question Papers';
      case 'roadmap':
        return 'Study Roadmap';
      case 'formulas':
        return 'Formula Handbook';
      default:
        return 'Resource';
    }
  };

  return (
    <div className="card p-6 hover:scale-105 transition-transform duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-gray-100 mr-4">
            {getIcon(resource.type)}
          </div>
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-2">
              {getTypeLabel(resource.type)}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {resource.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Author with Photo */}
      <div className="flex items-center mb-4">
        {resource.authorPhoto ? (
          <img
            src={resource.authorPhoto}
            alt={resource.author}
            className="w-6 h-6 rounded-full mr-2"
          />
        ) : (
          <FaUser className="w-4 h-4 text-gray-400 mr-2" />
        )}
        <span className="text-sm text-gray-600">By {resource.author}</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div>
          <span className="font-medium">Branch:</span> {resource.branch === 'all' ? 'All Branches' : resource.branch.toUpperCase()}
        </div>
        <div>
          <span className="font-medium">Semester:</span> {resource.semester === 'all' ? 'All Semesters' : resource.semester}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
        <div className="flex items-center">
          <FaFilePdf className="mr-1 text-red-500" />
          <span>{resource.format} • {resource.pages} pages</span>
        </div>
        <div className="flex items-center">
          <FaDownload className="mr-1 text-gray-400" />
          <span>{resource.downloads.toLocaleString()} downloads</span>
        </div>
      </div>

      <button className="btn-primary w-full">
        <FaDownload className="inline mr-2" />
        Download Resource
      </button>
    </div>
  );
};

export default ResourceCard;