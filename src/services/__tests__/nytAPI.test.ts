import { NYTAPIService } from '../nytAPI';
import type { SearchFilters } from '../../types/article';

// Mock fetch globally
global.fetch = vi.fn();

const mockSearchFilters: SearchFilters = {
  query: 'climate change',
  sortBy: 'newest',
  page: 0
};

const mockAPIResponse = {
  status: 'OK',
  copyright: 'Copyright (c) 2024 The New York Times Company.',
  response: {
    docs: [
      {
        web_url: 'https://example.com/article1',
        snippet: 'Test article snippet',
        headline: { main: 'Test Headline' },
        pub_date: '2024-01-15T10:00:00Z',
        section_name: 'Science',
        byline: { original: 'By Jane Smith' }
      }
    ],
    meta: {
      hits: 1,
      offset: 0,
      time: 123
    }
  }
};

describe('NYTAPIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchArticles', () => {
    it('constructs correct API URL with basic parameters', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponse
      });

      await NYTAPIService.searchArticles(mockSearchFilters);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.nytimes.com/svc/search/v2/articlesearch.json')
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=climate+change')
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('sort=newest')
      );
    });

    it('includes section filter when provided', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponse
      });

      const filtersWithSection = { ...mockSearchFilters, section: 'Technology' };
      await NYTAPIService.searchArticles(filtersWithSection);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('fq=section.name%3ATechnology')
      );
    });

    it('includes date filters when provided', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponse
      });

      const filtersWithDates = {
        ...mockSearchFilters,
        beginDate: '2024-01-01',
        endDate: '2024-01-31'
      };
      await NYTAPIService.searchArticles(filtersWithDates);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('begin_date=20240101')
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('end_date=20240131')
      );
    });

    it('throws error when API request fails', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400
      });

      await expect(NYTAPIService.searchArticles(mockSearchFilters))
        .rejects.toThrow('HTTP error! status: 400');
    });

    it('throws error when network request fails', async () => {
      (fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(NYTAPIService.searchArticles(mockSearchFilters))
        .rejects.toThrow('Network error');
    });
  });

  describe('getImageUrl', () => {
    it('returns null when no multimedia is available', () => {
      const article = { multimedia: [] };
      expect(NYTAPIService.getImageUrl(article)).toBeNull();
    });

    it('returns null when multimedia is undefined', () => {
      const article = {};
      expect(NYTAPIService.getImageUrl(article)).toBeNull();
    });

    it('returns URL for preferred image format', () => {
      const article = {
        multimedia: [
          { format: 'thumbLarge', url: 'images/thumb.jpg' },
          { format: 'large', url: 'images/large.jpg' }
        ]
      };
      
      expect(NYTAPIService.getImageUrl(article))
        .toBe('https://www.nytimes.com/images/thumb.jpg');
    });

    it('falls back to first available image when no preferred format exists', () => {
      const article = {
        multimedia: [
          { format: 'unknown', url: 'images/fallback.jpg' }
        ]
      };
      
      expect(NYTAPIService.getImageUrl(article))
        .toBe('https://www.nytimes.com/images/fallback.jpg');
    });
  });
});