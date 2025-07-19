export interface NYTArticle {
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  abstract: string;
  headline: {
    main: string;
    kicker?: string;
    content_kicker?: string;
  };
  pub_date: string;
  section_name: string;
  subsection_name?: string;
  byline: {
    original: string;
    person?: Array<{
      firstname: string;
      lastname: string;
      organization: string;
    }>;
  };
  multimedia?: Array<{
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }>;
}

export interface NYTSearchResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTArticle[];
    metadata: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface SearchFilters {
  query: string;
  section?: string;
  sortBy: 'newest' | 'oldest' | 'relevance';
  beginDate?: string;
  endDate?: string;
  page: number;
}