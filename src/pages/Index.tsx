
import React, { useState, useEffect } from 'react';
import LoginScreen from '../components/LoginScreen';
import HomePage from '../components/HomePage';
import ChatRoom from '../components/ChatRoom';
import CallPage from '../components/CallPage';
import MediaGallery from '../components/MediaGallery';
import AIControlPanel from '../components/AIControlPanel';
import SettingsPage from '../components/SettingsPage';

export type User = {
  id: string;
  password: string;
  displayName: string;
};

export type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice';
  encrypted: boolean;
};

const AUTHORIZED_USERS: User[] = [
  { id: 'Rachit_14', password: '123456789', displayName: 'Rachit' },
  { id: 'Banku', password: '123456789', displayName: 'Banku' }
];

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('privyTalkUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const validUser = AUTHORIZED_USERS.find(u => u.id === user.id);
      if (validUser) {
        setCurrentUser(validUser);
      }
    }
  }, []);

  const handleLogin = (username: string, password: string): boolean => {
    const user = AUTHORIZED_USERS.find(u => u.id === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('privyTalkUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('privyTalkUser');
    setCurrentScreen('home');
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} isDarkMode={isDarkMode} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'chat':
        return <ChatRoom currentUser={currentUser} isDarkMode={isDarkMode} onBack={() => setCurrentScreen('home')} />;
      case 'call':
        return <CallPage currentUser={currentUser} isDarkMode={isDarkMode} onBack={() => setCurrentScreen('home')} />;
      case 'media':
        return <MediaGallery isDarkMode={isDarkMode} onBack={() => setCurrentScreen('home')} />;
      case 'ai':
        return <AIControlPanel isDarkMode={isDarkMode} onBack={() => setCurrentScreen('home')} />;
      case 'settings':
        return <SettingsPage 
          currentUser={currentUser} 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLogout={handleLogout}
          onBack={() => setCurrentScreen('home')} 
        />;
      default:
        return <HomePage 
          currentUser={currentUser} 
          isDarkMode={isDarkMode}
          onNavigate={setCurrentScreen} 
        />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {renderScreen()}
    </div>
  );
};

export default Index;
