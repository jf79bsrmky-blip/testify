'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { User, LoginCredentials, AuthResponse } from '@/types';
import { apiClient } from './api-client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------
  // Restore session from localStorage on first load
  // -------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('authToken');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        apiClient.setToken(storedToken);
      }
    } catch (err) {
      console.error('Error restoring session:', err);
    }

    setLoading(false);
  }, []);

  // -------------------------------------------------
  // LOGIN FUNCTION — clean, predictable, safe
  // -------------------------------------------------
  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        '/api/auth/login',
        credentials
      );

      if (response.success && response.user && response.token) {
        // Store user + token
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('authToken', response.token);

        setUser(response.user);
        apiClient.setToken(response.token);

        return response;
      }

      // Login failed (wrong password, missing fields, etc.)
      // Do NOT clear form or redirect — just return failure
      return {
        success: false,
        message: response.message || 'Invalid credentials.',
        error: response.error || 'login_failed',
      };
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Login failed. Please try again.';

      return {
        success: false,
        message: msg,
        error: 'login_failed',
      };
    }
  };

  // -------------------------------------------------
  // LOGOUT FUNCTION — always safe & clean
  // -------------------------------------------------
  const logout = async (): Promise<void> => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch {
      console.warn('Logout failed (frontend cleanup will continue).');
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }

    apiClient.setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// -------------------------------------------------
// Hook for consuming auth context
// -------------------------------------------------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
