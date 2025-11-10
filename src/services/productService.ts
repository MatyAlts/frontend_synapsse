import { apiGet } from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[];
  stock: number;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page
  first: boolean;
  last: boolean;
}

export const productService = {
  async getAllProducts(page: number = 0, size: number = 10): Promise<PagedResponse<Product>> {
    return apiGet<PagedResponse<Product>>(`/api/products?page=${page}&size=${size}`);
  },

  async getProductById(id: number): Promise<Product> {
    return apiGet<Product>(`/api/products/${id}`);
  },

  async searchProducts(query: string, page: number = 0, size: number = 10): Promise<PagedResponse<Product>> {
    return apiGet<PagedResponse<Product>>(`/api/products/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`);
  }
};
