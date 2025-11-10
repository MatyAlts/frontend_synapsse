"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiUser, FiLock } from "react-icons/fi";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { authService } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCheckedExpired = useRef(false);

  useEffect(() => {
    // Verificar si el token expiró solo una vez
    if (!hasCheckedExpired.current && searchParams.get('expired') === 'true') {
      setError("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      hasCheckedExpired.current = true;
      
      // Limpiar el parámetro de la URL sin recargar la página
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login successful, response:', { 
        hasToken: !!response.token, 
        tokenLength: response.token?.length,
        email: response.email,
        isAdmin: response.isAdmin 
      });
      
      // Guardar token y usuario
      authService.saveToken(response.token);
      authService.saveUser({
        email: response.email,
        isAdmin: response.isAdmin,
        firstName: response.firstName,
        lastName: response.lastName,
        phone: response.phone ?? "",
        address: response.address ?? "",
        city: response.city ?? "",
        province: response.province ?? "",
        postalCode: response.postalCode ?? "",
      });
      
      // Verificar que se guardó correctamente
      const savedToken = authService.getToken();
      const savedUser = authService.getUser();
      console.log('Token and user saved, verification:', { 
        hasSavedToken: !!savedToken, 
        savedTokenLength: savedToken?.length,
        match: savedToken === response.token,
        savedUser: savedUser
      });
      
      // NO disparar evento de login para evitar que se intente cargar el carrito antes de redirigir
      // window.dispatchEvent(new Event('user-logged-in'));
      
      // Redirigir según el tipo de usuario SIN setTimeout
      console.log('Redirecting to:', response.isAdmin ? '/admin' : '/shop');
      if (response.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/shop');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || "Credenciales inválidas. Intenta nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-[url('/plant.png')] overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72  rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 ounded-full blur-3xl animate-pulse"></div>

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[380px] p-8 rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30"
      >
        <Link href="/" passHref>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer absolute top-0 left-0 p-2 mb-5 rounded-full text-[#b9b5b5] hover:scale-125 transition-all duration-300"
          >
            <GoHome className="text-xl" />
          </motion.button>
        </Link>
        <h1 className="text-3xl font-thin text-center text-[#535657] mb-2">
          Bienvenido
        </h1>
        <p className="text-md font-thin text-center text-[#b9b5b5] mb-8">¡Que bueno tenerte denuevo!</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100/20 border border-red-400 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Username */}
          <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl border border-white/30 focus-within:border-indigo-400 transition">
            <FiUser className="text-[#b9b5b5] text-lg" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl border border-white/30 focus-within:border-indigo-400 transition">
            <FiLock className="text-[#b9b5b5] text-lg" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="cursor-pointer text-white bg-[#535657] hover:scale-105 transition-all duration-300 font-thin py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-[#b9b5b5] hover:underline transition duration-300"
          >
            ¿Olvidaste tu Contraseña?
          </a>
        </div>

        <div className="mt-3 text-center text-sm text-[#535657] ">
          ¿No estas registrado?{" "}
          <Link href="/register" className="text-[#b9b5b5] hover:underline transition duration-300">
            Crear Cuenta
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

