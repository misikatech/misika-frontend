import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

interface WishlistItem {
  id: number;
  productId: number;
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    inStock: boolean;
    rating?: number;
  };
  addedAt: string;
}

export const wishlistService = {
  async getWishlist(): Promise<WishlistItem[]> {
    const response = await apiService.get<WishlistItem[]>(API_ENDPOINTS.USER.WISHLIST);
    return response;
  },

  async addToWishlist(productId: number): Promise<WishlistItem> {
    const response = await apiService.post<WishlistItem>(API_ENDPOINTS.USER.WISHLIST, {
      productId,
    });
    return response;
  },

  async removeFromWishlist(productId: number): Promise<void> {
    await apiService.delete(`${API_ENDPOINTS.USER.WISHLIST}/${productId}`);
  },

  async clearWishlist(): Promise<void> {
    await apiService.delete(API_ENDPOINTS.USER.WISHLIST);
  },
};
