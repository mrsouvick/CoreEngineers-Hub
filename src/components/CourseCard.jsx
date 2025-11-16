import React from 'react';
import { FaPlay, FaBook, FaStar, FaUsers, FaClock } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const getBranchColor = (branch) => {
    const colors = {
      ece: 'bg-blue-500',
      ee: 'bg-green-500',
      me: 'bg-red-500',
      ce: 'bg-yellow-500'
    };
    return colors[branch] || 'bg-gray-500';
  };

  return (
    <div className="card p-6 hover:scale-105 transition-transform duration-200">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium ${getBranchColor(course.branch)}`}>
          {course.branch.toUpperCase()}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
        {course.title}
      </h3>
      
      {/* Instructor with Photo */}
      <div className="flex items-center mb-4">
        <img
          src={course.instructorPhoto}
          alt={course.instructor}
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <p className="text-gray-600 text-sm">By {course.instructor}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaPlay className="mr-1 text-primary-500" />
            <span>{course.videos} videos</span>
          </div>
          <div className="flex items-center">
            <FaBook className="mr-1 text-secondary-500" />
            <span>{course.resources} resources</span>
          </div>
        </div>
        <div className="flex items-center">
          <FaClock className="mr-1 text-gray-400" />
          <span>{course.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex items-center text-yellow-500 mr-2">
            <FaStar className="mr-1" />
            <span className="font-medium">{course.rating}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <FaUsers className="mr-1" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-500">
          Semester {course.semester}
        </span>
      </div>
      
      <button className="btn-primary w-full">
        <FaPlay className="inline mr-2" />
        Start Course
      </button>
    </div>
  );
};

export default CourseCard;