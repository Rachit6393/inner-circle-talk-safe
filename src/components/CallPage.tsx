
import React, { useState } from 'react';
import { ArrowLeft, Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2 } from 'lucide-react';
import type { User } from '../pages/Index';

interface CallPageProps {
  currentUser: User;
  isDarkMode: boolean;
  onBack: () => void;
}

const CallPage: React.FC<CallPageProps> = ({ currentUser, isDarkMode, onBack }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');

  const otherUser = currentUser.id === 'Rachit_14' ? 'Banku' : 'Rachit_14';

  const startCall = (type: 'voice' | 'video') => {
    setCallType(type);
    setIsCallActive(true);
    if (type === 'video') {
      setIsVideoOn(true);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsVideoOn(false);
    setIsMicOn(true);
  };

  const callHistory = [
    { id: 1, type: 'video', duration: '12:34', timestamp: '2 hours ago', incoming: false },
    { id: 2, type: 'voice', duration: '05:42', timestamp: 'Yesterday', incoming: true },
    { id: 3, type: 'video', duration: '25:18', timestamp: '2 days ago', incoming: false },
  ];

  if (isCallActive) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'}`}>
        {/* Call Header */}
        <div className="p-6 text-center">
          <h2 className="text-white text-xl font-semibold mb-2">
            {callType === 'video' ? 'Video Call' : 'Voice Call'}
          </h2>
          <p className="text-gray-300">{otherUser}</p>
          <p className="text-green-400 text-sm mt-2">🔐 End-to-end encrypted</p>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative">
          {isVideoOn ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-4xl">
                  {otherUser.charAt(0)}
                </span>
              </div>
              {/* Self video (small) */}
              <div className="absolute top-4 right-4 w-24 h-32 bg-gray-700 rounded-lg border-2 border-white">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {currentUser.displayName.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">
                    {otherUser.charAt(0)}
                  </span>
                </div>
                <p className="text-white text-lg">{otherUser}</p>
                <p className="text-gray-400">Voice call in progress...</p>
              </div>
            </div>
          )}
        </div>

        {/* Call Controls */}
        <div className="p-6">
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-4 rounded-full ${
                isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              } transition-colors`}
            >
              {isMicOn ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <MicOff className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={endCall}
              className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full ${
                isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-600 hover:bg-gray-500'
              } transition-colors`}
            >
              {isVideoOn ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>

            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <Volume2 className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Calls
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Card */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {otherUser.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {otherUser}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                🔐 End-to-end encrypted calls
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => startCall('voice')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Voice Call</span>
            </button>
            <button
              onClick={() => startCall('video')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Video className="w-5 h-5" />
              <span>Video Call</span>
            </button>
          </div>
        </div>

        {/* Call History */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Calls
          </h3>
          <div className="space-y-3">
            {callHistory.map((call) => (
              <div key={call.id} className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                <div className={`p-2 rounded-lg ${call.type === 'video' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  {call.type === 'video' ? (
                    <Video className={`w-4 h-4 ${call.type === 'video' ? 'text-blue-600' : 'text-green-600'}`} />
                  ) : (
                    <Phone className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {otherUser}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      call.incoming 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {call.incoming ? 'Incoming' : 'Outgoing'}
                    </span>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {call.duration} • {call.timestamp}
                  </div>
                </div>
                <button
                  onClick={() => startCall(call.type)}
                  className={`p-2 rounded-lg ${call.type === 'video' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
                >
                  {call.type === 'video' ? (
                    <Video className="w-4 h-4 text-white" />
                  ) : (
                    <Phone className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
