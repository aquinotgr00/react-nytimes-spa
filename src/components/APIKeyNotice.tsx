import React from 'react';
import { Alert } from 'antd';
import { Key } from 'lucide-react';

export const APIKeyNotice: React.FC = () => {
  return (
    <Alert
      message="NYT API Key Required"
      description={
        <div className="space-y-2">
          <p>
            To use this application, you need a New York Times API key.
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Visit <a href="https://developer.nytimes.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NYT Developer Portal</a></li>
            <li>Create an account and request an API key</li>
            <li>Replace 'DEMO_KEY' in src/services/nytAPI.ts with your actual API key</li>
          </ol>
        </div>
      }
      type="info"
      showIcon
      icon={<Key className="w-4 h-4" />}
      className="mb-6 rounded-lg"
      closable
    />
  );
};