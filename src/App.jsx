import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discussion from './pages/Discussion';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AuthGuard from './components/Auth/AuthGuard';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col w-screen max-w-screen overflow-x-hidden bg-gray-50">
          <Header />
          <main className="flex-grow w-screen max-w-screen overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/discussion" 
                element={
                  <AuthGuard>
                    <Discussion />
                  </AuthGuard>
                } 
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;