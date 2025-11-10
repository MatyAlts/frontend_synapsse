import Link from 'next/link';

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ payment_id?: string; status?: string; external_reference?: string }> 
}) {
  const params = await searchParams;
  return (
    <div className=" bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
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
            ID de pago: <span className="font-mono font-medium">{params.payment_id}</span>
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