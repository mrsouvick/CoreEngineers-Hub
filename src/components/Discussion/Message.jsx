import React, { useState } from 'react';
import { FaCheckDouble, FaCheck, FaRegSmile, FaReply, FaEllipsisH } from 'react-icons/fa';

const Message = ({ message, isFirst, isLast }) => {
  const [showActions, setShowActions] = useState(false);
  const isOwnMessage = message.userId === 'current-user-id'; // You'll need to implement this

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate();
      const now = new Date();
      const diffInMinutes = (now - date) / (1000 * 60);
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Just now';
    }
  };

  const getUserInitial = () => {
    if (message.userName) {
      return message.userName.charAt(0).toUpperCase();
    }
    if (message.userEmail) {
      return message.userEmail.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getUserColor = (userId) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
    ];
    const index = userId ? userId.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const getBranchColor = (branch) => {
    const colors = {
      ECE: 'text-blue-400',
      EE: 'text-green-400',
      ME: 'text-red-400',
      CE: 'text-yellow-400',
    };
    return colors[branch] || 'text-gray-400';
  };

  return (
    <div 
      className={`flex items-start space-x-3 p-3 hover:bg-gray-700/50 transition-all duration-200 rounded-2xl group ${
        isOwnMessage ? 'bg-blue-500/10' : ''
      } ${isFirst ? 'mt-2' : ''} ${isLast ? 'mb-2' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 bg-gradient-to-r ${getUserColor(message.userId)} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}>
          {getUserInitial()}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline space-x-3 mb-1">
          <span className="font-semibold text-white text-sm hover:underline cursor-pointer">
            {message.userName || message.userEmail}
          </span>
          {message.userBranch && (
            <span className={`text-xs font-medium ${getBranchColor(message.userBranch)}`}>
              {message.userBranch}
            </span>
          )}
          <span className="text-xs text-gray-400 flex items-center">
            {formatTime(message.timestamp)}
            {isOwnMessage && (
              <FaCheckDouble className="ml-1 text-blue-400 text-xs" />
            )}
          </span>
        </div>
        
        <div className={`relative ${
          isOwnMessage 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
            : 'bg-gray-600 text-gray-100'
        } rounded-2xl rounded-tl-none px-4 py-3 shadow-lg`}>
          <p className="text-sm leading-relaxed break-words">
            {message.text}
          </p>
          
          {/* Reactions */}
          {message.reactions && Object.keys(message.reactions).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(message.reactions).map(([emoji, users]) => (
                <button
                  key={emoji}
                  className="bg-gray-700/50 hover:bg-gray-600/50 px-2 py-1 rounded-full text-xs flex items-center space-x-1 transition-colors"
                >
                  <span>{emoji}</span>
                  <span className="text-gray-300">{users.length}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Actions */}
        {showActions && (
          <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors">
              <FaRegSmile className="text-sm" />
            </button>
            <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors">
              <FaReply className="text-sm" />
            </button>
            <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors">
              <FaEllipsisH className="text-sm" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;