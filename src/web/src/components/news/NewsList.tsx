// src/components/news/NewsList.tsx
import { useNews } from "../../hooks/useNews";
import { NewsCard } from "./NewsCard";
import { Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

export function NewsList() {
  const { filteredArticles: articles, isLoading, error, fetchArticles } = useNews();

  if (error) {
    return (
      <div className="flex h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => fetchArticles()} disabled={isLoading}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    );
  }

  if (isLoading && articles.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">No articles available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <NewsCard key={`${article.source}-${index}`} article={article} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
