import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  orderBy, 
  query, 
  serverTimestamp,
  limit,
  where
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useOnlineUsers } from '../../hooks/useOnlineUsers';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { 
  FaComments, 
  FaUser, 
  FaSignOutAlt, 
  FaArrowLeft, 
  FaUsers, 
  FaRocket, 
  FaGraduationCap,
  FaBell,
  FaSearch,
  FaPlus,
  FaHashtag,
  FaPaperPlane,
  FaRegSmile,
  FaPaperclip,
  FaCog,
  FaVolumeUp,
  FaVolumeMute,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DiscussionRoom = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  // Real online users
  const onlineUsers = useOnlineUsers(selectedChannel);

  const channels = [
    { id: 'general', name: 'General', icon: FaHashtag, color: 'text-gray-600', description: 'General discussions' },
    { id: 'ece', name: 'Electronics', icon: FaGraduationCap, color: 'text-blue-500', description: 'ECE students' },
    { id: 'ee', name: 'Electrical', icon: FaGraduationCap, color: 'text-green-500', description: 'EE students' },
    { id: 'me', name: 'Mechanical', icon: FaGraduationCap, color: 'text-red-500', description: 'ME students' },
    { id: 'ce', name: 'Civil', icon: FaGraduationCap, color: 'text-yellow-500', description: 'CE students' },
    { id: 'first-year', name: 'First Year', icon: FaRocket, color: 'text-purple-500', description: 'First year topics' },
    { id: 'projects', name: 'Projects', icon: FaRocket, color: 'text-pink-500', description: 'Project discussions' },
  ];

  useEffect(() => {
    const q = query(
      collection(db, 'messages'), 
      where('channel', '==', selectedChannel),
      orderBy('timestamp', 'desc'), 
      limit(100)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData.reverse());
    });

    return () => unsubscribe();
  }, [selectedChannel]);

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendMessage = async (text) => {
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        text,
        userEmail: user.email,
        userName: userProfile?.displayName || user.email.split('@')[0],
        userId: user.uid,
        channel: selectedChannel,
        userBranch: getUserBranch(),
        timestamp: serverTimestamp(),
        reactions: {}
      });
    } catch (error) {
      console.error('Error sending message:', error);
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

  const getUserBranch = () => {
    // You can get this from user profile or based on email/registration
    return 'ECE'; // Default for demo
  };

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentChannel = channels.find(ch => ch.id === selectedChannel);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChannelSelect = (channelId) => {
    setSelectedChannel(channelId);
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
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
        
        {/* Sidebar Header */}
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
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors lg:flex hidden"
              >
                <FaArrowLeft className="text-gray-400" />
              </button>
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
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaComments className="text-gray-400 text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Channels Section */}
        {isSidebarOpen && (
          <>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Channels</h2>
                <button className="text-gray-400 hover:text-white p-1">
                  <FaPlus className="text-sm" />
                </button>
              </div>
              <div className="space-y-1">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <button
                      key={channel.id}
                      onClick={() => handleChannelSelect(channel.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        selectedChannel === channel.id 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg' 
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <Icon className={`${channel.color} text-lg`} />
                      <div className="flex-1 text-left">
                        <div className="font-medium">#{channel.name}</div>
                        <div className="text-xs text-gray-400 truncate">{channel.description}</div>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                        {onlineUsers.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Online Users */}
            <div className="p-4 border-t border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                  Online — {onlineUsers.length}
                </h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setNotifications(!notifications)}
                    className={`p-1 rounded transition-colors ${
                      notifications ? 'text-green-400' : 'text-gray-400'
                    }`}
                  >
                    {notifications ? <FaVolumeUp /> : <FaVolumeMute />}
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {onlineUsers.map((user, index) => (
                  <div key={user.uid || index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 bg-green-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.displayName || user.email}</p>
                      <p className="text-xs text-gray-400 truncate">{user.userBranch || 'Student'}</p>
                    </div>
                  </div>
                ))}
                {onlineUsers.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No one online in this channel
                  </div>
                )}
              </div>
            </div>

            {/* User Profile */}
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
                  <p className="text-gray-400 text-sm">{onlineUsers.length} online</p>
                </div>
              )}
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <FaSearch className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Desktop Chat Header */}
        <div className="bg-gray-750 border-b border-gray-700 p-4 hidden lg:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaBars className="text-gray-400" />
              </button>
              
              <div className="flex items-center space-x-3">
                {currentChannel && (
                  <>
                    <div className={`p-2 rounded-xl ${
                      selectedChannel === 'general' ? 'bg-gray-700' :
                      selectedChannel === 'ece' ? 'bg-blue-500/20' :
                      selectedChannel === 'ee' ? 'bg-green-500/20' :
                      selectedChannel === 'me' ? 'bg-red-500/20' :
                      selectedChannel === 'ce' ? 'bg-yellow-500/20' : 'bg-purple-500/20'
                    }`}>
                      <currentChannel.icon className={`${currentChannel.color} text-lg`} />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">#{currentChannel.name}</h1>
                      <p className="text-gray-400 text-sm flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        {onlineUsers.length} members online
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Search Bar */}
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
              
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white">
                <FaBell />
              </button>
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