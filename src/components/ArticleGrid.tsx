import React from 'react';
import { Row, Col, Pagination, Empty, Spin, Alert } from 'antd';
import { FileText } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import type { NYTArticle, SearchFilters } from '../types/article';

interface ArticleGridProps {
  articles: NYTArticle[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  filters: SearchFilters;
  onPageChange: (page: number) => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  loading,
  error,
  totalResults,
  filters,
  onPageChange,
}) => {
  if (error && navigator.onLine) {
    return (
      <Alert
        message="Error Loading Articles"
        description={error}
        type="error"
        showIcon
        className="rounded-lg"
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spin size="large" />
      </div>
    );
  }

  if (articles.length === 0 && filters.query) {
    return (
      <Empty
        image={<FileText className="w-16 h-16 text-gray-400 mx-auto" />}
        description={
          <div className="text-gray-500">
            <p className="text-lg">No articles found</p>
            <p className="text-sm">Try adjusting your search terms or filters</p>
          </div>
        }
        className="py-16"
      />
    );
  }

  return (
    <div className="space-y-6">
      {totalResults > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Found <span className="font-semibold">{totalResults.toLocaleString()}</span> articles
          </p>
        </div>
      )}

      <Row gutter={[24, 24]}>
        {articles.map((article, index) => (
          <Col
            key={`${article.web_url}-${index}`}
            xs={24}
            sm={12}
            lg={8}
            xl={6}
          >
            <ArticleCard article={article} />
          </Col>
        ))}
      </Row>

      {totalResults > 10 && (
        <div className="flex justify-center pt-8">
          <Pagination
            current={filters.page + 1}
            total={Math.min(totalResults, 1000)} // NYT API limits to 100 pages
            pageSize={10}
            onChange={(page) => onPageChange(page - 1)}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} articles`
            }
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};