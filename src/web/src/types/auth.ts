// src/types/auth.ts
export type User = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  avatar: string | null;
};

export type ApiError = {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  code: number;
  message: string;
  data: User & {
    token: string;
  };
};
