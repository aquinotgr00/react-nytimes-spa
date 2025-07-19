import React from 'react';

export const OfflineBanner: React.FC = () => (
  <div className="w-full bg-red-600 text-white text-center py-2 fixed top-0 left-0 z-50 shadow-md">
    <span role="status" aria-live="polite">
      You are offline. Some features may not be available.
    </span>
  </div>
); 