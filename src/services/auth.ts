import { apiService } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants';
import { storage } from '../utils';

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken?: string;
  };
}

class AuthService {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.success) {
      const { user, token, refreshToken } = response.data;
      
      storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      storage.set(STORAGE_KEYS.USER_DATA, user);

      return response.data;
    }

    throw new Error(response.message || 'Login failed');
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { confirmPassword, ...registerData } = userData;
    
    const response = await apiService.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      registerData
    );

    if (response.success) {
      const { user, token, refreshToken } = response.data;
      
      storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      storage.set(STORAGE_KEYS.USER_DATA, user);

      return response.data;
    }

    throw new Error(response.message || 'Registration failed');
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      storage.remove(STORAGE_KEYS.USER_DATA);
    }
  }

  async forgotPassword(data: ForgotPasswordForm): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  }

  async resetPassword(data: ResetPasswordForm): Promise<void> {
    const { confirmPassword, ...resetData } = data;
    
    const response = await apiService.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      resetData
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to reset password');
    }
  }

  getCurrentUser(): User | null {
    return storage.get<User>(STORAGE_KEYS.USER_DATA);
  }

  getToken(): string | null {
    return storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }
}

export const authService = new AuthService();
