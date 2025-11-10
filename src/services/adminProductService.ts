import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { authService } from './authService';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[];
  stock: number;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[];
  stock: number;
}

export const adminProductService = {
  async createProduct(data: ProductRequest): Promise<Product> {
    const token = authService.getToken();
    if (!token) throw new Error('No autorizado');
    return apiPost<Product>('/api/admin/products', data, token);
  },

  async updateProduct(id: number, data: ProductRequest): Promise<Product> {
    const token = authService.getToken();
    if (!token) throw new Error('No autorizado');
    return apiPut<Product>(`/api/admin/products/${id}`, data, token);
  },

  async deleteProduct(id: number): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('No autorizado');
    return apiDelete<void>(`/api/admin/products/${id}`, token);
  }
};
