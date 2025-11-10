"use client";
import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, Sparkles, Sun, Droplets, Leaf, Heart, Moon, Search, MessageCircle } from 'lucide-react';
import { Category } from '@/redux/types';


const CategoriasSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    {
      id: 1,
      name: 'Hidratación Profunda',
      description: 'Productos formulados para nutrir e hidratar tu piel en profundidad, restaurando su equilibrio natural.',
      icon: <Droplets size={32} />,
      productCount: 12,
      image: '💧',
      color: 'from-blue-400 to-blue-600',
      benefits: ['Hidratación 24h', 'Piel suave', 'Nutrición intensa'],
    },
    {
      id: 2,
      name: 'Anti-Edad',
      description: 'Fórmulas especializadas para prevenir y reducir los signos visibles del envejecimiento.',
      icon: <Sparkles size={32} />,
      productCount: 8,
      image: '✨',
      color: 'from-purple-400 to-purple-600',
      benefits: ['Reduce arrugas', 'Firmeza', 'Luminosidad'],
    },
    {
      id: 3,
      name: 'Protección Solar',
      description: 'Cuida tu piel del sol con nuestras fórmulas naturales de amplio espectro.',
      icon: <Sun size={32} />,
      productCount: 6,
      image: '☀️',
      color: 'from-orange-400 to-orange-600',
      benefits: ['SPF 50+', 'No comedogénico', 'Resistente al agua'],
    },
    {
      id: 4,
      name: 'Cuidado Natural',
      description: 'Productos 100% naturales y veganos elaborados con ingredientes orgánicos certificados.',
      icon: <Leaf size={32} />,
      productCount: 15,
      image: '🌿',
      color: 'from-green-400 to-green-600',
      benefits: ['100% natural', 'Vegano', 'Cruelty-free'],
    },
    {
      id: 5,
      name: 'Cuidado Nocturno',
      description: 'Tratamientos intensivos diseñados para regenerar tu piel mientras descansás.',
      icon: <Moon size={32} />,
      productCount: 7,
      image: '🌙',
      color: 'from-indigo-400 to-indigo-600',
      benefits: ['Regeneración', 'Reparación', 'Tratamiento intensivo'],
    },
    {
      id: 6,
      name: 'Piel Sensible',
      description: 'Fórmulas suaves especialmente desarrolladas para pieles delicadas y reactivas.',
      icon: <Heart size={32} />,
      productCount: 9,
      image: '💗',
      color: 'from-pink-400 to-pink-600',
      benefits: ['Hipoalergénico', 'Sin fragancias', 'Dermatológicamente testeado'],
    },
    {
      id: 7,
      name: 'Limpieza Facial',
      description: 'Productos para limpiar profundamente sin resecar, eliminando impurezas y maquillaje.',
      icon: <Sparkles size={32} />,
      productCount: 10,
      image: '✨',
      color: 'from-teal-400 to-teal-600',
      benefits: ['Limpieza profunda', 'Remueve maquillaje', 'Equilibra pH'],
    },
    {
      id: 8,
      name: 'Cuidado de Labios',
      description: 'Bálsamos y tratamientos nutritivos para mantener tus labios suaves e hidratados.',
      icon: <Heart size={32} />,
      productCount: 5,
      image: '💋',
      color: 'from-red-400 to-red-600',
      benefits: ['Nutrición intensa', 'Protección UV', 'Larga duración'],
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className={`bg-gradient-to-br ${category.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-8xl opacity-20 -mr-4 -mt-4">
                  {category.image}
                </div>
                <div className="relative z-10">
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-light mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.productCount} productos</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {category.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className=" cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all font-medium group-hover:gap-3">
                  Explorar productos
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