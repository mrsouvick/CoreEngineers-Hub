import React from 'react';
import { FaPlay, FaBook, FaStar, FaUsers, FaClock, FaGraduationCap } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const getBranchColor = (branch) => {
    const colors = {
      ece: 'from-blue-500 to-blue-600',
      ee: 'from-green-500 to-green-600',
      me: 'from-red-500 to-red-600',
      ce: 'from-yellow-500 to-yellow-600'
    };
    return colors[branch] || 'from-gray-500 to-gray-600';
  };

  const getBranchIcon = (branch) => {
    const icons = {
      ece: '🔌',
      ee: '⚡',
      me: '⚙️',
      ce: '🏗️'
    };
    return icons[branch] || '📚';
  };

  return (
    <div className="card group p-6 hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden rounded-2xl mb-5">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getBranchColor(course.branch)} shadow-lg`}>
          <span className="mr-2">{getBranchIcon(course.branch)}</span>
          {course.branch.toUpperCase()}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
        {course.title}
      </h3>
      
      {/* Instructor with Photo */}
      <div className="flex items-center mb-4">
        <img
          src={course.instructorPhoto}
          alt={course.instructor}
          className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-md"
        />
        <div>
          <p className="text-gray-600 text-sm font-medium">By {course.instructor}</p>
          <div className="flex items-center text-yellow-500">
            <FaStar className="mr-1 text-sm" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaPlay className="mr-2 text-primary-500" />
            <span>{course.videos} videos</span>
          </div>
          <div className="flex items-center">
            <FaBook className="mr-2 text-secondary-500" />
            <span>{course.resources} resources</span>
          </div>
        </div>
        <div className="flex items-center">
          <FaClock className="mr-2 text-gray-400" />
          <span>{course.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center text-gray-600">
          <FaUsers className="mr-2" />
          <span className="font-semibold">{course.students.toLocaleString()}+ students</span>
        </div>
        <span className="text-sm font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
          Sem {course.semester}
        </span>
      </div>
      
      <button className="w-full btn-primary group-hover:shadow-xl group-hover:-translate-y-1">
        <FaPlay className="inline mr-2" />
        Start Learning
      </button>
    </div>
  );
};

export default CourseCard;