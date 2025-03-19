import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, ArrowRight, Plus, X, Clock, 
  FileText, Search, BookOpen, Send, Trash2, Edit
} from 'lucide-react';
import { useAIChat, ChatMessage, getChatSuggestions } from '../services/aiChatService';

interface AIChatProps {
  showChat: boolean;
  onClose: () => void;
  paperContent?: Record<string, string>;
  paperTitle?: string;
}

const AIChat: React.FC<AIChatProps> = ({ 
  showChat, 
  onClose, 
  paperContent = {}, 
  paperTitle = ''
}) => {
  const {
    activeSession,
    isLoading,
    createSession,
    sendMessage,
    deleteSession,
    clearSession
  } = useAIChat();

  const [inputValue, setInputValue] = useState('');
  const [context, setContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Get chat suggestions based on paper content
  const suggestions = getChatSuggestions(paperContent);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSession?.messages]);

  // Focus input when chat is shown
  useEffect(() => {
    if (showChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showChat]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    // Join context array into a string if there are any contexts
    const contextString = context.length > 0 ? context.join('\n') : undefined;
    
    await sendMessage(inputValue, contextString);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleContext = (contextType: string) => {
    if (context.includes(contextType)) {
      setContext(context.filter(c => c !== contextType));
    } else {
      setContext([...context, contextType]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleNewChat = () => {
    createSession(paperTitle ? `Chat about ${paperTitle}` : 'New Chat');
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={`w-96 bg-[#36393f] border-l border-gray-700 shadow-sm text-white flex flex-col ai-chat-section transition-transform duration-300 ease-in-out fixed top-0 right-0 bottom-0 z-10 ${showChat ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">AI Chat</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleNewChat}
            className="text-green-500 hover:text-green-400 flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>New Chat</span>
          </button>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {activeSession && activeSession.messages.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {activeSession.messages.map((message: ChatMessage) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-[#40444b] text-gray-100'}`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-[#40444b] text-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start h-full">
            <div className="w-full px-4">
              <p className="text-sm text-gray-400 mt-2">
                Research questions
              </p>
              {suggestions.map((suggestion, index) => (
                <button 
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center rounded-md p-2 text-sm hover:bg-[#40444b] w-full text-left mb-2"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex flex-col">
          <div className="flex items-center justify-start space-x-2 mb-2">
            <button 
              onClick={() => toggleContext('document')}
              className={`flex items-center rounded-md p-2 text-sm ${context.includes('document') ? 'bg-blue-600' : 'bg-[#40444b] hover:bg-[#4f535b]'}`}
            >
              <FileText className="h-4 w-4 mr-1" />
              Current Document
              {context.includes('document') && (
                <X 
                  className="h-3 w-3 ml-1 text-gray-400" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleContext('document');
                  }} 
                />
              )}
            </button>
            <button 
              onClick={() => toggleContext('web')}
              className={`flex items-center rounded-md p-2 text-sm ${context.includes('web') ? 'bg-blue-600' : 'bg-[#40444b] hover:bg-[#4f535b]'}`}
            >
              <Search className="h-4 w-4 mr-1" />
              Web
              {context.includes('web') && (
                <X 
                  className="h-3 w-3 ml-1 text-gray-400" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleContext('web');
                  }} 
                />
              )}
            </button>
            <button 
              onClick={() => toggleContext('library')}
              className={`flex items-center rounded-md p-2 text-sm ${context.includes('library') ? 'bg-blue-600' : 'bg-[#40444b] hover:bg-[#4f535b]'}`}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Library
              {context.includes('library') && (
                <X 
                  className="h-3 w-3 ml-1 text-gray-400" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleContext('library');
                  }} 
                />
              )}
            </button>
          </div>
          <div className="flex items-center">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-[#40444b] rounded-md p-3 text-sm text-gray-200 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ask assistant, use @ to mention specific PDFs..."
              />
            </div>
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || inputValue.trim() === ''}
              className={`bg-blue-600 text-white rounded-md p-2 ml-2 ${isLoading || inputValue.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Session management buttons */}
      {activeSession && activeSession.messages.length > 0 && (
        <div className="p-2 border-t border-gray-700 flex justify-end space-x-2">
          <button 
            onClick={() => clearSession(activeSession.id)}
            className="text-xs text-gray-400 hover:text-white flex items-center p-1"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default AIChat;