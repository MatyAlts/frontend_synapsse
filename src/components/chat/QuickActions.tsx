'use client';

import React from 'react';

interface QuickActionsProps {
  questions: string[];
  onQuestionSelect: (question: string) => void;
  isDisabled?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  questions, 
  onQuestionSelect, 
  isDisabled = false 
}) => {
  return (
    <div className="p-4 bg-gray-50/50 border-t border-gray-200">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">💡</span>
          Consultas frecuentes
        </h4>
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question)}
            disabled={isDisabled}
            className={`
              w-full text-left px-3 py-2 rounded-lg border text-sm font-medium
              transition-all duration-200 transform
              ${isDisabled 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                : 'bg-white hover:bg-[#8BC34A]/5 hover:border-[#8BC34A]/30 text-gray-700 border-gray-200 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]'
              }
              focus:outline-none focus:ring-2 focus:ring-[#8BC34A]/20 focus:border-[#8BC34A]
            `}
            aria-label={`Preguntar: ${question}`}
          >
            <span className="block leading-relaxed">
              {question}
            </span>
          </button>
        ))}
      </div>

      {/* Mensaje de ayuda */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Haz clic en cualquier pregunta o escríbenos directamente
        </p>
      </div>
    </div>
  );
};

export default QuickActions;