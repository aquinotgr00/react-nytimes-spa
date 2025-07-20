import { NYTSearchResponse, SearchFilters } from '../types/article';

const NYT_API_BASE_URL = 'https://api.nytimes.com/svc/search/v2';

const API_KEY = import.meta.env.VITE_NYT_API_KEY || '';

// Debug: Check if environment variable is loaded
console.log('API Key loaded:', import.meta.env.VITE_NYT_API_KEY ? 'Yes' : 'No');

export class NYTAPIService {
  private static formatDate(date: string): string {
    return date.replace(/-/g, '');
  }

  static async searchArticles(filters: SearchFilters): Promise<NYTSearchResponse> {
    const params = new URLSearchParams({
      'api-key': API_KEY,
      q: filters.query,
      page: filters.page.toString(),
      sort: filters.sortBy,
    });

    if (filters.section) {
      params.append('fq', `section.name:${filters.section}`);
    }

    if (filters.beginDate) {
      params.append('begin_date', this.formatDate(filters.beginDate));
    }

    if (filters.endDate) {
      params.append('end_date', this.formatDate(filters.endDate));
    }

    try {
      const response = await fetch(`${NYT_API_BASE_URL}/articlesearch.json?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  static getImageUrl(article: any): string | null {
    const multimedia = article.multimedia;
    if (!multimedia || !Array.isArray(multimedia) || multimedia.length === 0) return null;
    
    // Find the best image (preferably thumbLarge or superJumbo)
    const preferredFormats = ['thumbLarge', 'superJumbo', 'xlarge', 'large'];

    console.log(multimedia);
    
    for (const format of preferredFormats) {
      const image = multimedia.find((item: any) => item.format === format);
      if (image) {
        return `https://www.nytimes.com/${image.url}`;
      }
    }
    
    // Fallback to first available image
    return multimedia[0] ? `https://www.nytimes.com/${multimedia[0].url}` : null;
  }
}