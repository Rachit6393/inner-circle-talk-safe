
import React from 'react';
import { MessageSquare, Folder, Call, Settings, Smartphone, Sparkles } from 'lucide-react';
import type { User } from '../pages/Index';

interface HomePageProps {
  currentUser: User;
  isDarkMode: boolean;
  onNavigate: (screen: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ currentUser, isDarkMode, onNavigate }) => {
  const aiSuggestions = [
    "Hey! How's your day going? 😊",
    "Want to catch up over a call? 📞",
    "Just shared some photos with you! 📸",
    "Let's plan something fun for the weekend! 🎉"
  ];

  const navigationItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chats', description: 'End-to-end encrypted messaging' },
    { id: 'media', icon: Folder, label: 'Media', description: 'Shared photos and files' },
    { id: 'call', icon: Call, label: 'Call', description: 'Voice and video calls' },
    { id: 'settings', icon: Settings, label: 'Settings', description: 'App preferences' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                PrivyTalk
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome, {currentUser.displayName}!
              </p>
            </div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {currentUser.displayName.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* AI Suggestions Panel */}
        <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Quick Suggestions
            </h2>
          </div>
          <div className="space-y-2">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-white hover:bg-purple-100 text-gray-700'
                } shadow-sm`}
                onClick={() => onNavigate('chat')}
              >
                <p className="text-sm">{suggestion}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 gap-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              } shadow-lg`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.label}
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h3>
          <div className="flex space-x-3">
            <button 
              onClick={() => onNavigate('chat')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              New Chat
            </button>
            <button 
              onClick={() => onNavigate('call')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Start Call
            </button>
          </div>
        </div>

        {/* Security Status */}
        <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'} border ${isDarkMode ? 'border-green-700' : 'border-green-200'}`}>
          <p className={`text-sm text-center ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
            🔐 All communications are end-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
