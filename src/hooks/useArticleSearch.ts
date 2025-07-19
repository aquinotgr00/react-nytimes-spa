import { useState, useEffect, useCallback } from 'react';
import { NYTAPIService } from '../services/nytAPI';
import type { NYTArticle, SearchFilters } from '../types/article';

export const useArticleSearch = () => {
  const [articles, setArticles] = useState<NYTArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  // const hasFetched = useRef(false);

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'newest',
    page: 0,
  });

  function isAnyFilterSet(filters: SearchFilters) {
    return (
      filters.query.trim() ||
      filters.sortBy ||
      filters.section ||
      filters.beginDate ||
      filters.endDate
    );
  }

  const searchArticles = useCallback(async (searchFilters: SearchFilters) => {
    if (!isAnyFilterSet(searchFilters)) {
      setArticles([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);

    if (!navigator.onLine) {
      const cached = localStorage.getItem('cachedArticles');
      console.log(cached, 'cached')
      if (cached) {
        setArticles(JSON.parse(cached));
        setError('You are offline. Showing cached articles.');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await NYTAPIService.searchArticles(searchFilters);
      setArticles(response.response.docs);
      setTotalResults(response.response.metadata.hits);
      localStorage.setItem('cachedArticles', JSON.stringify(response.response.docs));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching articles');
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    searchArticles(filters);
  }, [filters, searchArticles]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    searchArticles(newFilters);
  }, [filters, searchArticles]);

  // Auto-search when query changes (with debounce effect)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAnyFilterSet(filters)) {
        searchArticles(filters);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters, searchArticles]);

  // add initial api hit on mount
  // useEffect(() => {
  //   if (!hasFetched.current) {
  //     searchArticles(filters);
  //     hasFetched.current = true;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return {
    articles,
    loading,
    error,
    totalResults,
    filters,
    handleSearch,
    handleFiltersChange,
    handlePageChange,
  };
};