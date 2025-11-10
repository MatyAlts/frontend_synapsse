"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from "react-icons/fi";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState(initialFormState);
  const router = useRouter();

  useEffect(() => {
    setError("");
  }, [formData.email, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
      });

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

      window.dispatchEvent(new Event("user-logged-in"));
      router.push("/shop");
    } catch (err: any) {
      setError(err.message || "Error al registrarse. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/plant.png')] bg-cover bg-center px-4 py-10">
      <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-green-200/40 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-yellow-200/40 blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 p-6 sm:p-10"
      >
        <Link href="/">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer absolute top-4 left-4 p-2 rounded-full text-[#b9b5b5] hover:scale-110 transition-all duration-300"
          >
            <GoHome className="text-xl" />
          </motion.button>
        </Link>

        <div className="mt-6 sm:mt-0">
          <h1 className="text-3xl sm:text-4xl font-thin text-center text-[#535657] mb-2">
            Crear una Cuenta
          </h1>
          <p className="text-base text-center text-[#b9b5b5] mb-8">
            Completá tus datos para personalizar tu experiencia.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100/20 border border-red-400 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
              <FiUser className="text-[#b9b5b5] text-lg" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
              <FiUser className="text-[#b9b5b5] text-lg" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellido"
                className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
            <FiMail className="text-[#b9b5b5] text-lg" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
            <FiPhone className="text-[#b9b5b5] text-lg" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
            <FiMapPin className="text-[#b9b5b5] text-lg" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Dirección completa"
              className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
              <FiMapPin className="text-[#b9b5b5] text-lg" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ciudad"
                className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
              <FiMapPin className="text-[#b9b5b5] text-lg" />
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="Provincia"
                className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
              <FiMapPin className="text-[#b9b5b5] text-lg" />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Código postal"
                className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
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
            <div className="flex items-center gap-3 bg-white/25 px-4 py-3 rounded-xl border border-white/40 focus-within:border-green-400 transition">
              <FiLock className="text-[#b9b5b5] text-lg" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                className="w-full bg-transparent text-[#535657] placeholder-[#b9b5b5] focus:outline-none"
                required
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer text-white bg-[#535657] hover:scale-[1.02] transition-all duration-300 font-thin py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-[#535657]">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-[#b9b5b5] hover:underline transition duration-300">
            Iniciar sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
