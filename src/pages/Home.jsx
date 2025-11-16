import React, { useState } from 'react';
import { FaPlay, FaUsers, FaBook, FaGraduationCap, FaSearch, FaFilter } from 'react-icons/fa';
import CourseCard from '../components/CourseCard';
import ResourceCard from '../components/ResourceCard';
import TeamMemberCard from '../components/TeamMemberCard';
import { courses, resources, teamMembers, branches } from '../data/mockData';

const Home = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const filteredCourses = courses.filter(course => {
    if (selectedBranch !== 'all' && course.branch !== selectedBranch) return false;
    if (selectedSemester !== 'all' && course.semester !== parseInt(selectedSemester)) return false;
    return true;
  });

  const featuredCourses = filteredCourses.slice(0, 6);
  const featuredResources = resources.slice(0, 4);

  const stats = [
    { icon: <FaUsers className="text-primary-500" />, number: '10,000+', label: 'Students Enrolled' },
    { icon: <FaBook className="text-secondary-500" />, number: '500+', label: 'Courses & Resources' },
    { icon: <FaGraduationCap className="text-yellow-500" />, number: '50+', label: 'Expert Tutors' },
    { icon: <FaPlay className="text-red-500" />, number: '2,000+', label: 'Video Lectures' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Your Engineering
              <span className="block text-secondary-400">Journey</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Complete academic support for MAKAUT students across all core engineering branches. 
              From first year to final year, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#courses" className="btn-secondary text-lg px-8 py-4">
                <FaPlay className="inline mr-2" />
                Explore Courses
              </a>
              <a href="#resources" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                Browse Resources
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="bg-gray-50">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semester-wise structured courses for all core engineering branches
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Branch
              </label>
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Semester
              </label>
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {featuredCourses.length === 0 && (
            <div className="text-center py-12">
              <FaFilter className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a href="#courses" className="btn-primary text-lg px-8">
              View All Courses
            </a>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Study Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Download notes, question papers, roadmaps, and more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#resources" className="btn-primary text-lg px-8">
              Browse All Resources
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="bg-gray-50">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals working to make engineering education accessible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of MAKAUT students who are already excelling in their engineering studies
          </p>
          <a href="#courses" className="btn-secondary text-lg px-8 py-4">
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;