"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ChevronRight, Sparkles, Sun, Droplets, Leaf, Heart, Moon, Search, MessageCircle } from 'lucide-react';
import { Category as ReduxCategory } from '@/redux/types';
import { Category, categoryService } from '@/services/categoryService';


const CategoriasSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    // Navegar a la tienda con el parámetro de categoría
    router.push(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  // Categorías de respaldo si no hay en la BD
  const defaultCategories: Category[] = [];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  const filteredCategories = displayCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/plant2.png')] bg-cover bg-center flex items-center justify-center">
        <div className="text-[#535657] text-lg">Cargando categorías...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[url('/plant2.png')] bg-cover bg-center">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-light text-gray-800 mb-3">Nuestras Categorías</h2>
          <p className="text-gray-500 text-xl font-light">Explorá nuestras líneas de productos naturales</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-green-100 bg-white/80 backdrop-blur-sm focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-gray-700"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white/50 backdrop-blur-sm rounded-3xl border border-green-100 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-br ${category.gradientColors} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-8xl opacity-20 -mr-4 -mt-4">
                  {category.imageEmoji}
                </div>
                <div className="relative z-10">
                  <div className="mb-4 text-4xl">{category.imageEmoji}</div>
                  <h3 className="text-2xl font-light mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.productCount} {category.productCount === 1 ? 'producto' : 'productos'}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>

                {/* Action Button */}
                <button 
                  onClick={() => handleCategoryClick(category.name)}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all font-medium group-hover:gap-3"
                >
                  Ver productos
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-green-100 p-12 text-center">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">No se encontraron categorías</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Featured Banner */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl shadow-xl p-8 md:p-12 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-3xl font-light mb-3">¿No encontrás lo que buscás?</h3>
              <p className="text-green-100 text-lg font-light">
                Nuestro equipo de especialistas está listo para ayudarte a encontrar el producto perfecto para tu tipo de piel
              </p>
            </div>
            <button className="cursor-pointer px-8 py-4 bg-white text-green-700 rounded-full hover:bg-green-50 transition-all font-medium whitespace-nowrap shadow-lg flex items-center gap-2">
              <MessageCircle size={20} />
              Contactar ahora
            </button>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 p-6 text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h4 className="font-medium text-gray-800 mb-2">100% Natural</h4>
            <p className="text-sm text-gray-600">
              Todos nuestros productos están formulados con ingredientes naturales y orgánicos
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 p-6 text-center">
            <div className="text-4xl mb-4">🐰</div>
            <h4 className="font-medium text-gray-800 mb-2">Cruelty-Free</h4>
            <p className="text-sm text-gray-600">
              No testeamos en animales y todos nuestros productos son veganos
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 p-6 text-center">
            <div className="text-4xl mb-4">♻️</div>
            <h4 className="font-medium text-gray-800 mb-2">Sustentable</h4>
            <p className="text-sm text-gray-600">
              Packaging eco-friendly y prácticas de producción sostenibles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriasSection;