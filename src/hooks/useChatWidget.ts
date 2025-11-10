import { useState, useCallback, useEffect } from 'react';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatState {
  isExpanded: boolean;
  messages: Message[];
  isTyping: boolean;
  isOnline: boolean;
}

const generateSessionId = (): string => {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
};

const getSessionId = (): string => {
  let sessionId = localStorage.getItem('synai_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('synai_session_id', sessionId);
  }
  return sessionId;
};

export const useChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>({
    isExpanded: false,
    messages: [
      {
        id: '1',
        text: '¡Hola! Soy SynAI, tu asistente de SYNAPSE 🌿 ¿En qué puedo ayudarte con tu rutina de cuidado?',
        isUser: false,
        timestamp: new Date(),
      },
    ],
    isTyping: false,
    isOnline: true,
  });

  const toggleChat = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isExpanded: !prev.isExpanded,
    }));
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    try {
      const sessionId = getSessionId();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos para IA

      // Construir URL con query parameters
      const url = new URL('http://localhost:5678/webhook/chat-widget');
      url.searchParams.append('session_id', sessionId);
      url.searchParams.append('message', text);

      const response = await fetch(url.toString(), {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Obtener el texto de la respuesta
      const responseText = await response.text();
      
      let messageText = 'Lo siento, no pude procesar tu consulta.';
      
      try {
        // Intentar parsear como JSON
        const data = JSON.parse(responseText);
        messageText = data.message || responseText;
      } catch (jsonError) {
        // Si no es JSON válido, usar el texto directamente
        messageText = responseText || messageText;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: messageText,
        isUser: false,
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isTyping: false,
      }));

    } catch (error) {
      console.error('Error calling webhook:', error);
      
      let errorText = '🔌 No se puede conectar al servicio. Verifica que el webhook esté ejecutándose.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('signal is aborted')) {
          errorText = '⏱️ La IA está tardando más de lo esperado en responder (más de 60 segundos). Por favor, inténtalo de nuevo o reformula tu pregunta de manera más específica.';
        } else if (error.message.includes('Failed to fetch')) {
          errorText = '🔌 No se puede conectar al servicio. Verifica que el webhook esté ejecutándose en http://localhost:5678';
        } else if (error.message.includes('HTTP error')) {
          errorText = '🔧 El servicio respondió con un error. Por favor, inténtalo de nuevo.';
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        isUser: false,
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
        isOnline: false,
      }));
    }
  }, []);

  const clearChat = useCallback(() => {
    const newSessionId = generateSessionId();
    localStorage.setItem('synai_session_id', newSessionId);
    
    setChatState(prev => ({
      ...prev,
      messages: [prev.messages[0]],
    }));
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Health check con GET
        const url = new URL('http://localhost:5678/webhook/chat-widget');
        url.searchParams.append('session_id', 'health_check');
        url.searchParams.append('message', 'ping');

        const response = await fetch(url.toString(), {
          method: 'GET',
        });
        
        setChatState(prev => ({ ...prev, isOnline: response.ok }));
      } catch {
        setChatState(prev => ({ ...prev, isOnline: false }));
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return { chatState, toggleChat, sendMessage, clearChat };
};