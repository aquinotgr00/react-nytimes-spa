import React from 'react';
import { render, screen } from '@testing-library/react';
import { OfflineBanner } from '../OfflineBanner';

describe('OfflineBanner', () => {
  it('renders the offline message', () => {
    render(<OfflineBanner />);
    expect(screen.getByText(/you are offline/i)).toBeInTheDocument();
  });

  it('has the correct accessibility attributes', () => {
    render(<OfflineBanner />);
    const status = screen.getByText(/you are offline/i).closest('span');
    expect(status).toHaveAttribute('role', 'status');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('has the correct styles', () => {
    render(<OfflineBanner />);
    const banner = screen.getByText(/you are offline/i).closest('div');
    expect(banner).toHaveClass('bg-red-600');
    expect(banner).toHaveClass('fixed');
    expect(banner).toHaveClass('top-0');
  });
}); 