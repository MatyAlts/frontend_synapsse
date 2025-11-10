import { apiGet, apiPost, apiPut } from './api';
import { authService } from './authService';
import { UserProfile } from '@/redux/types';

interface UserProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
}

export interface UpdateUserProfilePayload {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ensureToken(): string {
  const token = authService.getToken();
  if (!token) {
    throw new Error('No hay una sesión activa.');
  }
  return token;
}

function mapProfile(response: UserProfileResponse): UserProfile {
  return {
    email: response.email,
    firstName: response.firstName,
    lastName: response.lastName,
    phone: response.phone ?? '',
    address: response.address ?? '',
    city: response.city ?? '',
    province: response.province ?? '',
    zipCode: response.postalCode ?? '',
  };
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const token = ensureToken();
    const response = await apiGet<UserProfileResponse>('/api/users/me', token);
    return mapProfile(response);
  },

  async updateProfile(payload: UpdateUserProfilePayload): Promise<UserProfile> {
    const token = ensureToken();
    const response = await apiPut<UserProfileResponse>(
      '/api/users/me',
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
        province: payload.province,
        postalCode: payload.zipCode,
      },
      token
    );
    return mapProfile(response);
  },

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    const token = ensureToken();
    await apiPost<unknown>('/api/users/me/change-password', payload, token);
  },
};
