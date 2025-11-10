import Link from 'next/link';

export default async function Page({ searchParams }: { searchParams: Promise<{ payment_id?: string }> }) {
  await searchParams;
  return (
    <div className=" bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">❌</span>
        </div>
        <h1 className="text-3xl font-light text-gray-800 mb-4">
          Pago rechazado
        </h1>
        <p className="text-gray-600 mb-6">
          Hubo un problema con tu pago. Por favor, intenta nuevamente.
        </p>
        <Link 
          href="/checkout"
          className="inline-block px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
        >
          Intentar de nuevo
        </Link>
      </div>
    </div>
  );
}