import React, { useState } from 'react';
import { FaPlay, FaUsers, FaBook, FaGraduationCap, FaFilter, FaComments, FaRocket, FaStar, FaDownload, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/CourseCard';
import ResourceCard from '../components/ResourceCard';
import TeamMemberCard from '../components/TeamMemberCard';
import { courses, resources, teamMembers, branches } from '../data/mockData';

const Home = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const { user } = useAuth();

  const filteredCourses = courses.filter(course => {
    if (selectedBranch !== 'all' && course.branch !== selectedBranch) return false;
    if (selectedSemester !== 'all' && course.semester !== parseInt(selectedSemester)) return false;
    return true;
  });

  const featuredCourses = filteredCourses.slice(0, 6);
  const featuredResources = resources.slice(0, 4);

  const stats = [
    { icon: <FaUsers className="text-3xl" />, number: '10,000+', label: 'Students Enrolled', color: 'text-blue-500' },
    { icon: <FaBook className="text-3xl" />, number: '500+', label: 'Courses & Resources', color: 'text-green-500' },
    { icon: <FaGraduationCap className="text-3xl" />, number: '50+', label: 'Expert Tutors', color: 'text-yellow-500' },
    { icon: <FaPlay className="text-3xl" />, number: '2,000+', label: 'Video Lectures', color: 'text-red-500' },
    { icon: <FaComments className="text-3xl" />, number: 'Live', label: 'Discussion Room', color: 'text-purple-500' },
  ];

  return (
    <div className="w-screen overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" className="hero-section bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-responsive relative z-10">
          <div className="text-center py-16 sm:py-20 lg:py-24">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-6">
              <FaRocket className="mr-2" />
              Trusted by 10,000+ MAKAUT Students
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Your
              <span className="block text-secondary-400 mt-2 bg-gradient-to-r from-secondary-400 to-yellow-400 bg-clip-text text-transparent">
                Engineering Journey
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-primary-100 max-w-4xl mx-auto leading-relaxed font-light">
              Complete academic support for MAKAUT students across all core engineering branches. 
              <span className="block text-white font-normal">From first year to final year, we've got you covered.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 max-w-2xl mx-auto">
              <a href="#courses" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
                <FaPlay className="inline mr-3" />
                Explore Courses
              </a>
              <Link 
                to={user ? "/discussion" : "/login"} 
                className="btn-ghost w-full sm:w-auto text-lg px-8 py-4 rounded-2xl border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <FaComments className="inline mr-3" />
                {user ? 'Discussion Room' : 'Join Discussion'}
              </Link>
            </div>
            
            {user && (
              <div className="mt-6 text-primary-100 px-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <FaShieldAlt className="mr-2 text-green-400" />
                  <p className="text-lg">
                    Welcome back, <span className="text-white font-semibold">{user.email}</span>! Ready to continue the discussion?
                  </p>
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-primary-200">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-2" />
                <span>4.9/5 Rating from Students</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-green-400 mr-2" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center">
                <FaDownload className="text-blue-400 mr-2" />
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white relative z-10 -mt-8">
        <div className="container-responsive">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 -translate-y-8">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <div className={`mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    stat.label === 'Discussion Room' ? 'text-purple-600' : 'text-gray-900'
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discussion Room Feature Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
                  <FaComments className="mr-2" />
                  Live Community
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Join Our <span className="gradient-text">Discussion Room</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Connect with fellow engineering students in real-time. Ask questions, share insights, 
                  collaborate on projects, and build your professional network in our secure discussion platform.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: '💬', text: 'Real-time messaging with fellow students' },
                  { icon: '🎯', text: 'Branch-specific discussion channels' },
                  { icon: '🔐', text: 'Secure authentication system' },
                  { icon: '📚', text: 'Share resources and study materials' },
                  { icon: '👥', text: 'Connect with seniors and experts' },
                  { icon: '⚡', text: 'Instant help for your doubts' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-200">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to={user ? "/discussion" : "/signup"} 
                  className="btn-primary text-lg px-8 py-4 rounded-2xl"
                >
                  <FaComments className="mr-3" />
                  {user ? 'Enter Discussion Room' : 'Sign Up to Join'}
                </Link>
                {!user && (
                  <Link 
                    to="/login" 
                    className="btn-ghost text-lg px-8 py-4 rounded-2xl text-gray-700 border-gray-300 hover:border-gray-400"
                  >
                    Existing Account? Sign In
                  </Link>
                )}
              </div>
            </div>
            
            {/* Discussion Preview */}
            <div className="relative">
              <div className="glass-card p-8 rounded-3xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">CE</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">CoreEngineers Community</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Live discussion room • 24 students online
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 max-h-80 overflow-y-auto pr-4">
                  {/* Sample Messages */}
                  {[
                    { name: 'Amit Sharma', initial: 'A', color: 'from-green-500 to-green-600', message: 'Has anyone solved the thermodynamics assignment from last class?', time: '2:30 PM' },
                    { name: 'Priya Patel', initial: 'P', color: 'from-blue-500 to-blue-600', message: 'I can help! Which problem are you stuck on?', time: '2:31 PM' },
                    { name: 'Raj Kumar', initial: 'R', color: 'from-purple-500 to-purple-600', message: 'I have the solutions, sharing in resources section', time: '2:32 PM' },
                    { name: 'You', initial: 'Y', color: 'from-primary-500 to-secondary-500', message: 'Join the conversation to help your peers and get your doubts solved instantly...', time: 'Now' }
                  ].map((msg, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className={`w-10 h-10 bg-gradient-to-r ${msg.color} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                        {msg.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline space-x-2 mb-1">
                          <span className={`font-semibold text-sm ${msg.name === 'You' ? 'text-primary-600' : 'text-gray-900'}`}>
                            {msg.name}
                          </span>
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        <p className={`text-sm ${msg.name === 'You' ? 'text-primary-700' : 'text-gray-700'}`}>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                    disabled
                  />
                  <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg">
                    Send
                  </button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="bg-white py-20">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
              <FaGraduationCap className="mr-2" />
              Comprehensive Learning
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semester-wise structured courses for all core engineering branches with expert instructors
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl shadow-lg border border-primary-100">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Filter by Branch
              </label>
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg bg-white shadow-sm"
              >
                <option value="all">All Engineering Branches</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Filter by Semester
              </label>
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg bg-white shadow-sm"
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
            <div className="text-center py-16">
              <FaFilter className="mx-auto text-5xl text-gray-400 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No courses found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your filters to see more results</p>
            </div>
          )}

          <div className="text-center mt-16">
            <a href="#courses" className="btn-primary text-lg px-10 py-4 rounded-2xl">
              View All Courses
            </a>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-semibold mb-4">
              <FaBook className="mr-2" />
              Study Materials
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Study <span className="gradient-text">Resources</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Download notes, question papers, roadmaps, and more - completely free for MAKAUT students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

         <div className="text-center mt-12">
  <Link to="/resources" className="btn-primary text-lg px-8">
    Browse All Resources
  </Link>
</div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="bg-white py-20">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <FaUsers className="mr-2" />
              Our Team
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals working tirelessly to make engineering education accessible and effective
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
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-responsive relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of MAKAUT students who are already excelling in their engineering studies with our comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#courses" className="btn-secondary text-lg px-10 py-4 rounded-2xl">
              Explore Courses
            </a>
            <Link 
              to={user ? "/discussion" : "/signup"} 
              className="btn-ghost text-lg px-10 py-4 rounded-2xl border-2 border-white/30 hover:border-white/50"
            >
              {user ? 'Join Discussion' : 'Sign Up Free'}
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-primary-200">
            <div className="flex items-center">
              <FaShieldAlt className="text-green-400 mr-3 text-xl" />
              <span className="text-lg">100% Secure & Private</span>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-3 text-xl" />
              <span className="text-lg">4.9/5 Student Rating</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="text-blue-400 mr-3 text-xl" />
              <span className="text-lg">10,000+ Happy Students</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;