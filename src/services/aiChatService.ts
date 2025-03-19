/**
 * AI Chat Service
 * Handles real-time chat interactions with AI assistant
 */

import { useState, useEffect, useCallback } from 'react';

// Types for chat messages
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock AI response function (in a real app, this would call an external API)
const generateAIResponse = async (message: string, context?: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple response logic based on keywords in the message
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('research') || lowerMessage.includes('topic')) {
    return "Based on your paper's focus on quantum computing and machine learning, you might consider researching quantum feature maps, variational quantum circuits, or quantum advantage in specific ML tasks. Recent papers have shown promising results in these areas.";
  } else if (lowerMessage.includes('explain') || lowerMessage.includes('concept')) {
    return "I'd be happy to explain a concept. Quantum machine learning combines quantum computing principles with machine learning algorithms. The key advantage is that quantum computers can process certain types of information exponentially faster than classical computers, potentially leading to breakthroughs in model training and inference.";
  } else if (lowerMessage.includes('citation') || lowerMessage.includes('reference')) {
    return "I recommend citing 'Quantum Machine Learning: A Review and Suggestions for Future Research' by Biamonte et al. (2017) and 'Supervised learning with quantum-enhanced feature spaces' by Havlíček et al. (2019). Both are foundational papers in the field of quantum machine learning.";
  } else if (lowerMessage.includes('plagiarism') || lowerMessage.includes('similarity')) {
    return "To avoid plagiarism, make sure to properly cite all sources, paraphrase effectively rather than copying text directly, and use plagiarism checking tools before finalizing your paper. I can help review specific sections if you'd like.";
  } else {
    return "I'm your research assistant for this paper. I can help with finding relevant research, explaining concepts, suggesting citations, or improving your writing. What specific aspect of your paper would you like assistance with?";
  }
};

/**
 * Custom hook for managing chat state and interactions
 * @returns Chat state and functions for managing chat
 */
export const useAIChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    // Load sessions from localStorage if available
    const savedSessions = localStorage.getItem('aiChatSessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  
  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    // Load active session from localStorage if available
    return localStorage.getItem('activeAIChatSession');
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('aiChatSessions', JSON.stringify(sessions));
  }, [sessions]);

  // Save active session to localStorage whenever it changes
  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('activeAIChatSession', activeSessionId);
    } else {
      localStorage.removeItem('activeAIChatSession');
    }
  }, [activeSessionId]);

  // Get the active session
  const activeSession = activeSessionId 
    ? sessions.find(session => session.id === activeSessionId) 
    : null;

  // Create a new chat session
  const createSession = useCallback((title: string = 'New Chat') => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setSessions(prevSessions => [...prevSessions, newSession]);
    setActiveSessionId(newSession.id);
    return newSession;
  }, []);

  // Send a message and get AI response
  const sendMessage = useCallback(async (content: string, context?: string) => {
    if (!content.trim()) return;
    
    // Create a session if none exists
    if (!activeSessionId) {
      createSession();
    }
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setSessions(prevSessions => {
      return prevSessions.map(session => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, userMessage],
            updatedAt: new Date()
          };
        }
        return session;
      });
    });
    
    // Generate AI response
    setIsLoading(true);
    try {
      const aiResponseContent = await generateAIResponse(content, context);
      
      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponseContent,
        timestamp: new Date()
      };
      
      setSessions(prevSessions => {
        return prevSessions.map(session => {
          if (session.id === activeSessionId) {
            return {
              ...session,
              messages: [...session.messages, aiMessage],
              updatedAt: new Date()
            };
          }
          return session;
        });
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeSessionId, createSession]);

  // Delete a chat session
  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
    
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  }, [activeSessionId]);

  // Rename a chat session
  const renameSession = useCallback((sessionId: string, newTitle: string) => {
    setSessions(prevSessions => {
      return prevSessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            title: newTitle,
            updatedAt: new Date()
          };
        }
        return session;
      });
    });
  }, []);

  // Clear messages in a chat session
  const clearSession = useCallback((sessionId: string) => {
    setSessions(prevSessions => {
      return prevSessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            messages: [],
            updatedAt: new Date()
          };
        }
        return session;
      });
    });
  }, []);

  return {
    sessions,
    activeSession,
    activeSessionId,
    isLoading,
    setActiveSessionId,
    createSession,
    sendMessage,
    deleteSession,
    renameSession,
    clearSession
  };
};

/**
 * Get chat suggestions based on paper content
 * @param content Paper content by section
 * @returns Array of suggested chat prompts
 */
export const getChatSuggestions = (content: Record<string, string>): string[] => {
  const suggestions: string[] = [
    "Find research ideas for quantum machine learning",
    "Explain quantum feature maps in simple terms",
    "Suggest citations for hybrid quantum-classical models",
    "How can I improve the methods section?"
  ];
  
  // Add content-specific suggestions
  if (content.abstract && content.abstract.length > 0) {
    suggestions.push("Help me refine my abstract");
  }
  
  if (content.introduction && content.introduction.length > 0) {
    suggestions.push("Suggest a stronger opening for my introduction");
  }
  
  if (content.methods && content.methods.length > 0) {
    suggestions.push("Review my methodology for clarity");
  }
  
  return suggestions;
};