'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChatWidget } from '../../hooks/useChatWidget';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

export const ChatWidget: React.FC = () => {
  const { chatState, toggleChat, sendMessage, clearChat } = useChatWidget();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, startX: 0, startY: 0 });
  const [isBouncing, setIsBouncing] = useState(false);

  // Auto scroll al final de los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    if (chatState.isExpanded) {
      scrollToBottom();
      // Focus en el input cuando se abre el chat
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [chatState.messages, chatState.isExpanded, chatState.isTyping]);

  // Detectar nuevos mensajes cuando el chat está minimizado
  useEffect(() => {
    if (!chatState.isExpanded && chatState.messages.length > 1) {
      const lastMessage = chatState.messages[chatState.messages.length - 1];
      if (!lastMessage.isUser) {
        setHasNewMessages(true);
      }
    } else if (chatState.isExpanded) {
      setHasNewMessages(false);
    }
  }, [chatState.messages, chatState.isExpanded]);

  // Resetear posición cuando se cierra el chat
  useEffect(() => {
    if (!chatState.isExpanded) {
      setPosition({ x: 0, y: 0 });
      setIsBouncing(false);
    }
  }, [chatState.isExpanded]);

  // Prevenir scroll de la página cuando se scrollea en el área de mensajes
  useEffect(() => {
    const messagesArea = messagesAreaRef.current;
    if (!messagesArea) return;

    const handleWheel = (e: WheelEvent) => {
      const atTop = messagesArea.scrollTop === 0;
      const atBottom = Math.abs(messagesArea.scrollHeight - messagesArea.scrollTop - messagesArea.clientHeight) < 1;

      // Si está en el tope y intenta scrollear hacia arriba, o en el fondo y intenta hacia abajo, prevenir
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    messagesArea.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      messagesArea.removeEventListener('wheel', handleWheel);
    };
  }, [chatState.isExpanded]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !chatState.isTyping) {
      await sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && chatState.isExpanded) {
      toggleChat();
    }
  };

  // Funciones para el arrastre horizontal
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsBouncing(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({
      x: clientX,
      y: clientY,
      startX: position.x,
      startY: position.y
    });
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    const newX = dragStart.startX + deltaX;
    // Aplicar resistencia al movimiento vertical (dividir por 3 para hacerlo más pesado)
    const newY = dragStart.startY + (deltaY / 3);

    // Obtener el ancho y alto del chat
    const chatHeight = chatContainerRef.current?.offsetHeight || 0;
    const chatWidth = chatContainerRef.current?.offsetWidth || 0;
    const viewportWidth = window.innerWidth;
    
    // Calcular límites horizontales: 24px de padding a cada lado
    const padding = 24;
    const maxRight = 0; // Máximo a la derecha (posición original con padding)
    const maxLeft = -(viewportWidth - chatWidth - (padding * 2)); // Máximo a la izquierda con mismo padding

    // Limitar el movimiento horizontal
    const clampedX = Math.max(Math.min(newX, maxRight), maxLeft);
    
    // Limitar el movimiento vertical para que no se pase del navbar (asumiendo navbar de ~64px de alto)
    const navbarHeight = 64;
    const bottomMargin = 16; // bottom-4 = 16px
    const maxUp = -(window.innerHeight - chatHeight - navbarHeight - bottomMargin);
    const maxDown = 0; // No puede bajar de su posición original
    
    const clampedY = Math.max(Math.min(newY, maxDown), maxUp);
    
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Si hay desplazamiento vertical o horizontal cerca de los límites, activar bounce
    if (position.y !== 0 || position.x !== 0) {
      setIsBouncing(true);
      
      // Calcular rebote horizontal solo si está cerca de los extremos
      const chatWidth = chatContainerRef.current?.offsetWidth || 0;
      const viewportWidth = window.innerWidth;
      const padding = 24;
      const maxLeft = -(viewportWidth - chatWidth - (padding * 2));
      
      // Aplicar un pequeño rebote horizontal si está en los extremos
      let bounceX = position.x;
      const threshold = 100; // Umbral de proximidad para activar bounce (aumentado para mayor efecto magnético)
      
      if (Math.abs(position.x) < threshold) {
        // Cerca del borde derecho, pequeño empuje hacia la derecha
        bounceX = 0;
      } else if (Math.abs(position.x - maxLeft) < threshold) {
        // Cerca del borde izquierdo, pequeño empuje hacia la izquierda
        bounceX = maxLeft;
      }
      
      // Volver a la posición original inmediatamente
      setPosition({ x: bounceX, y: 0 });
      
      // Desactivar bouncing después de la animación
      setTimeout(() => {
        setIsBouncing(false);
      }, 800);
    }
  };

  // Event listeners para el arrastre
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchEnd = () => handleDragEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart, position]);

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Asistente virtual SynAI"
    >
      {/* Chat expandido */}
      {chatState.isExpanded && (
        <div 
          ref={chatContainerRef}
          className="mb-2 w-80 sm:w-96 h-[32rem] backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 flex flex-col animate-slideUp overflow-hidden pointer-events-auto"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : isBouncing ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
        >
          {/* Header - Área de arrastre */}
          <div
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            className={`select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            <ChatHeader 
              isOnline={chatState.isOnline}
              onClose={toggleChat}
              onClear={clearChat}
            />
          </div>

          {/* Área de mensajes */}
          <div 
            ref={messagesAreaRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* Typing indicator */}
            {chatState.isTyping && (
              <div className="flex justify-start">
                <TypingIndicator isVisible={chatState.isTyping} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white select-none">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu consulta sobre skincare..."
                disabled={chatState.isTyping}
                className={`
                  flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#8BC34A]/20 focus:border-[#8BC34A]
                  ${chatState.isTyping ? 'bg-gray-100 text-gray-400' : 'bg-white'}
                  transition-all duration-200
                `}
                aria-label="Escribir mensaje"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || chatState.isTyping}
                className={`
                  px-4 py-2 rounded-full font-medium text-sm transition-all duration-200
                  ${(!inputMessage.trim() || chatState.isTyping)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#8BC34A] text-white hover:bg-[#7CB342] hover:shadow-lg transform hover:scale-105 active:scale-95'
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#8BC34A]/20
                `}
                aria-label="Enviar mensaje"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      {!chatState.isExpanded && (
        <button
          onClick={toggleChat}
          className="cursor-pointer w-14 h-14 bg-gradient-to-br from-[#8BC34A] to-[#7CB342] rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#8BC34A]/20 relative group animate-fadeIn pointer-events-auto"
          aria-label="Abrir chat de SynAI"
          aria-expanded={false}
        >
          {/* Badge de notificación */}
          {hasNewMessages && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce shadow-lg">
              !
            </div>
          )}

          {/* Icono del chat */}
          <div className="flex items-center justify-center w-full h-full">
            <img 
              src="/bot-icon.png"
              alt="SynAI Bot"
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 object-contain"
            />
          </div>

          {/* Indicador de estado online */}
          {chatState.isOnline && (
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      )}
    </div>
  );
};

export default ChatWidget;