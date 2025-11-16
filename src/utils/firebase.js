// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB4NV7cF19O4CYC6sq8aGj2nPCXb4jr8M",
  authDomain: "coreengineers-hub-498d5.firebaseapp.com",
  projectId: "coreengineers-hub-498d5",
  storageBucket: "coreengineers-hub-498d5.firebasestorage.app",
  messagingSenderId: "414075917126",
  appId: "1:414075917126:web:bac5bb37dd6b71d4c30b47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;