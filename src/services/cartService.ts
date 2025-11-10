import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { authService } from './authService';

export interface CartItemResponse {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export interface CartResponse {
  id: number;
  items: CartItemResponse[];
}

export interface CartItemRequest {
  productId: number;
  quantity: number;
}

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const token = authService.getToken();
    if (!token) throw new Error('No autenticado');
    return apiGet<CartResponse>('/api/cart', token);
  },

  async addItem(productId: number, quantity: number): Promise<CartResponse> {
    const token = authService.getToken();
    if (!token) throw new Error('No autenticado');
    return apiPost<CartResponse>('/api/cart/items', { productId, quantity }, token);
  },

  async updateItem(itemId: number, quantity: number): Promise<CartResponse> {
    const token = authService.getToken();
    if (!token) throw new Error('No autenticado');
    return apiPut<CartResponse>(`/api/cart/items/${itemId}?quantity=${quantity}`, {}, token);
  },

  async removeItem(itemId: number): Promise<CartResponse> {
    const token = authService.getToken();
    if (!token) throw new Error('No autenticado');
    return apiDelete<CartResponse>(`/api/cart/items/${itemId}`, token);
  },

  async clearCart(): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('No autenticado');
    return apiDelete<void>('/api/cart', token);
  }
};
