/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useNews.ts
import { create } from "zustand";
import { newsService } from "../services/news";
import { NewsArticle } from "../types/news";
import { useAuth } from "./useAuth";

type NewsFilters = {
  search: string;
  source: string;
  dateFrom: Date | null;
  dateTo: Date | null;
};

type NewsStore = {
  articles: NewsArticle[];
  filteredArticles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  filters: NewsFilters;
  setFilters: (filters: Partial<NewsFilters>) => void;
  fetchArticles: () => Promise<void>;
};

const defaultFilters: NewsFilters = {
  search: "",
  source: "",
  dateFrom: null,
  dateTo: null,
};

const filterArticles = (articles: NewsArticle[], filters: NewsFilters): NewsArticle[] => {
  return articles.filter((article) => {
    // Search filter
    if (filters.search && !article.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Source filter
    if (filters.source && article.source !== filters.source) {
      return false;
    }

    // Date filters
    if (filters.dateFrom && article.date_published) {
      const articleDate = new Date(article.date_published);
      if (articleDate < filters.dateFrom) return false;
    }

    if (filters.dateTo && article.date_published) {
      const articleDate = new Date(article.date_published);
      if (articleDate > filters.dateTo) return false;
    }

    return true;
  });
};

export const useNews = create<NewsStore>((set, get) => ({
  articles: [],
  filteredArticles: [],
  isLoading: false,
  error: null,
  filters: defaultFilters,

  setFilters: (newFilters) => {
    const currentState = get();
    const updatedFilters = { ...currentState.filters, ...newFilters };
    const filteredArticles = filterArticles(currentState.articles, updatedFilters);
    set({ filters: updatedFilters, filteredArticles });
  },

  fetchArticles: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await newsService.getArticles();
      console.log("response.data.opennews_articles",response.data.opennews_articles)
      const articles = response.data.nytimes_articles;
      articles.push(...response.data.opennews_articles,...response.data.guardian_articles)
      const filteredArticles = filterArticles(articles, get().filters);

      set({
        articles,
        filteredArticles,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch articles",
        isLoading: false,
      });

      if (error.code === 401) {
        useAuth.getState().logout();
      }
    }
  },
}));
