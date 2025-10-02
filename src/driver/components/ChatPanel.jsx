import { useState } from 'react';
import { Send } from 'lucide-react';
import Card from '@/components/ui/Card';
import MessageInput from './MessageInput';
import { getTimeAgo } from '@/utils/helpers';

const ChatPanel = ({ chat, onSend }) => {
  const [messages, setMessages] = useState([chat]);

  const handleSend = (messageText) => {
    onSend(messageText);
    setMessages([
      ...messages,
      {
        id: Date.now(),
        message: messageText,
        timestamp: new Date().toISOString(),
        isRead: true,
        from: { name: 'You' },
      },
    ]);
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Chat Header - Desktop Only (Mobile has it in parent) */}
      <div className="hidden lg:block border-b pb-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
            {chat.from.name[0]}
          </div>
          <div>
            <p className="font-semibold">{chat.from.name}</p>
            <p className="text-sm text-gray-600">Passenger</p>
          </div>
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2 sm:px-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from.name === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-xs px-3 sm:px-4 py-2 rounded-lg ${
                msg.from.name === 'You'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm sm:text-base break-words">{msg.message}</p>
              <p className={`text-xs mt-1 ${msg.from.name === 'You' ? 'text-primary-100' : 'text-gray-500'}`}>
                {getTimeAgo(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </Card>
  );
};

export default ChatPanel;
