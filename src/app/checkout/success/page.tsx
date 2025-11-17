'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const [couponMarked, setCouponMarked] = useState(false);
  
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    // Marcar cupón como usado si existe en sessionStorage
    const markCouponAsUsed = async () => {
      const appliedCoupon = sessionStorage.getItem('appliedCoupon');
      
      if (appliedCoupon && !couponMarked) {
        try {
          const couponCode = JSON.parse(appliedCoupon).code;
          console.log('🎫 Marcando cupón como usado:', couponCode);
          
          const response = await fetch(`http://localhost:8080/api/coupons/use/${couponCode}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            console.log('✅ Cupón marcado como usado exitosamente');
            sessionStorage.removeItem('appliedCoupon');
            setCouponMarked(true);
          } else {
            console.error('❌ Error al marcar cupón como usado');
          }
        } catch (error) {
          console.error('❌ Error al procesar cupón:', error);
        }
      }
    };

    markCouponAsUsed();
  }, [couponMarked]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-3xl font-light text-gray-800 mb-4">
          ¡Pago exitoso!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido confirmado. Recibirás un email con los detalles.
        </p>
        <div className="bg-green-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            ID de pago: <span className="font-mono font-medium">{paymentId || 'N/A'}</span>
          </p>
        </div>
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}