
import React, { useState } from 'react';
import { ArrowLeft, User, Moon, Sun, Trash2, Info, LogOut, Shield, Bell } from 'lucide-react';
import type { User as UserType } from '../pages/Index';

interface SettingsPageProps {
  currentUser: UserType;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ 
  currentUser, 
  isDarkMode, 
  onToggleDarkMode, 
  onLogout, 
  onBack 
}) => {
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [notifications, setNotifications] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);

  const handleClearData = () => {
    localStorage.removeItem('privyTalkMessages');
    localStorage.removeItem('privyTalkMedia');
    setShowClearDataConfirm(false);
  };

  const settingsSections = [
    {
      title: 'Profile',
      items: [
        {
          icon: User,
          label: 'Display Name',
          value: displayName,
          type: 'input'
        }
      ]
    },
    {
      title: 'Appearance',
      items: [
        {
          icon: isDarkMode ? Moon : Sun,
          label: 'Dark Mode',
          type: 'toggle',
          value: isDarkMode,
          action: onToggleDarkMode
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          type: 'toggle',
          value: notifications,
          action: () => setNotifications(!notifications)
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: Shield,
          label: 'End-to-End Encryption',
          type: 'status',
          value: 'Enabled',
          status: 'success'
        },
        {
          icon: Trash2,
          label: 'Clear Chat History',
          type: 'action',
          action: () => setShowClearDataConfirm(true),
          destructive: true
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {currentUser.displayName.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentUser.displayName}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                @{currentUser.id}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                🔐 Verified User
              </p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      item.destructive 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`font-medium ${
                        item.destructive 
                          ? 'text-red-600' 
                          : isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.label}
                      </h4>
                      {item.type === 'status' && (
                        <p className={`text-sm ${
                          item.status === 'success' 
                            ? 'text-green-600' 
                            : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.type === 'input' && (
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={`px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  )}

                  {item.type === 'toggle' && (
                    <button
                      onClick={item.action}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        item.value ? 'bg-purple-600' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        item.value ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  )}

                  {item.type === 'action' && (
                    <button
                      onClick={item.action}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        item.destructive
                          ? 'bg-red-100 hover:bg-red-200 text-red-600'
                          : isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      Clear
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* About Section */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About PrivyTalk
            </h3>
          </div>
          <div className={`text-sm space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Version 1.0.0</p>
            <p>Secure, private messaging for authorized users only.</p>
            <p>All communications are end-to-end encrypted using industry-standard protocols.</p>
            <p className="pt-2 text-xs">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sign Out
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Are you sure you want to sign out? You'll need to enter your credentials again to access the app.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={onLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Data Confirmation Modal */}
      {showClearDataConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Clear Chat History
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              This will permanently delete all your chat history and media files. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearDataConfirm(false)}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
