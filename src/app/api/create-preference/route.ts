// En /api/create-preference/route.ts (CÓDIGO FINAL)

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});
const preference = new Preference(client);

export async function POST(request: Request) {
  try {
    const { items, shippingInfo } = await request.json();

    console.log('Received items:', JSON.stringify(items, null, 2));

    const preferenceItems = items.map((item: any) => {
      const mappedItem = {
        title: item.product?.title || item.product?.name || item.title || item.name || 'Producto',
        quantity: item.quantity,
        unit_price: parseFloat(item.product?.price || item.price || 0),
        currency_id: 'ARS',
      };
      console.log('Mapped item:', mappedItem);
      return mappedItem;
    });

    // Obtener la URL base de la aplicación
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const preferenceData = {
      items: preferenceItems,
      payer: {
        name: shippingInfo.firstName,
        surname: shippingInfo.lastName,
        email: shippingInfo.email,
      },
      back_urls: {
        success: `${appUrl}/checkout/success`,
        failure: `${appUrl}/checkout/failure`,
        pending: `${appUrl}/checkout/pending`,
      },
      // auto_return deshabilitado porque tu cuenta de MercadoPago no lo tiene habilitado
      // El usuario verá un botón "Volver al sitio" después del pago
    };

    console.log('Preference data:', JSON.stringify(preferenceData, null, 2));

    const result = await preference.create({
      body: preferenceData,
    });

    console.log('Preference created successfully:', result.id);
    return NextResponse.json({ id: result.id });

  } catch (error: any) {
    console.error('Error creating preference:', error);
    return NextResponse.json({ 
      error: 'Failed to create payment preference',
      details: error.message 
    }, { status: 500 });
  }
}