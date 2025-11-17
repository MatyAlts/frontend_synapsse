"use client";

import { useState, useEffect } from "react";
import { CategoryRequest } from "@/services/categoryService";
import { X } from "lucide-react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: { id: number; name: string; description: string; iconName: string; gradientColors: string; imageEmoji: string } | null;
}

// Opciones predefinidas para facilitar la creación
const ICON_OPTIONS = [
  "Droplets", "Sun", "Leaf", "Heart", "Moon", "Sparkles", "Tag", "Star", "Zap", "Cloud"
];

const GRADIENT_OPTIONS = [
  { name: "Azul", value: "from-blue-400 to-blue-600" },
  { name: "Verde", value: "from-green-400 to-green-600" },
  { name: "Púrpura", value: "from-purple-400 to-purple-600" },
  { name: "Naranja", value: "from-orange-400 to-orange-600" },
  { name: "Rosa", value: "from-pink-400 to-pink-600" },
  { name: "Turquesa", value: "from-teal-400 to-teal-600" },
  { name: "Rojo", value: "from-red-400 to-red-600" },
  { name: "Índigo", value: "from-indigo-400 to-indigo-600" },
  { name: "Amarillo", value: "from-yellow-400 to-yellow-600" },
  { name: "Gris", value: "from-gray-400 to-gray-600" },
];

export default function CategoryModal({ isOpen, onClose, onSuccess, category }: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<CategoryRequest>({
    name: "",
    description: "",
    iconName: "Tag",
    gradientColors: "from-green-400 to-green-600",
    imageEmoji: "🏷️"
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        iconName: category.iconName,
        gradientColors: category.gradientColors,
        imageEmoji: category.imageEmoji
      });
    } else {
      setFormData({
        name: "",
        description: "",
        iconName: "Tag",
        gradientColors: "from-green-400 to-green-600",
        imageEmoji: "🏷️"
      });
    }
    setError("");
  }, [category, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { categoryService } = await import("@/services/categoryService");
      if (category) {
        await categoryService.updateCategory(category.id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <h2 className="text-lg md:text-2xl font-semibold text-[#2f3031]">
            {category ? "Editar Categoría" : "Nueva Categoría"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-3 md:space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Nombre de la Categoría *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: Hidratación Profunda"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Descripción detallada de la categoría"
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Emoji *
            </label>
            <input
              type="text"
              name="imageEmoji"
              value={formData.imageEmoji}
              onChange={handleChange}
              required
              maxLength={2}
              className="w-full px-3 md:px-4 py-2 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="💧"
            />
            <p className="text-xs text-gray-500 mt-1">
              Usa un emoji representativo (💧, ☀️, 🌿, etc.)
            </p>
          </div>

          {/* Icono */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Icono (Lucide)
            </label>
            <select
              name="iconName"
              value={formData.iconName}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {ICON_OPTIONS.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          {/* Gradiente */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Color de Gradiente
            </label>
            <select
              name="gradientColors"
              value={formData.gradientColors}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {GRADIENT_OPTIONS.map(gradient => (
                <option key={gradient.value} value={gradient.value}>
                  {gradient.name}
                </option>
              ))}
            </select>
            {/* Vista previa del gradiente */}
            <div className={`mt-2 h-16 rounded-lg bg-gradient-to-br ${formData.gradientColors} flex items-center justify-center text-white text-3xl`}>
              {formData.imageEmoji}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-2 md:gap-3 pt-3 md:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : (category ? "Actualizar" : "Crear")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
