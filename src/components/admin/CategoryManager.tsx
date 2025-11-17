"use client";

import { useState, useEffect } from "react";
import { categoryService, Category } from "@/services/categoryService";
import CategoryModal from "./CategoryModal";
import { Tag, Plus, Edit, Trash2 } from "lucide-react";

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      setDeleteConfirm(null);
    } catch (err: any) {
      alert(err.message || "Error al eliminar categoría");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center text-gray-500">Cargando categorías...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
        {/* Header - en mobile el botón va abajo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Tag className="text-green-600" size={24} />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Categorías</h2>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm md:text-base w-full md:w-auto"
          >
            <Plus size={18} />
            Nueva Categoría
          </button>
        </div>

        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay categorías creadas. Haz clic en "Nueva Categoría" para comenzar.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-br ${category.gradientColors} p-4 text-white`}>
                  <div className="text-3xl mb-2">{category.imageEmoji}</div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm opacity-90 mt-1">{category.productCount} productos</p>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Edit size={14} />
                      Editar
                    </button>
                    {deleteConfirm === category.id ? (
                      <>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="flex-1 px-3 py-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-3 py-2 text-xs bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(category.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        disabled={category.productCount > 0}
                        title={category.productCount > 0 ? "No se puede eliminar una categoría con productos" : "Eliminar"}
                      >
                        <Trash2 size={14} />
                        Eliminar
                      </button>
                    )}
                  </div>
                  {category.productCount > 0 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      No se puede eliminar (tiene productos asociados)
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadCategories}
        category={selectedCategory}
      />
    </>
  );
}
