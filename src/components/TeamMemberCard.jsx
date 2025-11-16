import React from 'react';
import { FaUserTie, FaPalette, FaChalkboardTeacher } from 'react-icons/fa';

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
    <div className="card p-6 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">
        {member.name.split(' ').map(n => n[0]).join('')}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {member.name}
      </h3>
      
      <div className="flex items-center justify-center mb-3">
        {getRoleIcon(member.role)}
        <span className="ml-2 text-primary-600 font-medium">{member.role}</span>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {member.description}
      </p>
    </div>
  );
};

export default TeamMemberCard;