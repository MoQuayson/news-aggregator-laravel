// src/pages/home/index.tsx
import { useEffect } from "react";
import { useNews } from "../../hooks/useNews";
import { NewsList } from "../../components/news/NewsList";
import { NewsFilters } from "../../components/news/NewsFilters";
import { useAuth } from "../../hooks/useAuth";

export function HomePage() {
  const { fetchArticles } = useNews();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated, fetchArticles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Latest News</h1>
            <p className="text-muted-foreground">Stay informed with the latest news from various sources</p>
          </div>
          <NewsFilters />
          <NewsList />
        </div>
      </div>
    </div>
  );
}
