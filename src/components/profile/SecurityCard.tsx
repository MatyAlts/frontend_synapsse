"use client";
import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { userService } from "@/services/userService";

interface SecurityCardProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

export default function SecurityCard({ onSuccess, onError }: SecurityCardProps){
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [localMessage, setLocalMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setLocalMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            const message = "Las contraseñas nuevas no coinciden.";
            setLocalMessage({ type: "error", text: message });
            onError(message);
            return;
        }
        if (form.newPassword.length < 8) {
            const message = "La nueva contraseña debe tener al menos 8 caracteres.";
            setLocalMessage({ type: "error", text: message });
            onError(message);
            return;
        }
        setLoading(true);
        try {
            await userService.changePassword(form);
            const successMessage = "Tu contraseña fue actualizada.";
            setLocalMessage({ type: "success", text: successMessage });
            onSuccess(successMessage);
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            const message = error instanceof Error ? error.message : "No pudimos actualizar tu contraseña.";
            setLocalMessage({ type: "error", text: message });
            onError(message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-sm border border-green-100 p-6 sm:p-8">
          <h3 className="text-xl font-light text-gray-800 mb-6 flex items-center gap-2">
            <Lock size={20} />
            Seguridad
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña actual</label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white bg-opacity-60 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white bg-opacity-60 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white bg-opacity-60 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {localMessage && (
              <p className={`text-sm ${localMessage.type === "success" ? "text-green-700" : "text-red-600"}`}>
                {localMessage.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer px-8 py-3 text-white bg-green-600 rounded-full hover:scale-105 transition-all duration-300 font-medium shadow-lg shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? "Actualizando" : "Cambiar contraseña"}
            </button>
          </form>
        </div>
    )
}
