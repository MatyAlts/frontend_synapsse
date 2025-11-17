"use client"
import { ChevronRight, Gift, Check, X, Loader2 } from "lucide-react";
import { useState } from "react";

type StatusType = 'idle' | 'loading' | 'success' | 'error';

export default function Cupon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<StatusType>('idle');
  const [message, setMessage] = useState("");
  
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setStatus('loading');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/coupons/request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        console.log("Respuesta del cupón:", data);
        
        if (response.ok) {
          setStatus('success');
          setMessage(data.message || "¡Cupón enviado a tu correo!");
          setEmail("");
          // No auto-ocultar el mensaje de éxito, se queda visible
        } else {
          setStatus('error');
          setMessage(data.message || "Error al procesar el cupón");
          setTimeout(() => setStatus('idle'), 5000);
        }
      } catch (error) {
        console.error("Error al solicitar cupón:", error);
        setStatus('error');
        setMessage("Error de conexión. Intenta nuevamente.");
        setTimeout(() => setStatus('idle'), 5000);
      }
    }
  };
  return (
    <section className="py-5 md:py-10 px-4 relative overflow-hidden bg-white">

      <div className="max-w-4xl mx-auto relative">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img
                src="/grupoproductos3.png"
                alt="Productos Synapsse"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent"></div>
            </div>

            <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-lime-400 rounded-full mb-4 md:mb-6">
                <Gift className="w-6 h-6 md:w-8 md:h-8 text-[#2f3031]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-light mb-3">
                ¿Lista para sentir{" "}
                <span className="italic font-serif text-green-600">
                  la diferencia?
                </span>
              </h3>

              <p className="text-sm md:text-base text-[#535657] mb-4 md:mb-6">
                Regístrate y recibe un <strong>10% OFF</strong> en tu primera
                compra
              </p>

              <form onSubmit={handleCouponSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-2 md:py-3 text-sm md:text-base rounded-full border-2 border-gray-200 focus:border-green-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={status === 'loading'}
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full font-light bg-gradient-to-r from-green-600 to-green-500 text-white py-3 md:py-4 text-sm md:text-base rounded-full hover:from-green-700 hover:to-green-600 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <span>Obtener mi Cupón</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Mensaje de éxito */}
              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg text-center animate-slideUp flex items-center justify-center gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>{message}</span>
                </div>
              )}

              {/* Mensaje de error */}
              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center animate-slideUp flex items-center justify-center gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <span>{message}</span>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                *Cupón válido solo en tu primera compra. No aplica con otras
                promociones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
