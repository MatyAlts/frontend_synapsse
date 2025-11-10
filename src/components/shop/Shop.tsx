"use client";

import { useState } from "react";
import Footer from "../footer/Footer";
import CTA from "./CTA";
import ProductsSection from "./ProductsSection";
import ChatWidget from "../chat/ChatWidget";
import SearchBar from "./SearchBar";
import HeaderSection from "./HeaderSection";
import { Product } from "@/services/productService";

export default function Shop(){
    const [searchResults, setSearchResults] = useState<Product[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchResults = (results: Product[]) => {
        setSearchResults(results);
        setIsSearching(false);
    };

    const handleSearchStart = () => {
        setIsSearching(true);
    };

    const handleClearSearch = () => {
        setSearchResults(null);
        setIsSearching(false);
    };

    return(
        <div>
            <HeaderSection />
            <SearchBar 
                onSearchResults={handleSearchResults}
                onSearchStart={handleSearchStart}
                onClearSearch={handleClearSearch}
            />
            {searchResults !== null && (
                <div className="text-center py-4">
                    <button
                        onClick={handleClearSearch}
                        className="text-[#768386] hover:text-green-600 text-sm underline transition-colors"
                    >
                        Limpiar búsqueda y ver todos los productos
                    </button>
                </div>
            )}
            <ProductsSection 
                searchResults={searchResults}
                isSearching={isSearching}
            />
            <Footer />
            {/* Asistente virtual flotante */}
            <ChatWidget />
        </div>
    )
}