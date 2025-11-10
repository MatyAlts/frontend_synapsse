'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { productService, Product } from '@/services/productService';

interface SearchBarProps {
  onSearchResults?: (products: Product[]) => void;
  onSearchStart?: () => void;
  onClearSearch?: () => void;
}

export default function SearchBar({ onSearchResults, onSearchStart, onClearSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Búsqueda en tiempo real con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        // Si está vacío, limpiar la búsqueda
        if (onClearSearch) {
          onClearSearch();
        }
      }
    }, 500); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // Si la búsqueda está vacía, limpiar resultados
      if (onClearSearch) {
        onClearSearch();
      }
      return;
    }
    
    setIsSearching(true);
    if (onSearchStart) {
      onSearchStart();
    }
    
    try {
      const pagedResults = await productService.searchProducts(searchQuery);
      console.log('Resultados de búsqueda:', pagedResults);
      if (onSearchResults) {
        // Extraer el contenido del array de la respuesta paginada
        onSearchResults(pagedResults.content);
      }
    } catch (error) {
      console.error('Error buscando productos:', error);
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTagClick = async (tag: string) => {
    setSearchQuery(tag);
    setIsSearching(true);
    if (onSearchStart) {
      onSearchStart();
    }
    
    try {
      const pagedResults = await productService.searchProducts(tag);
      if (onSearchResults) {
        // Extraer el contenido del array de la respuesta paginada
        onSearchResults(pagedResults.content);
      }
    } catch (error) {
      console.error('Error buscando productos:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="sticky top-0 w-full p-2 md:p-4 mt-2 md:mt-5 z-30 bg-backdrop/60 backdrop-blur-md">
      <div className="w-full md:w-[95%] mx-auto">
        <div
          className={`
            relative bg-white/60 backdrop-blur-lg rounded-full 
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-out
            ${isFocused ? 'shadow-2xl scale-[1.02] ring-2 ring-green-400/40' : ''}
          `}
        >
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2">
            <Search 
              className={`
                w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 
                transition-transform duration-300
                ${isFocused ? 'scale-110' : ''}
              `}
            />
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder="Busca tu producto ideal..."
              className="
                flex-1 bg-transparent border-none outline-none
                py-2 md:py-3 text-sm md:text-base text-[#2f3031] font-thin
                placeholder:text-[#535657] placeholder:font-light
              "
            />
            
            <button
              onClick={handleSearch}
              className="cursor-pointer
                bg-green-600
                hover:bg-green-700
                text-white text-sm
                px-4 md:px-8 py-2 md:py-3 rounded-full
                transition-all duration-300
                hover:shadow-lg hover:scale-105
                active:scale-95
                focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
              "
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Sugerencias populares */}
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-baseline gap-2 md:gap-3">
          <p className="text-xs md:text-sm text-[#535657] mb-2 md:mb-3">Búsquedas populares:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Sérum facial', 'Contorno de ojos', 'Hidratación', 'Anti-edad'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className=" cursor-pointer
                  px-4 py-1.5 rounded-full text-xs
                  bg-white/60 text-[#535657]
                  border border-gray-200
                  hover:border-green-400 hover:text-green-600
                  transition-all duration-200
                  hover:shadow-md
                "
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

