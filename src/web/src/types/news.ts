// src/types/news.ts
export type NewsCategory = "technology" | "business" | "sports" | "entertainment" | "health" | "science" | "politics";

export type NewsArticle = {
  title: string;
  image: string | null;
  source: string;
  url: string;
  date_published?: string;
};

export type NewsResponse = {
  code: number;
  message: string;
  data: {
    nytimes_articles: NewsArticle[];
    opennews_articles: NewsArticle[];
    guardian_articles: NewsArticle[];
  };
};

export type ApiError = {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
};

export type ArticleRequest = {
  search: string;
  published_date:string | Date;
  source: NewSource | string | null;
  author: string ;
};

export enum NewSource {
  NY_TIMES = "NY_TIMES",
  OPEN_NEWS = "OPEN_NEWS",
  GUARDIAN = "GUARDIAN",
};
