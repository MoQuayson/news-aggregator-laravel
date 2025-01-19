// src/components/news/NewsCard.tsx
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { NewsArticle } from "../../types/news";
import { formatDate, getFallbackImage } from "../../lib/utils";
import { ExternalLink } from "lucide-react";

type NewsCardProps = {
  article: NewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 space-y-4">
        <div className="aspect-video overflow-hidden rounded-lg">
          <img
            src={article.image || getFallbackImage(article.title)}
            alt={article.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getFallbackImage(article.title);
            }}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2">{article.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{article.source}</span>
          {article.date_published && (
            <>
              <span>•</span>
              <time>{formatDate(article.date_published)}</time>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-sm font-medium text-primary hover:underline">
          <span>Read full article</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
