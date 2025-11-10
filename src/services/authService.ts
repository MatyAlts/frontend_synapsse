import { apiPost } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export interface StoredUser {
  email: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiPost<AuthResponse>('/api/auth/login', credentials);
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiPost<AuthResponse>('/api/auth/register', { ...data, admin: false });
  },

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  removeToken() {
    localStorage.removeItem('authToken');
  },

  saveUser(user: StoredUser) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): StoredUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem('user');
  },

  logout() {
    this.removeToken();
    this.removeUser();
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};
