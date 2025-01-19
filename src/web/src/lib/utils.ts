/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getFallbackImage(seed: string) {
  return `https://picsum.photos/seed/${seed}/800/400`;
}

export function getAvatarFallback(name: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
}

export const storage = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: any) => localStorage.setItem("user", JSON.stringify(user)),
  removeUser: () => localStorage.removeItem("user"),
  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
