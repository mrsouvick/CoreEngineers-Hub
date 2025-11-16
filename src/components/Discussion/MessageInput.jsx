import React, { useState, useRef } from 'react';
import { FaPaperPlane, FaRegSmile, FaPaperclip, FaAt, FaGift } from 'react-icons/fa';

const MessageInput = ({ onSendMessage, loading, channel }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const quickReactions = ['👍', '❤️', '😂', '🎉', '🤔', '👀'];

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-4">
      {/* Quick Reactions */}
      <div className="flex items-center space-x-2 mb-3">
        {quickReactions.map((reaction, index) => (
          <button
            key={index}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-lg"
            title={`React with ${reaction}`}
          >
            {reaction}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-3 items-end">
        {/* Attachment Button */}
        <button
          type="button"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors duration-200 flex-shrink-0"
        >
          <FaPaperclip className="text-lg" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channel?.name || 'general'}...`}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-200 custom-scrollbar"
            disabled={loading}
            rows="1"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          
          {/* Input Actions */}
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <FaAt className="text-lg" />
            </button>
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <FaRegSmile className="text-lg" />
            </button>
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <FaGift className="text-lg" />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center min-w-[44px] h-[44px] ${
            message.trim()
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </form>

      {/* Helper Text */}
      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
        <span>Press Enter to send • Shift+Enter for new line</span>
        <span>{message.length}/2000</span>
      </div>
    </div>
  );
};

export default MessageInput;