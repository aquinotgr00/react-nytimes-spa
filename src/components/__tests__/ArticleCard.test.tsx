import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleCard } from '../ArticleCard';
import type { NYTArticle } from '../../types/article';

const mockArticle: NYTArticle = {
  web_url: 'https://example.com/article',
  snippet: 'This is a test article snippet',
  lead_paragraph: 'This is the lead paragraph',
  abstract: 'Article abstract',
  headline: {
    main: 'Test Article Headline'
  },
  pub_date: '2024-01-15T10:00:00Z',
  section_name: 'Technology',
  byline: {
    original: 'By John Doe'
  },
  multimedia: [{
    url: '/images/test.jpg',
    format: 'thumbLarge',
    height: 150,
    width: 150,
    type: 'image',
    subtype: 'photo',
    caption: 'Test image',
    copyright: 'Test'
  }]
};

// Mock window.open
const mockOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true
});

describe('ArticleCard', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />);
    
    expect(screen.getByText('Test Article Headline')).toBeInTheDocument();
    expect(screen.getByText('This is a test article snippet')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('opens article URL when clicked', () => {
    render(<ArticleCard article={mockArticle} />);
    
    const card = screen.getByRole('img').closest('.ant-card');
    fireEvent.click(card!);
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://example.com/article',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('handles articles without images', () => {
    const articleWithoutImage = { ...mockArticle, multimedia: [] };
    render(<ArticleCard article={articleWithoutImage} />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('Test Article Headline')).toBeInTheDocument();
  });

  it('handles articles without byline', () => {
    const articleWithoutByline = { ...mockArticle, byline: { original: '' } };
    render(<ArticleCard article={articleWithoutByline} />);
    
    expect(screen.getByText('Test Article Headline')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});