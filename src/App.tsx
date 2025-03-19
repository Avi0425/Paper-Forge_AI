import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FileUp, BookOpen, FileCode, Search, CheckCircle, Download, Home, History, Settings, LogIn } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AIChat from './components/AIChat';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={showLogin ? (
            <Login onLogin={handleLogin} />
          ) : isLoggedIn ? (
            <Dashboard />
          ) : (
            <LandingPage onLogin={handleLoginClick} />
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
