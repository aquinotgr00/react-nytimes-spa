import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useArticleSearch } from '../useArticleSearch';
import { NYTAPIService } from '../../services/nytAPI';

// Mock the API service
vi.mock('../../services/nytAPI');

const mockAPIResponse = {
  status: 'OK',
  copyright: 'Test',
  response: {
    docs: [
      {
        web_url: 'https://example.com/article1',
        snippet: 'Test snippet',
        headline: { main: 'Test Article' },
        pub_date: '2024-01-15T10:00:00Z',
        section_name: 'Technology',
        byline: { original: 'By Test Author' }
      }
    ],
    metadata: {
      hits: 1,
      offset: 0,
      time: 100
    }
  }
};

describe('useArticleSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useArticleSearch());

    // expect(result.current.articles).toEqual([]);
    // expect(result.current.loading).toBe(false);
    // expect(result.current.totalResults).toBe(10);
    expect(result.current.error).toBeNull();
    expect(result.current.filters.query).toBe('');
    expect(result.current.filters.sortBy).toBe('newest');
    expect(result.current.filters.page).toBe(0);
  });

  it('performs search when handleSearch is called', async () => {
    (NYTAPIService.searchArticles as any).mockResolvedValue(mockAPIResponse);
    
    const { result } = renderHook(() => useArticleSearch());

    act(() => {
      result.current.handleFiltersChange({ 
        ...result.current.filters, 
        query: 'test query' 
      });
    });

    // Now call handleSearch
    await act(async () => {
      result.current.handleSearch();
    });


    expect(NYTAPIService.searchArticles).toHaveBeenCalledWith(
      expect.objectContaining({
        query: 'test query',
        sortBy: 'newest',
        page: 0
      })
    );
    expect(result.current.articles).toEqual(mockAPIResponse.response.docs);
    expect(result.current.totalResults).toBe(1);
  });

  it('handles API errors gracefully', async () => {
    const errorMessage = 'API Error';
    (NYTAPIService.searchArticles as any).mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useArticleSearch());

    act(() => {
      result.current.handleFiltersChange({ 
        ...result.current.filters, 
        query: 'test query' 
      });
    });

    await act(async () => {
      result.current.handleSearch();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.articles).toEqual([]);
    expect(result.current.totalResults).toBe(0);
  });

  it('updates filters correctly', () => {
    const { result } = renderHook(() => useArticleSearch());

    act(() => {
      result.current.handleFiltersChange({
        query: 'new query',
        section: 'Technology',
        sortBy: 'oldest',
        page: 2
      });
    });

    expect(result.current.filters.query).toBe('new query');
    expect(result.current.filters.section).toBe('Technology');
    expect(result.current.filters.sortBy).toBe('oldest');
    expect(result.current.filters.page).toBe(2);
  });

  it('performs auto-search with debounce when query changes', async () => {
    (NYTAPIService.searchArticles as any).mockResolvedValue(mockAPIResponse);
    
    const { result } = renderHook(() => useArticleSearch());

    act(() => {
      result.current.handleFiltersChange({ 
        ...result.current.filters, 
        query: 'test' 
      });
    });

    // Fast-forward time to trigger debounced search
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Wait for the async operation
    await act(async () => {
      await Promise.resolve();
    });

    expect(NYTAPIService.searchArticles).toHaveBeenCalledWith({
      query: 'test',
      sortBy: 'newest',
      page: 0
    });
  });

  // it('does not search when query is empty', async () => {
  //   const { result } = renderHook(() => useArticleSearch());

  //   await act(async () => {
  //     result.current.handleSearch();
  //   });

  //   expect(NYTAPIService.searchArticles).not.toHaveBeenCalled();
  //   expect(result.current.articles).toEqual([]);
  // });
});