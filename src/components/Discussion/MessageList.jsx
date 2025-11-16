import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { FaComments, FaUserFriends } from 'react-icons/fa';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaComments className="text-primary-500 text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Welcome to the Discussion!</h3>
          <p className="text-gray-600 mb-6">
            This is the beginning of your conversation with fellow engineering students. 
            Start by sending a message to get help or share your knowledge!
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <FaUserFriends className="mr-2" />
            <span>Be the first to start the conversation</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50/30">
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default MessageList;