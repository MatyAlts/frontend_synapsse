import { apiGet, apiPost } from './api';

export interface CouponValidationResponse {
  code: string | null;
  email: string | null;
  message: string;
  isNew: boolean;
  expiresAt: string | null;
  discountPercentage: number;
}

export const couponService = {
  async validateCoupon(code: string): Promise<CouponValidationResponse> {
    try {
      const response = await apiGet<CouponValidationResponse>(`/api/coupons/validate/${code}`);
      return response;
    } catch (error: any) {
      console.error('Error validating coupon:', error);
      throw new Error(error.message || 'Error al validar el cupón');
    }
  },

  async markAsUsed(code: string): Promise<void> {
    try {
      await apiPost<{message: string}>(`/api/coupons/use/${code}`, {});
    } catch (error: any) {
      console.error('Error marking coupon as used:', error);
      throw new Error(error.message || 'Error al marcar cupón como usado');
    }
  },
};
