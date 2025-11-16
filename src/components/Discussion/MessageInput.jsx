import React, { useState } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';

const MessageInput = ({ onSendMessage, loading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white/80 backdrop-blur-md p-6">
      <form onSubmit={handleSubmit} className="flex space-x-4 items-end">
        <div className="flex-1 relative">
          <div className="flex space-x-2 mb-2">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaPaperclip className="text-lg" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaSmile className="text-lg" />
            </button>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message... (Ask questions, share resources, help others)"
            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base placeholder-gray-400 transition-all duration-200 resize-none min-h-[60px] max-h-[120px]"
            disabled={loading}
            rows="1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-2xl hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center min-w-[56px] h-[56px]"
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </form>
      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
        <span>Press Enter to send • Shift+Enter for new line</span>
        <span>{message.length}/500</span>
      </div>
    </div>
  );
};

export default MessageInput;