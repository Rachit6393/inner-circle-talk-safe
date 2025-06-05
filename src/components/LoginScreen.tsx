
import React, { useState } from 'react';
import { Lock, User, Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => boolean;
  isDarkMode: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = onLogin(username, password);
    if (!success) {
      setError('Access denied');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${
            isDarkMode ? 'bg-white/10 backdrop-blur-xl' : 'bg-gray-900/5 backdrop-blur-xl'
          }`}>
            <Shield className={`w-10 h-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
          </div>
          <h1 className={`text-3xl font-light mb-2 tracking-wide ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            PrivyTalk
          </h1>
          <p className={`text-sm font-light ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Secure communication platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <User className={`absolute left-0 top-3 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-8 minimal-input ${
                  isDarkMode 
                    ? 'text-white placeholder-gray-400' 
                    : 'text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Username"
                required
              />
            </div>

            <div className="relative">
              <Lock className={`absolute left-0 top-3 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-8 minimal-input ${
                  isDarkMode 
                    ? 'text-white placeholder-gray-400' 
                    : 'text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Password"
                required
              />
            </div>
          </div>

          {error && (
            <div className={`p-4 rounded-xl text-sm font-medium ${
              isDarkMode 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-medium transition-all duration-200 ${
              isDarkMode
                ? 'bg-white text-gray-900 hover:bg-gray-100'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            } transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className={`mt-12 pt-8 border-t text-center ${
          isDarkMode 
            ? 'border-gray-800 text-gray-500' 
            : 'border-gray-200 text-gray-600'
        }`}>
          <p className="text-xs font-light">
            End-to-end encrypted • Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
