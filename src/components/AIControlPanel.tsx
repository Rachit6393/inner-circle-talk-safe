
import React, { useState } from 'react';
import { ArrowLeft, Brain, MessageSquare, Settings as SettingsIcon, Globe, Smile } from 'lucide-react';

interface AIControlPanelProps {
  isDarkMode: boolean;
  onBack: () => void;
}

const AIControlPanel: React.FC<AIControlPanelProps> = ({ isDarkMode, onBack }) => {
  const [selectedTone, setSelectedTone] = useState('friendly');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [autoSuggestions, setAutoSuggestions] = useState(true);
  const [contextAware, setContextAware] = useState(true);

  const tones = [
    { id: 'funny', label: 'Funny', emoji: '😄', description: 'Humorous and playful responses' },
    { id: 'professional', label: 'Professional', emoji: '💼', description: 'Formal and business-like' },
    { id: 'friendly', label: 'Friendly', emoji: '😊', description: 'Warm and casual conversation' },
    { id: 'romantic', label: 'Romantic', emoji: '💕', description: 'Sweet and affectionate' }
  ];

  const languages = [
    { id: 'english', label: 'English', flag: '🇺🇸' },
    { id: 'hindi', label: 'Hindi', flag: '🇮🇳' },
    { id: 'hinglish', label: 'Hinglish', flag: '🇮🇳' }
  ];

  const suggestions = [
    "That's awesome! 👍",
    "Sounds like a plan! 🎯",
    "Let's catch up soon! ☕",
    "Missing you! 💕",
    "That's hilarious! 😂",
    "Good morning sunshine! ☀️"
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <Brain className="w-6 h-6 text-purple-600" />
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            AI Assistant
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Tone Selection */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-2 mb-4">
            <Smile className="w-5 h-5 text-purple-600" />
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response Tone
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tones.map(tone => (
              <button
                key={tone.id}
                onClick={() => setSelectedTone(tone.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTone === tone.id
                    ? 'border-purple-500 bg-purple-50' + (isDarkMode ? ' bg-opacity-20' : '')
                    : isDarkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{tone.emoji}</div>
                  <div className={`font-medium ${
                    selectedTone === tone.id 
                      ? 'text-purple-600' 
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tone.label}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {tone.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-purple-600" />
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Language Preference
            </h2>
          </div>
          <div className="space-y-2">
            {languages.map(language => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
                className={`w-full p-3 rounded-lg border transition-all flex items-center space-x-3 ${
                  selectedLanguage === language.id
                    ? 'border-purple-500 bg-purple-50' + (isDarkMode ? ' bg-opacity-20' : '')
                    : isDarkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className={`font-medium ${
                  selectedLanguage === language.id 
                    ? 'text-purple-600' 
                    : isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {language.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Settings */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-2 mb-4">
            <SettingsIcon className="w-5 h-5 text-purple-600" />
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Features
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Auto Suggestions
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Show AI-powered quick replies
                </p>
              </div>
              <button
                onClick={() => setAutoSuggestions(!autoSuggestions)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  autoSuggestions ? 'bg-purple-600' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoSuggestions ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Context Awareness
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI learns from conversation context
                </p>
              </div>
              <button
                onClick={() => setContextAware(!contextAware)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  contextAware ? 'bg-purple-600' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  contextAware ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Sample Suggestions */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sample Suggestions ({selectedTone})
            </h2>
          </div>
          <div className="space-y-2">
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'
                }`}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          Save AI Preferences
        </button>
      </div>
    </div>
  );
};

export default AIControlPanel;
