// src/hooks/useAuth.ts
import { create } from "zustand";
import { authService } from "../services/auth";
import { storage } from "../lib/utils";
import { User, LoginCredentials, SignupCredentials, ApiError } from "../types/auth";

type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: storage.getUser(),
  token: storage.getToken(),
  isLoading: true,
  error: null,
  isAuthenticated: !!storage.getToken(),

  initialize: () => {
    const token = storage.getToken();
    const user = storage.getUser();
    set({
      user,
      token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  },

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.login(credentials);
      const { token, ...user } = response.data;

      storage.setToken(token);
      storage.setUser(user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.message || "Login failed",
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  signup: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.signup(credentials);
      const { token, ...user } = response.data;

      storage.setToken(token);
      storage.setUser(user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.message || "Signup failed",
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  logout: async () => {
    storage.clear();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },
}));
