import React from 'react';
import { Card, Tag } from 'antd';
import { Calendar, ExternalLink, User } from 'lucide-react';
import dayjs from 'dayjs';
import type { NYTArticle } from '../types/article';
import { NYTAPIService } from '../services/nytAPI';

interface ArticleCardProps {
  article: NYTArticle;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const imageUrl = NYTAPIService.getImageUrl(article);
  const formattedDate = dayjs(article.pub_date).format('MMM DD, YYYY');
  
  const handleCardClick = () => {
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      hoverable
      className="h-full shadow-sm hover:shadow-md transition-all duration-300 border-0 rounded-xl overflow-hidden cursor-pointer"
      onClick={handleCardClick}
      cover={
        imageUrl && (
          <div className="h-48 overflow-hidden">
            <img
              alt={article.headline.main}
              src={imageUrl}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )
      }
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          {article.section_name && (
            <Tag color="blue" className="mb-0 rounded-full">
              {article.section_name}
            </Tag>
          )}
          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
          {article.headline.main}
        </h3>

        {article.snippet && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {article.snippet}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          
          {article.byline?.original && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <User className="w-3 h-3" />
              <span className="truncate max-w-32">
                {article.byline.original.replace('By ', '')}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};