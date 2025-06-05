
import React, { useState } from 'react';
import { ArrowLeft, Download, Share, Trash2, FileText, Image as ImageIcon, Video, Music } from 'lucide-react';

interface MediaGalleryProps {
  isDarkMode: boolean;
  onBack: () => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ isDarkMode, onBack }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos' | 'documents'>('all');

  const mediaItems = [
    { id: 1, type: 'photo', name: 'IMG_001.jpg', size: '2.4 MB', date: '2 hours ago', thumbnail: '/placeholder.svg' },
    { id: 2, type: 'video', name: 'VID_002.mp4', size: '15.2 MB', date: '1 day ago', thumbnail: '/placeholder.svg' },
    { id: 3, type: 'document', name: 'project_plan.pdf', size: '1.8 MB', date: '2 days ago' },
    { id: 4, type: 'photo', name: 'IMG_003.jpg', size: '3.1 MB', date: '3 days ago', thumbnail: '/placeholder.svg' },
    { id: 5, type: 'document', name: 'meeting_notes.docx', size: '245 KB', date: '1 week ago' },
    { id: 6, type: 'video', name: 'demo_video.mp4', size: '45.6 MB', date: '1 week ago', thumbnail: '/placeholder.svg' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'photo': return <ImageIcon className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return 'bg-blue-500';
      case 'video': return 'bg-red-500';
      case 'document': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredItems = activeTab === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => 
        activeTab === 'photos' ? item.type === 'photo' :
        activeTab === 'videos' ? item.type === 'video' :
        activeTab === 'documents' ? item.type === 'document' : true
      );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Media Gallery
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4`}>
        <div className="flex space-x-6">
          {[
            { id: 'all', label: 'All' },
            { id: 'photos', label: 'Photos' },
            { id: 'videos', label: 'Videos' },
            { id: 'documents', label: 'Documents' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : isDarkMode
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Info */}
      <div className={`mx-4 mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Storage Used
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            68.4 MB of 5 GB
          </span>
        </div>
        <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : ''}`}>
          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '1.4%' }}></div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="p-4">
        {filteredItems.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
              <ImageIcon className="w-8 h-8" />
            </div>
            <p>No {activeTab === 'all' ? 'media' : activeTab} files found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                {item.type === 'photo' || item.type === 'video' ? (
                  <div className="aspect-square bg-gray-200 relative">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square flex items-center justify-center bg-gray-100">
                    <div className={`${getTypeColor(item.type)} p-4 rounded-lg text-white`}>
                      {getIcon(item.type)}
                    </div>
                  </div>
                )}
                
                <div className="p-3">
                  <h3 className={`font-medium text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </h3>
                  <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>{item.size}</span>
                    <span className="mx-1">•</span>
                    <span>{item.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <button className={`flex-1 px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors`}>
                      <Download className="w-3 h-3 inline mr-1" />
                      Download
                    </button>
                    <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                      <Share className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                    <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
