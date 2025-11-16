import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';

export const useOnlineUsers = (channelId) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user, userProfile } = useAuth();

  useEffect(() => {
    if (!user || !channelId) return;

    const userPresenceRef = doc(db, 'presence', user.uid);
    const channelPresenceRef = collection(db, 'channels', channelId, 'presence');

    // Set user as online
    const setUserOnline = async () => {
      await setDoc(userPresenceRef, {
        uid: user.uid,
        email: user.email,
        displayName: userProfile?.displayName || user.email.split('@')[0],
        channel: channelId,
        lastSeen: serverTimestamp(),
        status: 'online',
        photoURL: user.photoURL
      }, { merge: true });

      await setDoc(doc(channelPresenceRef, user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: userProfile?.displayName || user.email.split('@')[0],
        lastSeen: serverTimestamp(),
        status: 'online'
      }, { merge: true });
    };

    setUserOnline();

    // Listen for online users in current channel
    const unsubscribe = onSnapshot(channelPresenceRef, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const userData = doc.data();
        // Consider user online if they were active in last 2 minutes
        if (userData.lastSeen && (new Date() - userData.lastSeen.toDate()) < 120000) {
          users.push(userData);
        }
      });
      setOnlineUsers(users);
    });

    // Update lastSeen every 30 seconds
    const interval = setInterval(() => {
      setDoc(userPresenceRef, {
        lastSeen: serverTimestamp(),
        status: 'online'
      }, { merge: true });
    }, 30000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      unsubscribe();
      // Set user as offline
      setDoc(userPresenceRef, {
        status: 'offline',
        lastSeen: serverTimestamp()
      }, { merge: true });
      deleteDoc(doc(channelPresenceRef, user.uid));
    };
  }, [user, channelId, userProfile]);

  return onlineUsers;
};