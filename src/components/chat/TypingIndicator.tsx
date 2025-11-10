'use client';

import React from 'react';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center space-x-1 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-fit">
      <div className="flex items-center space-x-1">
        <div 
          className="w-2 h-2 bg-[#8BC34A] rounded-full animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
        />
        <div 
          className="w-2 h-2 bg-[#8BC34A] rounded-full animate-bounce"
          style={{ animationDelay: '200ms', animationDuration: '1.4s' }}
        />
        <div 
          className="w-2 h-2 bg-[#8BC34A] rounded-full animate-bounce"
          style={{ animationDelay: '400ms', animationDuration: '1.4s' }}
        />
      </div>
      <span className="text-xs text-gray-500 ml-2 font-medium">
        SynAI está escribiendo...
      </span>
    </div>
  );
};

export default TypingIndicator;