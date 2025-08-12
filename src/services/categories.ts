import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
  timestamp: string;
}

export interface CategoryFilters {
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

class CategoryService {
  // Get all categories
  async getCategories(filters: CategoryFilters = {}): Promise<CategoryResponse> {
    const params = new URLSearchParams();
    
    if (filters.isActive !== undefined) {
      params.append('isActive', filters.isActive.toString());
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.page) {
      params.append('page', filters.page.toString());
    }
    if (filters.limit) {
      params.append('limit', filters.limit.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `${API_ENDPOINTS.CATEGORIES.LIST}?${queryString}` : API_ENDPOINTS.CATEGORIES.LIST;
    
    return await apiService.get<CategoryResponse>(url);
  }

  // Get single category
  async getCategory(id: string): Promise<{ success: boolean; data: Category; message: string }> {
    return await apiService.get<{ success: boolean; data: Category; message: string }>(
      `${API_ENDPOINTS.CATEGORIES.LIST}/${id}`
    );
  }

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<{ success: boolean; data: Category; message: string }> {
    return await apiService.get<{ success: boolean; data: Category; message: string }>(
      `${API_ENDPOINTS.CATEGORIES.LIST}/slug/${slug}`
    );
  }

  // Create category (Admin only)
  async createCategory(categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Category; message: string }> {
    return await apiService.post<{ success: boolean; data: Category; message: string }>(
      API_ENDPOINTS.CATEGORIES.CREATE,
      categoryData
    );
  }

  // Update category (Admin only)
  async updateCategory(id: string, categoryData: Partial<Category>): Promise<{ success: boolean; data: Category; message: string }> {
    return await apiService.put<{ success: boolean; data: Category; message: string }>(
      `${API_ENDPOINTS.CATEGORIES.UPDATE}/${id}`,
      categoryData
    );
  }

  // Delete category (Admin only)
  async deleteCategory(id: string): Promise<{ success: boolean; message: string }> {
    return await apiService.delete<{ success: boolean; message: string }>(
      `${API_ENDPOINTS.CATEGORIES.DELETE}/${id}`
    );
  }

  // Get categories with product count
  async getCategoriesWithProductCount(): Promise<CategoryResponse> {
    return await apiService.get<CategoryResponse>(
      `${API_ENDPOINTS.CATEGORIES.LIST}?includeProductCount=true`
    );
  }
}

export const categoryService = new CategoryService();
