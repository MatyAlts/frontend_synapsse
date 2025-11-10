'use client';

import React from 'react';

interface ChatHeaderProps {
  isOnline: boolean;
  onClose: () => void;
  onClear?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isOnline, onClose, onClear }) => {
  return (
    <div className="bg-gradient-to-r from-[#8BC34A] to-[#7CB342] p-4 rounded-t-xl shadow-lg select-none">
      <div className="flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img 
              src="/bot-icon.png"
              alt="SynAI Bot"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h3 className="text-white text-xl tracking-wide">
              SynAI
            </h3>
            <div className="flex items-center space-x-2">
              <div className={`
                w-2 h-2 rounded-full 
                ${isOnline ? 'bg-green-300 animate-pulse' : 'bg-gray-300'}
              `} />
              <span className="text-white/90 text-xs font-medium">
                {isOnline ? 'En línea' : 'Desconectado'}
              </span>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center space-x-2">
          {/* Botón limpiar chat */}
          {onClear && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="p-2 hover:scale-120 rounded-lg transition-all duration-300 group cursor-pointer"
              aria-label="Limpiar conversación"
              title="Limpiar conversación"
            >
              <svg 
                className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
          )}

          {/* Botón cerrar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="p-2 hover:scale-120 hover:rotate-45 rounded-lg transition-all duration-300 group cursor-pointer"
            aria-label="Cerrar chat"
            title="Cerrar chat"
          >
            <svg 
              className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Subtítulo */}
      <p className="text-white/80 text-xs mt-2 leading-relaxed">
        Tu asistente IA experto en cuidado natural de la piel 🌿
      </p>
    </div>
  );
};

export default ChatHeader;