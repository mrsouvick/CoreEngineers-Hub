import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  orderBy, 
  query, 
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useAuth } from '../../contexts/AuthContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { 
  FaComments, 
  FaSignOutAlt, 
  FaArrowLeft, 
  FaUsers, 
  FaSearch,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DiscussionRoom = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const channels = [
    { id: 'general', name: 'General', description: 'General discussions' },
    { id: 'ece', name: 'Electronics', description: 'ECE students' },
    { id: 'ee', name: 'Electrical', description: 'EE students' },
    { id: 'me', name: 'Mechanical', description: 'ME students' },
    { id: 'ce', name: 'Civil', description: 'CE students' },
  ];

  // Listen for messages
  useEffect(() => {
    console.log('Setting up message listener for channel:', selectedChannel);
    
    const q = query(
      collection(db, 'messages'), 
      orderBy('timestamp', 'asc'), 
      limit(100)
    );
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        console.log('New snapshot received:', querySnapshot.size, 'messages');
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          messagesData.push({ 
            id: doc.id, 
            ...data,
            // Ensure timestamp is properly handled
            timestamp: data.timestamp ? data.timestamp : new Date()
          });
        });
        console.log('Processed messages:', messagesData);
        setMessages(messagesData);
      },
      (error) => {
        console.error('Error listening to messages:', error);
      }
    );

    return () => unsubscribe();
  }, [selectedChannel]);

  const sendMessage = async (text) => {
    if (!user || !text.trim()) {
      console.log('Cannot send message: no user or empty text');
      return;
    }

    console.log('Sending message:', text);
    setLoading(true);
    
    try {
      const messageData = {
        text: text.trim(),
        userEmail: user.email,
        userName: userProfile?.displayName || user.email.split('@')[0],
        userId: user.uid,
        channel: selectedChannel,
        timestamp: serverTimestamp(),
        userBranch: 'General'
      };

      console.log('Message data:', messageData);
      
      const docRef = await addDoc(collection(db, 'messages'), messageData);
      console.log('Message sent successfully with ID:', docRef.id);
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message: ' + error.message);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const getUserInitial = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const filteredMessages = messages.filter(message =>
    message.text && message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentChannel = channels.find(ch => ch.id === selectedChannel);

  // Test function to check Firebase connection
  const testFirebaseConnection = async () => {
    try {
      console.log('Testing Firebase connection...');
      const testRef = await addDoc(collection(db, 'test'), {
        test: 'connection test',
        timestamp: serverTimestamp()
      });
      console.log('Firebase connection successful, test document ID:', testRef.id);
    } catch (error) {
      console.error('Firebase connection failed:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Mobile Overlay */}
      {isSidebarOpen && window.innerWidth <= 1024 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative z-50 h-full ${
        isSidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full lg:translate-x-0 lg:w-20'
      } bg-gray-800 transition-all duration-300 flex flex-col border-r border-gray-700`}>
        
        <div className="p-4 border-b border-gray-700 flex-shrink-0">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <FaComments className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Engineering Hub</h1>
                  <p className="text-gray-400 text-sm">Discussion Rooms</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
              >
                <FaTimes className="text-gray-400" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaComments className="text-gray-400 text-xl" />
              </button>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Channels</h2>
              </div>
              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left ${
                      selectedChannel === channel.id 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">#{channel.name}</div>
                      <div className="text-xs text-gray-400 truncate">{channel.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Debug Section */}
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={testFirebaseConnection}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium transition-colors"
              >
                Test Firebase Connection
              </button>
              <div className="mt-2 text-xs text-gray-400">
                Messages: {messages.length}
                <br />
                User: {user?.email}
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 flex-shrink-0">
              <div className="flex items-center space-x-3 p-3 bg-gray-750 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {getUserInitial()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{userProfile?.displayName || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <FaSignOutAlt className="text-sm" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <div className="bg-gray-750 border-b border-gray-700 p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaBars className="text-gray-400" />
              </button>
              {currentChannel && (
                <div>
                  <h1 className="text-lg font-bold">#{currentChannel.name}</h1>
                  <p className="text-gray-400 text-sm">{messages.length} messages</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="bg-gray-750 border-b border-gray-700 p-4 hidden lg:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaBars className="text-gray-400" />
              </button>
              
              {currentChannel && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-purple-500/20">
                    <FaComments className="text-purple-500 text-lg" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">#{currentChannel.name}</h1>
                    <p className="text-gray-400 text-sm flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      {messages.length} messages
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col bg-gray-750 min-h-0">
          <MessageList 
            messages={searchTerm ? filteredMessages : messages} 
            searchTerm={searchTerm}
          />
          <MessageInput 
            onSendMessage={sendMessage} 
            loading={loading}
            channel={currentChannel}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscussionRoom;