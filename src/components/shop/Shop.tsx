"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../footer/Footer";
import CTA from "./CTA";
import ProductsSection from "./ProductsSection";
import ChatWidget from "../chat/ChatWidget";
import SearchBar from "./SearchBar";
import HeaderSection from "./HeaderSection";
import { Product } from "@/services/productService";

export default function Shop(){
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults] = useState<Product[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Inicializar la categoría desde la URL solo UNA vez
    useEffect(() => {
        if (!isInitialized) {
            const category = searchParams.get('category');
            console.log('Shop: Initializing with category:', category);
            setSelectedCategory(category);
            setIsInitialized(true);
        }
    }, [searchParams, isInitialized]);

    const handleSearchResults = (results: Product[]) => {
        setSearchResults(results);
        setIsSearching(false);
        setSelectedCategory(null); // Limpiar categoría al buscar
    };

    const handleSearchStart = () => {
        setIsSearching(true);
    };

    const handleClearSearch = () => {
        setSearchResults(null);
        setIsSearching(false);
    };

    const handleClearCategory = () => {
        console.log('Shop: Clearing category filter');
        setSelectedCategory(null);
        // Actualizar URL sin recargar la página
        window.history.replaceState({}, '', '/shop');
    };

    // No renderizar ProductsSection hasta que la categoría esté inicializada
    if (!isInitialized) {
        return (
            <div>
                <HeaderSection />
                <div className="flex items-center justify-center py-20">
                    <div className="text-[#535657] text-lg">
                        Cargando productos...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return(
        <div>
            <HeaderSection />
            <SearchBar 
                onSearchResults={handleSearchResults}
                onSearchStart={handleSearchStart}
                onClearSearch={handleClearSearch}
            />
            {(searchResults !== null || selectedCategory) && (
                <div className="text-center py-4 space-y-2">
                    {searchResults !== null && (
                        <button
                            onClick={handleClearSearch}
                            className="text-[#768386] hover:text-green-600 text-sm underline transition-colors"
                        >
                            Limpiar búsqueda y ver todos los productos
                        </button>
                    )}
                    {selectedCategory && (
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-[#535657] text-sm">
                                Filtrando por: <strong>{selectedCategory}</strong>
                            </span>
                            <button
                                onClick={handleClearCategory}
                                className="text-[#768386] hover:text-green-600 text-sm underline transition-colors"
                            >
                                Quitar filtro
                            </button>
                        </div>
                    )}
                </div>
            )}
            <ProductsSection 
                searchResults={searchResults}
                isSearching={isSearching}
                categoryFilter={selectedCategory}
            />
            <Footer />
            {/* Asistente virtual flotante */}
            <ChatWidget />
        </div>
    )
}