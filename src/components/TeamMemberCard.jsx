import React from 'react';
import { FaUserTie, FaPalette, FaChalkboardTeacher, FaLinkedin, FaTwitter, FaEnvelope, FaAward } from 'react-icons/fa';

const TeamMemberCard = ({ member }) => {
  const getRoleIcon = (role) => {
    if (role.includes('Founder') || role.includes('Admin')) {
      return <FaUserTie className="text-blue-500 text-lg" />;
    } else if (role.includes('Tutor')) {
      return <FaChalkboardTeacher className="text-green-500 text-lg" />;
    } else if (role.includes('Designer')) {
      return <FaPalette className="text-purple-500 text-lg" />;
    }
    return <FaUserTie className="text-gray-500 text-lg" />;
  };

  const getRoleColor = (role) => {
    if (role.includes('Founder') || role.includes('Admin')) {
      return 'bg-blue-100 text-blue-800';
    } else if (role.includes('Tutor')) {
      return 'bg-green-100 text-green-800';
    } else if (role.includes('Designer')) {
      return 'bg-purple-100 text-purple-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card p-6 text-center hover:scale-105 transition-all duration-300 group">
      {/* Team Member Photo */}
      <div className="relative mx-auto mb-4">
        <div className="w-32 h-32 mx-auto">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full rounded-full object-cover border-4 border-primary-100 shadow-lg group-hover:border-primary-200 transition-colors duration-300"
          />
        </div>
        {/* Role Badge */}
        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(member.role)}`}>
          {member.role}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
        {member.name}
      </h3>
      
      <div className="flex items-center justify-center mb-3">
        {getRoleIcon(member.role)}
        <span className="ml-2 text-primary-600 font-medium text-sm">{member.role}</span>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-[60px]">
        {member.description}
      </p>

      {/* Expertise Tags */}
      {member.expertise && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {member.expertise.map((skill, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Social Links */}
      <div className="flex justify-center space-x-3 pt-3 border-t border-gray-100">
        {member.social.linkedin && member.social.linkedin !== '#' && (
          <a
            href={member.social.linkedin}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-lg"
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={16} />
          </a>
        )}
        {member.social.twitter && member.social.twitter !== '#' && (
          <a
            href={member.social.twitter}
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-lg"
            title="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={16} />
          </a>
        )}
        {member.social.email && member.social.email !== '#' && (
          <a
            href={`mailto:${member.social.email}`}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
            title="Email"
          >
            <FaEnvelope size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;