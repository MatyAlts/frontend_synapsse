import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { CartItem, FormData } from '@/redux/types';

// Public Key de Producción
initMercadoPago('APP_USR-f4ab45ee-2675-4bef-93ce-c96b98aefdec', {
  locale: 'es-AR'
});

interface PaymentProps {
  items: CartItem[]; 
  shippingInfo: Omit<FormData, 'cardNumber' | 'cardName' | 'expiryDate' | 'cvv'>;
}

const Payment: React.FC<PaymentProps> = ({ items, shippingInfo }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createPreference = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, shippingInfo }),
        });

        if (!response.ok) {
          throw new Error('Falló la creación de la preferencia de pago.');
        }

        const { id } = await response.json();
        setPreferenceId(id);

      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createPreference();
  }, [items, shippingInfo]);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-600 animate-pulse">Generando link de pago seguro...</p>;
    }
    if (error) {
      return <p className="text-center text-red-600">{error}</p>;
    }
    if (preferenceId) {
      return (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Wallet 
              initialization={{ 
                preferenceId
              }}
              onReady={() => console.log('Wallet ready')}
              onError={(error) => console.error('Wallet error:', error)}
            />
          </div>
          <div className="text-center text-sm text-gray-600 mt-4 space-y-2">
            <p>💡 Serás redirigido a MercadoPago para completar tu pago de forma segura.</p>
            <p className="text-xs">Después del pago, usa el botón <strong>&quot;Volver al sitio&quot;</strong> para regresar.</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <h2 className="text-4xl font-light text-gray-800 mb-4 text-center">Finalizar Compra</h2>
      <p className="text-center text-xl text-gray-500 mb-8">
        Serás redirigido al sitio seguro de Mercado Pago para completar tu pago.
      </p>
      {renderContent()}
    </div>
  );
};

export default Payment;