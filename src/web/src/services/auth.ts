// src/services/auth.ts
import { AuthResponse, LoginCredentials, SignupCredentials } from "../types/auth";
import { createApiClient } from "../config/api";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const api = createApiClient();
    return api.post("/auth/login", credentials);
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const api = createApiClient();
    return api.post("/auth/register", credentials);
  },
};
