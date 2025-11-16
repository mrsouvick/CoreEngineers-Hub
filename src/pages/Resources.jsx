import React, { useState } from 'react';
import { FaSearch, FaFilter, FaDownload, FaFilePdf, FaBook, FaMap, FaFileAlt, FaUser, FaCalendar, FaStar, FaClock } from 'react-icons/fa';
import ResourceCard from '../components/ResourceCard';
import { resources, branches } from '../data/mockData';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Enhanced resources data with more items
  const enhancedResources = [
    ...resources,
    {
      id: 5,
      title: "Circuit Analysis Complete Notes",
      type: "notes",
      branch: "ece",
      semester: 3,
      format: "PDF",
      pages: 52,
      downloads: 1800,
      author: "Surajit Ghosh",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 4.8,
      lastUpdated: "2024-01-15"
    },
    {
      id: 6,
      title: "Mechanical Workshop Manual",
      type: "notes",
      branch: "me",
      semester: 2,
      format: "PDF",
      pages: 35,
      downloads: 1200,
      author: "Tanmay Maity",
      authorPhoto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=50&h=50&fit=crop&crop=face",
      rating: 4.6,
      lastUpdated: "2024-01-10"
    },
    {
      id: 7,
      title: "Electrical Machines Formula Sheet",
      type: "formulas",
      branch: "ee",
      semester: 4,
      format: "PDF",
      pages: 12,
      downloads: 2100,
      author: "Surajit Ghosh",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 4.9,
      lastUpdated: "2024-01-18"
    },
    {
      id: 8,
      title: "Structural Engineering Basics",
      type: "notes",
      branch: "ce",
      semester: 3,
      format: "PDF",
      pages: 48,
      downloads: 950,
      author: "Souvick Kumar Halder",
      authorPhoto: "https://scontent.fccu3-1.fna.fbcdn.net/v/t39.30808-6/544989577_1788689405065662_8868460709953778179_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=f1oomo6UqgUQ7kNvwHEhDLW&_nc_oc=AdkO9wA6P0vTyPsVdtS9nEONOiDW7WtPdKI64XjnI-uxVjFTnp3Rtf-GMe-jlxTJVlI&_nc_zt=23&_nc_ht=scontent.fccu3-1.fna&_nc_gid=sbIrNQ8DBZqRLUmRHdXwOQ&oh=00_Afjd43s2Uol1zInUeyK3juJ4PBxTtZbnfZzSwJLyHDWWyQ&oe=691EDB50",
      rating: 4.7,
      lastUpdated: "2024-01-12"
    }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types', icon: FaFileAlt, color: 'gray' },
    { id: 'notes', name: 'Study Notes', icon: FaBook, color: 'blue' },
    { id: 'papers', name: 'Question Papers', icon: FaFilePdf, color: 'green' },
    { id: 'roadmap', name: 'Study Roadmaps', icon: FaMap, color: 'purple' },
    { id: 'formulas', name: 'Formula Sheets', icon: FaFileAlt, color: 'red' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Recently Added' },
    { id: 'downloads', name: 'Most Downloads' },
    { id: 'rating', name: 'Highest Rated' }
  ];

  // Filter resources based on selections
  const filteredResources = enhancedResources.filter(resource => {
    // Search term filter
    if (searchTerm && !resource.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Branch filter
    if (selectedBranch !== 'all' && resource.branch !== selectedBranch) {
      return false;
    }
    
    // Semester filter
    if (selectedSemester !== 'all' && resource.semester !== selectedSemester) {
      return false;
    }
    
    // Type filter
    if (selectedType !== 'all' && resource.type !== selectedType) {
      return false;
    }
    
    return true;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'recent':
        return new Date(b.lastUpdated || '2024-01-01') - new Date(a.lastUpdated || '2024-01-01');
      case 'downloads':
        return b.downloads - a.downloads;
      case 'rating':
        return (b.rating || 4.5) - (a.rating || 4.5);
      default:
        return 0;
    }
  });

  const getTotalDownloads = () => {
    return enhancedResources.reduce((total, resource) => total + resource.downloads, 0);
  };

  const getTotalResources = () => enhancedResources.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="container-responsive py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Study <span className="text-secondary-400">Resources</span>
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 mb-8 leading-relaxed">
              Download free study materials, question papers, formula sheets, and roadmaps 
              for all MAKAUT engineering branches
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{getTotalResources()}+</div>
                <div className="text-primary-200 text-sm sm:text-base">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{(getTotalDownloads() / 1000).toFixed(0)}K+</div>
                <div className="text-primary-200 text-sm sm:text-base">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">All</div>
                <div className="text-primary-200 text-sm sm:text-base">Branches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-responsive py-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search resources, subjects, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-sm"
              />
            </div>
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Branch Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FaFilter className="inline mr-2 text-primary-500" />
                Branch
              </label>
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Semester
              </label>
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            {/* Resource Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Resource Type
              </label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {resourceTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort By
              </label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedBranch !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm">
                Branch: {branches.find(b => b.id === selectedBranch)?.name}
                <button onClick={() => setSelectedBranch('all')} className="ml-2 hover:text-primary-900">×</button>
              </span>
            )}
            {selectedSemester !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-sm">
                Semester: {selectedSemester}
                <button onClick={() => setSelectedSemester('all')} className="ml-2 hover:text-secondary-900">×</button>
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                Type: {resourceTypes.find(t => t.id === selectedType)?.name}
                <button onClick={() => setSelectedType('all')} className="ml-2 hover:text-purple-900">×</button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-gray-900">×</button>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Resource Types Quick Access */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-responsive py-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {resourceTypes.map((type) => {
              const Icon = type.icon;
              const count = enhancedResources.filter(r => type.id === 'all' || r.type === type.id).length;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedType === type.id 
                      ? 'border-primary-500 bg-primary-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    type.id === 'all' ? 'bg-gray-100' :
                    type.id === 'notes' ? 'bg-blue-100' :
                    type.id === 'papers' ? 'bg-green-100' :
                    type.id === 'roadmap' ? 'bg-purple-100' : 'bg-red-100'
                  }`}>
                    <Icon className={`
                      ${type.id === 'all' ? 'text-gray-600' :
                      type.id === 'notes' ? 'text-blue-600' :
                      type.id === 'papers' ? 'text-green-600' :
                      type.id === 'roadmap' ? 'text-purple-600' : 'text-red-600'}
                    `} />
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{type.name}</div>
                  <div className="text-xs text-gray-500">{count} resources</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid Section */}
      <section className="container-responsive py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {sortedResources.length} Resources Found
            </h2>
            <p className="text-gray-600 mt-1">
              {searchTerm ? `Search results for "${searchTerm}"` : 'All available study materials'}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Sorted by: {sortOptions.find(opt => opt.id === sortBy)?.name}
          </div>
        </div>

        {sortedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No resources found</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBranch('all');
                setSelectedSemester('all');
                setSelectedType('all');
              }}
              className="btn-primary px-8 py-3"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {sortedResources.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-ghost px-8 py-3 border-gray-300 text-gray-700 hover:border-gray-400">
              Load More Resources
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container-responsive text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Request specific resources or join our discussion room to ask fellow students for study materials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary px-8 py-4 rounded-2xl">
              <FaDownload className="inline mr-2" />
              Request Resource
            </button>
            <button className="btn-ghost px-8 py-4 rounded-2xl border-white/30 hover:border-white/50">
              Join Discussion Room
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <FaDownload className="text-4xl text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{(getTotalDownloads() / 1000).toFixed(0)}K+</div>
              <div className="text-gray-600">Total Downloads</div>
            </div>
            <div className="p-6">
              <FaUser className="text-4xl text-secondary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Contributing Authors</div>
            </div>
            <div className="p-6">
              <FaStar className="text-4xl text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;