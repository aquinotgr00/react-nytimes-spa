import React from 'react';
import { Typography } from 'antd';
import { Newspaper, Sun, Moon } from 'lucide-react';

const { Title, Text } = Typography;

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <Title level={2} className="!mb-0 text-gray-900 dark:text-blue-200">
              NYT Article Reader
            </Title>
            <Text type="secondary" className="text-sm dark:text-gray-400">
              Search and discover articles from The New York Times
            </Text>
          </div>
        </div>
        <button
          aria-label="Toggle dark mode"
          onClick={onToggleDarkMode}
          className="ml-4 p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
};