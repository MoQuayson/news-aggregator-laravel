// src/components/news/NewsFilters.tsx
import { useState, useMemo } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNews } from "../../hooks/useNews";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

export function NewsFilters() {
  const { articles, filters, setFilters } = useNews();
  const [searchQuery, setSearchQuery] = useState(filters.search);

  const sources = useMemo(() => {
    const uniqueSources = new Set(articles.map((article) => article.source));
    return Array.from(uniqueSources);
  }, [articles]);

  const handleSearch = () => {
    setFilters({ search: searchQuery });
  };

  const handleSourceChange = (value: string) => {
    setFilters({ source: value === "all" ? "" : value });
  };

  const handleDateSelect = (date: Date | undefined, type: "from" | "to") => {
    setFilters({
      [type === "from" ? "dateFrom" : "dateTo"]: date || null,
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({
      search: "",
      source: "",
      dateFrom: null,
      dateTo: null,
    });
  };

  const hasActiveFilters = filters.search || filters.source || filters.dateFrom || filters.dateTo;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <Input placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={filters.source || "all"} onValueChange={handleSourceChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={filters.dateFrom || undefined} onSelect={(date) => handleDateSelect(date, "from")} initialFocus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateTo ? format(filters.dateTo, "PPP") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={filters.dateTo || undefined} onSelect={(date) => handleDateSelect(date, "to")} initialFocus />
            </PopoverContent>
          </Popover>

          {hasActiveFilters && (
            <Button variant="ghost" size="icon" onClick={clearFilters} className="ml-auto">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
