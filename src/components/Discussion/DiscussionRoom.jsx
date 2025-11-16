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
import { FaComments, FaUser, FaSignOutAlt, FaArrowLeft, FaUsers, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DiscussionRoom = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeUsers, setActiveUsers] = useState(24);
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData.reverse());
    });

    // Simulate active users
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(20, Math.min(30, prev + change));
      });
    }, 10000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
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
        timestamp: serverTimestamp()
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="container-responsive">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 lg:hidden"
              >
                <FaArrowLeft className="text-gray-600 text-lg" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-lg">
                  <FaComments className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Discussion Hub
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FaUsers className="mr-1 text-green-500" />
                    <span className="text-green-600 font-semibold">{activeUsers}</span>
                    <span className="text-gray-400 ml-1">students online</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden md:flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {getUserInitial()}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900 max-w-32 truncate">
                    {userProfile?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm font-semibold"
              >
                <FaSignOutAlt className="text-sm" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex container-responsive py-6 gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="glass-card p-6 rounded-2xl h-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Engineering Community</h3>
              <p className="text-sm text-gray-600">Connect with fellow MAKAUT students</p>
            </div>

            {/* Online Users */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Online Now</h4>
                <div className="flex items-center text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-semibold">{activeUsers}</span>
                </div>
              </div>
              <div className="space-y-3">
                {['ECE', 'EE', 'ME', 'CE', 'CSE'].map((branch, index) => (
                  <div key={branch} className="flex items-center justify-between p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        branch === 'ECE' ? 'bg-blue-500' :
                        branch === 'EE' ? 'bg-green-500' :
                        branch === 'ME' ? 'bg-red-500' :
                        branch === 'CE' ? 'bg-yellow-500' : 'bg-purple-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-700">{branch}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {Math.floor(Math.random() * 8) + 3} online
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 text-white">
              <div className="flex items-center mb-2">
                <FaRocket className="text-white text-lg mr-2" />
                <h4 className="font-semibold">Pro Tip</h4>
              </div>
              <p className="text-sm opacity-90">
                Share your doubts and help others. Together we learn better!
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">MAKAUT Community Chat</h3>
                  <p className="text-sm text-gray-600">Real-time discussion with engineering students</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <MessageList messages={messages} />
            <MessageInput onSendMessage={sendMessage} loading={loading} />
          </div>
          
          {/* Mobile User Info */}
          <div className="lg:hidden bg-white rounded-2xl p-4 mt-4 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {getUserInitial()}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {userProfile?.displayName || 'User'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionRoom;