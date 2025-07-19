import React from 'react';
import { ConfigProvider } from 'antd';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ArticleGrid } from './components/ArticleGrid';
import { APIKeyNotice } from './components/APIKeyNotice';
import { useArticleSearch } from './hooks/useArticleSearch';

const theme = {
  token: {
    colorPrimary: '#2563eb',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

function App() {
  const {
    articles,
    loading,
    error,
    totalResults,
    filters,
    handleSearch,
    handleFiltersChange,
    handlePageChange,
  } = useArticleSearch();

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <APIKeyNotice />
          
          <SearchForm
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            loading={loading}
          />

          <ArticleGrid
            articles={articles}
            loading={loading}
            error={error}
            totalResults={totalResults}
            filters={filters}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </ConfigProvider>
  );
}

export default App;