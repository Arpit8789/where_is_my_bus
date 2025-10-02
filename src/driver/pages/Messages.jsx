import { useState, useEffect } from 'react';
import { Send, Users, ArrowLeft, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { getDriverMessages, sendMessage, sendBulkMessage } from '@/services/driverService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ChatPanel from '@/driver/components/ChatPanel';
import BulkMessage from '@/driver/components/BulkMessage';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showBulkMessage, setShowBulkMessage] = useState(false);
  const [showChatList, setShowChatList] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await getDriverMessages(user.id);
      setMessages(response.data);
      if (response.data.length > 0 && !selectedChat) {
        setSelectedChat(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async (messageText) => {
    try {
      await sendMessage({
        from: user.id,
        to: selectedChat.from.id,
        message: messageText,
      });
      toast.success('Message sent!');
      loadMessages();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleBulkMessage = async (messageText) => {
    try {
      await sendBulkMessage({
        driverId: user.id,
        message: messageText,
      });
      toast.success('Message sent to all passengers!');
      setShowBulkMessage(false);
    } catch (error) {
      toast.error('Failed to send bulk message');
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowChatList(false); // Hide list on mobile when chat selected
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        {selectedChat && !showChatList ? (
          <>
            <button
              onClick={() => setShowChatList(true)}
              className="p-2 rounded-lg hover:bg-gray-100 mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 flex-1">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {selectedChat.from.name[0]}
              </div>
              <div>
                <p className="font-semibold text-sm">{selectedChat.from.name}</p>
                <p className="text-xs text-gray-500">Passenger</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-lg font-bold text-gray-900">Messages</h1>
            <Button
              size="sm"
              variant="primary"
              icon={<Users className="h-4 w-4" />}
              onClick={() => setShowBulkMessage(true)}
            >
              Broadcast
            </Button>
          </>
        )}
      </div>

      <div className="flex h-[calc(100vh-64px)] lg:h-screen">
        {/* Message List Sidebar */}
        <div className={`
          ${showChatList ? 'block' : 'hidden'} lg:block
          w-full lg:w-96 
          bg-white border-r 
          overflow-y-auto
        `}>
          <div className="p-4">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-display font-bold text-gray-900">Messages</h1>
              <Button
                size="sm"
                variant="primary"
                icon={<Users className="h-4 w-4" />}
                onClick={() => setShowBulkMessage(true)}
              >
                Broadcast
              </Button>
            </div>

            <h2 className="text-base font-semibold mb-4">Conversations</h2>
            <div className="space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectChat(msg)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat?.id === msg.id
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {msg.from.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{msg.from.name}</p>
                      <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                    </div>
                    {!msg.isRead && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className={`
          ${!showChatList ? 'block' : 'hidden'} lg:block
          flex-1 
          ${selectedChat ? 'bg-white' : 'bg-gray-50'}
        `}>
          {selectedChat ? (
            <div className="h-full p-2 sm:p-4 lg:p-6">
              <ChatPanel
                chat={selectedChat}
                onSend={handleSendMessage}
              />
            </div>
          ) : (
            <div className="hidden lg:flex items-center justify-center h-full">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Message Modal */}
      {showBulkMessage && (
        <BulkMessage
          onSend={handleBulkMessage}
          onClose={() => setShowBulkMessage(false)}
        />
      )}
    </div>
  );
};

export default Messages;
