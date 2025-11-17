import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { authService } from './authService';

export interface Category {
  id: number;
  name: string;
  description: string;
  iconName: string;
  gradientColors: string;
  imageEmoji: string;
  productCount: number;
}

export interface CategoryRequest {
  name: string;
  description: string;
  iconName: string;
  gradientColors: string;
  imageEmoji: string;
}

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    return apiGet<Category[]>('/api/categories');
  },

  async getCategoryById(id: number): Promise<Category> {
    return apiGet<Category>(`/api/categories/${id}`);
  },

  async createCategory(data: CategoryRequest): Promise<Category> {
    const token = authService.getToken();
    if (!token) throw new Error('No autorizado');
    return apiPost<Category>('/api/admin/categories', data, token);
  },

  async updateCategory(id: number, data: CategoryRequest): Promise<Category> {
    const token = authService.getToken();
    if (!token) throw new Error('No autorizado');
    return apiPut<Category>(`/api/admin/categories/${id}`, data, token);
  },

  async deleteCategory(id: number): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('No autorizado');
    return apiDelete<void>(`/api/admin/categories/${id}`, token);
  }
};
