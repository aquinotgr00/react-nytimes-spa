import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../SearchForm';
import type { SearchFilters } from '../../types/article';

const mockFilters: SearchFilters = {
  query: '',
  sortBy: 'newest',
  page: 0
};

const mockProps = {
  filters: mockFilters,
  onFiltersChange: vi.fn(),
  onSearch: vi.fn(),
  loading: false
};

describe('SearchForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search form elements', () => {
    render(<SearchForm {...mockProps} />);
    
    expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Newest')).toBeInTheDocument();
  });

  it('calls onFiltersChange when query changes', () => {
    render(<SearchForm {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    expect(mockProps.onFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      query: 'test query',
      page: 0
    });
  });

  it('calls onSearch when search button is clicked', () => {
    const propsWithQuery = {
      ...mockProps,
      filters: { ...mockFilters, query: 'test' }
    };
    
    render(<SearchForm {...propsWithQuery} />);
    
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it('disables search button when query is empty', () => {
    render(<SearchForm {...mockProps} />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeDisabled();
  });

  it('shows loading state on search button', () => {
    const loadingProps = { ...mockProps, loading: true };
    render(<SearchForm {...loadingProps} />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toHaveClass('ant-btn-loading');
  });

  it('triggers search on Enter key press', () => {
    const propsWithQuery = {
      ...mockProps,
      filters: { ...mockFilters, query: 'test' }
    };
    
    render(<SearchForm {...propsWithQuery} />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    expect(mockProps.onSearch).toHaveBeenCalled();
  });
});