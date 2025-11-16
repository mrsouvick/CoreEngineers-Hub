import React from 'react';
import { FaDownload, FaFilePdf, FaMap, FaBook, FaFileAlt, FaUser, FaStar, FaCalendar } from 'react-icons/fa';

const ResourceCard = ({ resource }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'notes':
        return <FaBook className="text-blue-500 text-lg" />;
      case 'papers':
        return <FaFileAlt className="text-green-500 text-lg" />;
      case 'roadmap':
        return <FaMap className="text-purple-500 text-lg" />;
      case 'formulas':
        return <FaFilePdf className="text-red-500 text-lg" />;
      default:
        return <FaFilePdf className="text-gray-500 text-lg" />;
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
        return 'Formula Sheet';
      default:
        return 'Resource';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'notes':
        return 'bg-blue-100 text-blue-800';
      case 'papers':
        return 'bg-green-100 text-green-800';
      case 'roadmap':
        return 'bg-purple-100 text-purple-800';
      case 'formulas':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDownloads = (downloads) => {
    if (downloads >= 1000) {
      return (downloads / 1000).toFixed(1) + 'K';
    }
    return downloads;
  };

  return (
    <div className="card p-6 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-3 rounded-xl ${getTypeColor(resource.type)} mr-4`}>
            {getIcon(resource.type)}
          </div>
          <div>
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(resource.type)} mb-2`}>
              {getTypeLabel(resource.type)}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
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
            className="w-8 h-8 rounded-full mr-3 border-2 border-white shadow-sm"
          />
        ) : (
          <FaUser className="w-6 h-6 text-gray-400 mr-3" />
        )}
        <div>
          <span className="text-sm text-gray-600 font-medium">By {resource.author}</span>
          {resource.rating && (
            <div className="flex items-center text-yellow-500 text-xs mt-1">
              <FaStar className="mr-1" />
              <span className="font-semibold">{resource.rating}</span>
              <span className="text-gray-400 ml-1">rating</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <span className="font-semibold">Branch:</span> 
            <span className="ml-1">{resource.branch === 'all' ? 'All' : resource.branch.toUpperCase()}</span>
          </div>
          <div>
            <span className="font-semibold">Sem:</span> 
            <span className="ml-1">{resource.semester === 'all' ? 'All' : resource.semester}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
        <div className="flex items-center">
          <FaFilePdf className="mr-2 text-red-500" />
          <span>{resource.format} • {resource.pages} pages</span>
        </div>
        <div className="flex items-center">
          <FaDownload className="mr-2 text-gray-400" />
          <span>{formatDownloads(resource.downloads)} downloads</span>
        </div>
      </div>

      {/* Last Updated */}
      {resource.lastUpdated && (
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <FaCalendar className="mr-2" />
          Updated {resource.lastUpdated}
        </div>
      )}

      <button className="btn-primary w-full group-hover:shadow-xl group-hover:-translate-y-1">
        <FaDownload className="inline mr-2" />
        Download Resource
      </button>
    </div>
  );
};

export default ResourceCard;