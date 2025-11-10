import Link from 'next/link';

export default async function Page({ searchParams }: { searchParams: Promise<{ payment_id?: string }> }) {
  await searchParams;
  return (
    <div className=" bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⏳</span>
        </div>
        <h1 className="text-3xl font-light text-gray-800 mb-4">
          Pago pendiente
        </h1>
        <p className="text-gray-600 mb-6">
          Tu pago está siendo procesado. Te notificaremos cuando se confirme.
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}