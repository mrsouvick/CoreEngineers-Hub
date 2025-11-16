import React from 'react';
import { FaUserTie, FaPalette, FaChalkboardTeacher, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const TeamMemberCard = ({ member }) => {
  const getRoleIcon = (role) => {
    if (role.includes('Founder') || role.includes('Admin')) {
      return <FaUserTie className="text-blue-500" />;
    } else if (role.includes('Tutor')) {
      return <FaChalkboardTeacher className="text-green-500" />;
    } else if (role.includes('Designer')) {
      return <FaPalette className="text-purple-500" />;
    }
    return <FaUserTie className="text-gray-500" />;
  };

  return (
    <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
      {/* Team Member Photo */}
      <div className="w-32 h-32 mx-auto mb-4">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full rounded-full object-cover border-4 border-primary-100 shadow-md"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {member.name}
      </h3>
      
      <div className="flex items-center justify-center mb-3">
        {getRoleIcon(member.role)}
        <span className="ml-2 text-primary-600 font-medium">{member.role}</span>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {member.description}
      </p>

      {/* Social Links */}
      <div className="flex justify-center space-x-3 pt-3 border-t border-gray-100">
        <a
          href={member.social.linkedin}
          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
          title="LinkedIn"
        >
          <FaLinkedin size={16} />
        </a>
        <a
          href={member.social.twitter}
          className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
          title="Twitter"
        >
          <FaTwitter size={16} />
        </a>
        <a
          href={`mailto:${member.social.email}`}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Email"
        >
          <FaEnvelope size={16} />
        </a>
      </div>
    </div>
  );
};

export default TeamMemberCard;