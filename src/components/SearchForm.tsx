import React from 'react';
import { Input, Select, DatePicker, Button, Space, Card } from 'antd';
import { Search, Calendar, Filter } from 'lucide-react';
import dayjs from 'dayjs';
import type { SearchFilters } from '../types/article';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface SearchFormProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  loading: boolean;
}

const sections = [
  'Arts',
  'Business',
  'Health',
  'Politics',
  'Science',
  'Sports',
  'Technology',
  'Travel',
  'World',
];

export const SearchForm: React.FC<SearchFormProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  loading,
}) => {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, query: e.target.value, page: 0 });
  };

  const handleSectionChange = (value: string) => {
    onFiltersChange({ ...filters, section: value || undefined, page: 0 });
  };

  const handleSortChange = (value: 'newest' | 'oldest' | 'relevance') => {
    onFiltersChange({ ...filters, sortBy: value, page: 0 });
  };

  const handleDateRangeChange = (dates: any) => {
    const [start, end] = dates || [null, null];
    onFiltersChange({
      ...filters,
      beginDate: start ? start.format('YYYY-MM-DD') : undefined,
      endDate: end ? end.format('YYYY-MM-DD') : undefined,
      page: 0,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Card className="mb-6 shadow-sm" variant='borderless'>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              size="large"
              placeholder="Search articles..."
              value={filters.query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyPress}
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              className="rounded-lg"
            />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={onSearch}
            loading={loading}
            disabled={!filters.query.trim()}
            className="bg-blue-600 hover:bg-blue-700 border-0 rounded-lg px-8"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <Space wrap className="flex-1">
            <Select
              placeholder="All sections"
              value={filters.section}
              onChange={handleSectionChange}
              className="w-40"
              allowClear
            >
              {sections.map((section) => (
                <Option key={section} value={section}>
                  {section}
                </Option>
              ))}
            </Select>

            <Select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="w-32"
            >
              <Option value="newest">Newest</Option>
              <Option value="oldest">Oldest</Option>
              <Option value="relevance">Relevance</Option>
            </Select>

            <RangePicker
              value={[
                filters.beginDate ? dayjs(filters.beginDate) : null,
                filters.endDate ? dayjs(filters.endDate) : null,
              ]}
              onChange={handleDateRangeChange}
              className="rounded-lg"
              suffixIcon={<Calendar className="w-4 h-4" />}
            />
          </Space>
        </div>
      </div>
    </Card>
  );
};