import React from 'react';
import { Typography } from 'antd';
import { Newspaper } from 'lucide-react';

const { Title, Text } = Typography;

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <Title level={2} className="mb-0 text-gray-900">
              NYT Article Reader
            </Title>
            <Text type="secondary" className="text-sm">
              Search and discover articles from The New York Times
            </Text>
          </div>
        </div>
      </div>
    </header>
  );
};