"use client";

import { useState, useEffect } from "react";
import { Product } from "@/services/productService";
import { ProductRequest, adminProductService } from "@/services/adminProductService";
import { X } from "lucide-react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSuccess, product }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<ProductRequest>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    categories: [],
    stock: 0
  });
  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        categories: product.categories || [],
        stock: product.stock
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        categories: [],
        stock: 0
      });
    }
    setError("");
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.categories.includes(categoryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()]
      }));
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (product) {
        await adminProductService.updateProduct(product.id, formData);
      } else {
        await adminProductService.createProduct(formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al guardar el producto");
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
            {product ? "Editar Producto" : "Nuevo Producto"}
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
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: Crema Restauradora"
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
              placeholder="Descripción detallada del producto"
            />
          </div>

          {/* Precio y Stock */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Precio ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* URL de Imagen */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              URL de Imagen *
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="/producto1.png"
            />
            {formData.imageUrl && (
              <div className="mt-2 flex justify-center">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-24 w-24 md:h-32 md:w-32 object-contain rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.png';
                  }}
                />
              </div>
            )}
          </div>

          {/* Categorías */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Categorías
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Agregar categoría"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 md:px-4 py-2 text-sm md:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition whitespace-nowrap"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="hover:text-green-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
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
              {loading ? "Guardando..." : (product ? "Actualizar" : "Crear")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
