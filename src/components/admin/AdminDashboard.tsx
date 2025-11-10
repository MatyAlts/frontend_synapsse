"use client";

import { useState, useEffect } from "react";
import { productService, Product } from "@/services/productService";
import { adminProductService } from "@/services/adminProductService";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import ProductModal from "./ProductModal";
import { Edit, Trash2, Plus, Search, LogOut, Package } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si es admin
    const user = authService.getUser();
    const isAuth = authService.isAuthenticated();
    
    console.log('Admin check:', { 
      user, 
      isAuth, 
      isAdmin: user?.isAdmin,
      pathname: window.location.pathname 
    });
    
    if (!isAuth) {
      console.log('Not authenticated, redirecting to login');
      router.push('/login');
      return;
    }
    
    if (!user || !user.isAdmin) {
      console.log('Not admin, redirecting to shop');
      router.push('/shop');
      return;
    }
    
    console.log('Admin authorized, loading products...');
    setIsAuthorized(true);
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      console.log('Fetching products from backend...');
      // Solicitar muchos productos de una vez para el panel de admin (1000 productos)
      const pagedData = await productService.getAllProducts(0, 1000);
      console.log('Products received:', pagedData);
      // Extraer solo el contenido del array
      setProducts(pagedData.content);
    } catch (err: any) {
      console.error('Error loading products:', err);
      
      // Si es error de autenticación, redirigir al login
      if (err.status === 401 || err.status === 403) {
        console.log('Authentication error, redirecting to login');
        authService.logout();
        router.push('/login?expired=true');
        return;
      }
      
      const errorMessage = err.message || "Error al cargar productos";
      setError(`${errorMessage}. Verifica: 1) Backend corriendo en http://localhost:8080, 2) Base de datos conectada, 3) Consola del navegador (F12) para más detalles`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await adminProductService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (err: any) {
      alert(err.message || "Error al eliminar producto");
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthorized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-xl text-gray-600">
          {!isAuthorized ? 'Verificando autorización...' : 'Cargando...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex items-center gap-2 md:gap-3">
            <Package className="text-green-600" size={28} />
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">Panel de Administración</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
            <span className="text-xs md:text-sm text-gray-600 truncate max-w-[150px] md:max-w-none">
              {authService.getUser()?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm md:text-base whitespace-nowrap"
            >
              <LogOut size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
              <span className="sm:hidden">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg whitespace-nowrap w-full sm:w-auto text-sm md:text-base"
            >
              <Plus size={18} className="md:w-5 md:h-5" />
              Nuevo Producto
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
            <div className="bg-green-50 rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-green-600 font-medium">Total Productos</p>
              <p className="text-2xl md:text-3xl font-bold text-green-700">{products.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-blue-600 font-medium">En Stock</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-700">
                {products.filter(p => p.stock > 0).length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-orange-600 font-medium">Sin Stock</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-700">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Categorías
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No se encontraron productos
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.png';
                            }}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm md:text-base truncate">{product.name}</p>
                            <p className="text-xs md:text-sm text-gray-500 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-gray-900 font-medium text-sm md:text-base whitespace-nowrap">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <span
                          className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                            product.stock > 10
                              ? 'bg-green-100 text-green-700'
                              : product.stock > 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          <span className="hidden sm:inline">{product.stock} unidades</span>
                          <span className="sm:hidden">{product.stock}</span>
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {product.categories?.slice(0, 2).map((cat, idx) => (
                            <span
                              key={idx}
                              className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                            >
                              {cat}
                            </span>
                          ))}
                          {product.categories?.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{product.categories.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <div className="flex justify-end gap-1 md:gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Editar"
                          >
                            <Edit size={16} className="md:w-[18px] md:h-[18px]" />
                          </button>
                          {deleteConfirm === product.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="px-2 md:px-3 py-1 text-[10px] md:text-xs bg-red-600 text-white rounded hover:bg-red-700 whitespace-nowrap"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-2 md:px-3 py-1 text-[10px] md:text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400 whitespace-nowrap"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Eliminar"
                            >
                              <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadProducts}
        product={selectedProduct}
      />
    </div>
  );
}
