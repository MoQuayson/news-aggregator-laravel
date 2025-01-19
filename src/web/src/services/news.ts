// src/services/news.ts
import {  NewsResponse } from "../types/news";
import { createApiClient } from "../config/api";
import { storage } from "../lib/utils";

export const newsService = {
  async getArticles(): Promise<NewsResponse> {
    const token = storage.getToken();
    if (!token) throw new Error("No auth token");

    const api = createApiClient(token);

    return api.get("/articles");
  },
};
