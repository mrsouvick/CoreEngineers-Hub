import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { FaComments, FaUserFriends, FaSearch } from 'react-icons/fa';

const MessageList = ({ messages, searchTerm }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    if (searchTerm) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-750">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No messages found</h3>
            <p className="text-gray-400 text-lg">
              No messages match your search for "<span className="text-white">{searchTerm}</span>"
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-750">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <FaComments className="text-white text-3xl" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Welcome to the Discussion!</h3>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            This is the beginning of your conversation with fellow engineering students. 
            Start by sending a message to get help or share your knowledge!
          </p>
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <FaUserFriends className="mr-2" />
            <span>Be the first to start the conversation</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-750 custom-scrollbar">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message 
            key={message.id} 
            message={message} 
            isFirst={index === 0}
            isLast={index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default MessageList;