import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    // Determine base URL - use environment variable, or detect from window location, or fallback to RunPod URL
    let baseURL = process.env.NEXT_PUBLIC_APP_URL;
    
    if (!baseURL && typeof window !== 'undefined') {
      // Use current hostname and port (works for both localhost and IP access)
      baseURL = `${window.location.protocol}//${window.location.host}`;
    }
    
    if (!baseURL) {
      baseURL = 'https://aio83wt0ai4vge-8004.proxy.runpod.net';
    }
    
    this.client = axios.create({
      baseURL: baseURL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
    });

    // Attach token to requests
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Unified error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url?.toString() || "";

        // --------------------------------------------
        // 🚫 FIXED: Only redirect on REAL protected 401s
        // --------------------------------------------
        const isAuthCall =
          requestUrl.includes('/api/auth/login') ||
          requestUrl.includes('/api/auth/demo-credentials') ||
          requestUrl.includes('/api/auth/refresh');

        const isOnLoginPage =
          typeof window !== 'undefined' &&
          window.location.pathname.startsWith('/login');

        if (status === 401 && !isAuthCall && !isOnLoginPage) {
          // Unauthorized on a protected route → force re-login
          this.clearToken();

          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }

          return Promise.reject(error);
        }

        // --------------------------------------------
        // Logging
        // --------------------------------------------
        if (status) {
          if (status !== 401) {
            console.warn('API Error:', {
              status,
              statusText: error.response?.statusText,
              data: error.response?.data,
              url: requestUrl,
              method: error.config?.method,
            });
          }
        } else if (error.request) {
          console.error('API No Response:', {
            url: requestUrl,
            method: error.config?.method,
          });
        } else {
          console.error('API Setup Error:', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  // ---------------------------
  // Token helpers
  // ---------------------------
  private getToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem('authToken')
      : null;
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  public setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // ---------------------------
  // HTTP Helper Methods
  // ---------------------------
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async uploadFile<T>(
    url: string,
    file: File,
    additionalData?: Record<string, any>
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await this.client.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }
}

export const apiClient = new ApiClient();
