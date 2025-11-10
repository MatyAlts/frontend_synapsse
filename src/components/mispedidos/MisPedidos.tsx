"use client";
import React, { useState } from 'react';
import { Package, ShoppingBag, CheckCircle, Truck, Clock, ChevronRight, Search, Filter } from 'lucide-react';
import { Order, OrderItem } from '@/redux/types';
import StatusCard from './StatusCard';



const MisPedidos: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const orders: Order[] = [
    {
      id: 'ORD-2024-001',
      date: '2024-10-15',
      status: 'delivered',
      total: 142,
      items: [
        { name: 'Bálsamo Labial Nutritivo', quantity: 2, price: 12, image: '🌿' },
        { name: 'Sérum de Ácido Hialurónico', quantity: 1, price: 28, image: '💧' },
        { name: 'Crema Restauradora', quantity: 1, price: 35, image: '✨' },
      ],
      trackingNumber: 'TR123456789AR',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-10-12',
      status: 'shipped',
      total: 95,
      items: [
        { name: 'Contorno de Ojos', quantity: 1, price: 25, image: '👁️' },
        { name: 'Crema Facial Natural', quantity: 2, price: 35, image: '🌸' },
      ],
      trackingNumber: 'TR987654321AR',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-10-08',
      status: 'processing',
      total: 78,
      items: [
        { name: 'Protector Solar SPF 50', quantity: 1, price: 38, image: '☀️' },
        { name: 'Sérum Vitamina C', quantity: 1, price: 40, image: '🍊' },
      ],
    },
    {
      id: 'ORD-2024-004',
      date: '2024-09-28',
      status: 'delivered',
      total: 156,
      items: [
        { name: 'Kit Hidratación Completo', quantity: 1, price: 120, image: '💦' },
        { name: 'Bálsamo Labial Nutritivo', quantity: 3, price: 12, image: '🌿' },
      ],
      trackingNumber: 'TR456789123AR',
    },
    {
      id: 'ORD-2024-005',
      date: '2024-09-15',
      status: 'delivered',
      total: 85,
      items: [
        { name: 'Mascarilla Facial Purificante', quantity: 2, price: 30, image: '🎭' },
        { name: 'Tónico Facial', quantity: 1, price: 25, image: '💚' },
      ],
      trackingNumber: 'TR789123456AR',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'processing': return <Clock size={16} />;
      default: return <Package size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Entregado';
      case 'shipped': return 'En camino';
      case 'processing': return 'Procesando';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    inProgress: orders.filter(o => o.status === 'shipped' || o.status === 'processing').length,
  };

  return (
    <div className="min-h-screen bg-[url('/plant2.png')] bg-cover bg-center">
    
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-light text-gray-800 mb-2">Mis Pedidos</h2>
          <p className="text-gray-500 text-xl font-light">Seguí el estado de tus compras.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard text="Pedidos totales" total={orderStats.total} icon='Package'/>
          <StatusCard text="En proceso" total={orderStats.inProgress} icon='Truck'/>
          <StatusCard text="Entregados" total={orderStats.delivered} icon='Check Circle'/>
        </div>

        {/* Filters */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-green-100 p-4 mb-6">
          <div className="flex items-center gap-3 overflow-x-auto">
            <Filter size={20} className="text-gray-500 flex-shrink-0" />
            <button
              onClick={() => setSelectedFilter('all')}
              className={` cursor-pointer px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFilter('delivered')}
              className={`cursor-pointer px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === 'delivered'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Entregados
            </button>
            <button
              onClick={() => setSelectedFilter('shipped')}
              className={`cursor-pointer px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === 'shipped'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              En camino
            </button>
            <button
              onClick={() => setSelectedFilter('processing')}
              className={`cursor-pointer px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === 'processing'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              En proceso
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm border border-green-100 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{order.items[0].image}</div>
                  <div>
                    <p className="font-medium text-gray-800 text-lg">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-xs text-gray-400 mt-1">
                        Seguimiento: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="border-t border-green-100 pt-4 mt-4">
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.image}</span>
                        <span className="text-gray-600">
                          {item.name} x{item.quantity}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-green-100">
                  <span className="text-xl text-gray-800">Total</span>
                  <span className="text-2xl font-thin text-green-700">
                    ${order.total}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <button className="cursor-pointer px-6 py-3 text-green-600 border-2 border-green-200 rounded-xl hover:bg-green-100 transition-all duration-300 font-thin flex items-center justify-center gap-2">
                  Ver detalles
                  <ChevronRight size={18} />
                </button>
                {order.status === 'delivered' && (
                  <button className="cursor-pointer px-6 py-3 bg-green-600 text-white rounded-full hover:scale-95 transition-all duration-300 font-thin">
                    Volver a comprar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-green-100 p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">No hay pedidos en esta categoría</p>
            <button 
              onClick={() => setSelectedFilter('all')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Ver todos los pedidos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisPedidos;