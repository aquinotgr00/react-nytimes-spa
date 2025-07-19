import React, { useEffect, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ArticleGrid } from './components/ArticleGrid';
import { APIKeyNotice } from './components/APIKeyNotice';
import { useArticleSearch } from './hooks/useArticleSearch';
import { OfflineBanner } from './components/OfflineBanner';

const themeConfig = {
  token: {
    colorPrimary: '#2563eb',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        {!isOnline && <OfflineBanner />}
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((d) => !d)} />
        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${!isOnline ? 'mt-10' : ''}`}>
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