"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productService, Product, PagedResponse } from "@/services/productService";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ProductsSectionProps {
    searchResults?: Product[] | null;
    isSearching?: boolean;
}

export default function ProductsSection({ searchResults, isSearching }: ProductsSectionProps){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        loadProducts(currentPage);
    }, [currentPage]);

    const loadProducts = async (page: number) => {
        try {
            setLoading(true);
            setError("");
            console.log('Fetching products from:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080');
            const data: PagedResponse<Product> = await productService.getAllProducts(page, pageSize);
            console.log('Products received:', data);
            setProducts(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (err: any) {
            console.error("Error loading products:", err);
            const errorMsg = err.message || "Error al cargar productos";
            setError(`${errorMsg}. Backend: ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/products`);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Determinar qué productos mostrar
    const displayProducts = searchResults !== null && searchResults !== undefined ? searchResults : products;
    const isLoading = isSearching || loading;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-[#535657] text-lg">{isSearching ? 'Buscando productos...' : 'Cargando productos...'}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (displayProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="text-[#535657] text-lg">
                    {searchResults !== null && searchResults !== undefined 
                        ? 'No se encontraron productos con esa búsqueda' 
                        : 'No hay productos disponibles'}
                </div>
                {searchResults !== null && searchResults !== undefined && (
                    <p className="text-[#768386] text-sm">Intenta con otros términos de búsqueda</p>
                )}
            </div>
        );
    }

    // Generar números de página
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === i
                            ? 'bg-[#535657] text-white'
                            : 'bg-white text-[#535657] hover:bg-gray-100'
                    }`}
                >
                    {i + 1}
                </button>
            );
        }
        return pages;
    };

    return(
        <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 relative bg-white z-10 gap-4 md:gap-6 lg:gap-10 py-4 px-4 md:px-10 items-end justify-center">
                {displayProducts.map((p)=>(
                    <ProductCard 
                        id={p.id.toString()}
                        key={p.id}
                        title={p.name}
                        description={p.description}
                        price={p.price.toString()}
                        img={p.imageUrl || "/producto1.png"}
                    />
                ))}
            </div>
            
            {/* Paginación - solo mostrar si no hay búsqueda activa */}
            {searchResults === null || searchResults === undefined ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 py-6 md:py-8 bg-white">
                    <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                        className={`p-2 rounded-lg transition-all ${
                            currentPage === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-[#535657] hover:bg-gray-100'
                        }`}
                    >
                        <FiChevronLeft size={20} />
                    </button>

                    <div className="hidden md:flex gap-2">
                        {renderPageNumbers()}
                    </div>
                    
                    {/* Número de página actual en mobile */}
                    <div className="md:hidden text-[#535657] text-sm">
                        Página {currentPage + 1} de {totalPages}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages - 1}
                        className={`p-2 rounded-lg transition-all ${
                            currentPage === totalPages - 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-[#535657] hover:bg-gray-100'
                        }`}
                    >
                        <FiChevronRight size={20} />
                    </button>
                    </div>

                    <span className="text-[#768386] text-xs md:text-sm">
                        Mostrando {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, totalElements)} de {totalElements} productos
                    </span>
                </div>
            ) : null}
        </div>
    )
}