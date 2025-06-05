
import React, { useState, useRef } from 'react';
import { ArrowLeft, Send, Paperclip, Smile, Mic, Camera } from 'lucide-react';
import type { User, Message } from '../pages/Index';

interface ChatRoomProps {
  currentUser: User;
  isDarkMode: boolean;
  onBack: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ currentUser, isDarkMode, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: currentUser.id === 'Rachit_14' ? 'Banku' : 'Rachit_14',
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      encrypted: true
    },
    {
      id: '2',
      sender: currentUser.id,
      content: 'I\'m doing great! Just working on some projects.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      encrypted: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const otherUser = currentUser.id === 'Rachit_14' ? 'Banku' : 'Rachit_14';

  const aiQuickReplies = [
    "That's awesome! 👍",
    "Sounds good to me 😊",
    "Let's do it! 🎉",
    "Can we call later? 📞",
    "Sure thing! ✅"
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUser.id,
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      encrypted: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Auto-reply simulation
        const replies = [
          "That's interesting!",
          "I agree with you.",
          "Let me think about that.",
          "Good point!",
          "Thanks for sharing!"
        ];
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: otherUser,
          content: replies[Math.floor(Math.random() * replies.length)],
          timestamp: new Date(),
          type: 'text',
          encrypted: true
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }, 500);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const message: Message = {
        id: Date.now().toString(),
        sender: currentUser.id,
        content: `📎 ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        encrypted: true
      };
      setMessages(prev => [...prev, message]);
    }
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {otherUser.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {otherUser}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              🔐 End-to-end encrypted
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === currentUser.id
                ? 'bg-purple-600 text-white'
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-white text-gray-900 border border-gray-200'
            } shadow-sm`}>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === currentUser.id 
                  ? 'text-purple-200' 
                  : isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {message.encrypted && ' • 🔐'}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Quick Replies */}
      <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex space-x-2 overflow-x-auto">
          {aiQuickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                isDarkMode 
                  ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
              } transition-colors`}
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleFileUpload}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <Paperclip className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Smile className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
          
          <button
            onClick={handleSendMessage}
            className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="*/*"
      />
    </div>
  );
};

export default ChatRoom;
