import React from 'react';
import { FaCheckDouble, FaCheck } from 'react-icons/fa';

const Message = ({ message }) => {
  const isOwnMessage = message.userId === 'current-user-id'; // You'll need to implement this

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate();
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);
      
      if (diffInHours < 24) {
        return date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
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
    ];
    const index = userId ? userId.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div className={`flex items-start space-x-3 p-4 hover:bg-gray-50/50 transition-all duration-200 rounded-2xl group ${
      isOwnMessage ? 'bg-blue-50/50' : ''
    }`}>
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 bg-gradient-to-r ${getUserColor(message.userId)} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}>
          {getUserInitial()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline space-x-3 mb-2">
          <span className="font-semibold text-gray-900 text-sm">
            {message.userName || message.userEmail}
          </span>
          <span className="text-xs text-gray-400 flex items-center">
            {formatTime(message.timestamp)}
            {isOwnMessage && (
              <FaCheckDouble className="ml-1 text-blue-500 text-xs" />
            )}
          </span>
        </div>
        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100">
          <p className="text-gray-800 text-sm leading-relaxed">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;