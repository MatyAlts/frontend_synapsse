'use client';

import React from 'react';
import { Message } from '../../hooks/useChatWidget';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text, isUser, timestamp } = message;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Función para procesar texto con markdown básico
  const formatMessageText = (text: string) => {
    // Dividir el texto por **texto** para encontrar las partes en negrita
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      // Si la parte está entre ** y **, renderizar en negrita
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        const boldText = part.slice(2, -2); // Quitar los **
        return (
          <strong key={index} className="font-semibold">
            {boldText}
          </strong>
        );
      }
      // Si no, renderizar texto normal
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}
      role="group"
      aria-label={`Mensaje ${isUser ? 'del usuario' : 'del asistente'}`}
    >
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar para mensajes del asistente */}
        {!isUser && (
          <div className="flex items-center mb-1 select-none">
            <div className="w-6 h-6 bg-gradient-to-br from-[#8BC34A] to-[#7CB342] rounded-full flex items-center justify-center mr-2 shadow-sm">
              <img 
                src="/bot-icon.png"
                alt="SynAI Bot"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">SynAI</span>
          </div>
        )}

        {/* Burbuja del mensaje */}
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm border
            ${isUser 
              ? 'bg-[#8BC34A] text-white border-[#8BC34A] rounded-br-md' 
              : 'bg-white text-gray-800 border-gray-200 rounded-bl-md'
            }
            transition-all duration-200 hover:shadow-md
          `}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {formatMessageText(text)}
          </div>
          
          {/* Timestamp */}
          <div className={`
            flex mt-2 text-xs select-none
            ${isUser ? 'text-green-100 justify-end' : 'text-gray-500 justify-start'}
          `}>
            <time dateTime={timestamp.toISOString()}>
              {formatTime(timestamp)}
            </time>
          </div>
        </div>

        {/* Indicador de usuario */}
        {isUser && (
          <div className="flex items-center justify-end mt-1 select-none">
            <span className="text-xs text-gray-600 font-medium mr-2">Tú</span>
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-gray-600 text-xs">👤</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;