import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LightboxModal } from '../../src/components/Gallery/LightboxModal';
import { initialArtworks } from '../../src/data/portfolioData';

describe('LightboxModal Keyboard Accessibility & Navigation', () => {
  it('Happy path: renders artwork modal dialog with title and metadata', () => {
    const handleClose = vi.fn();
    const handleSelect = vi.fn();

    render(
      <LightboxModal
        artwork={initialArtworks[0]}
        allArtworks={initialArtworks}
        onClose={handleClose}
        onSelect={handleSelect}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('GIYU TOMIYOKA')).toBeInTheDocument();
    expect(screen.getByLabelText(/close dialog/i)).toBeInTheDocument();
  });

  it('Edge case 1: pressing Escape key closes the modal', () => {
    const handleClose = vi.fn();
    const handleSelect = vi.fn();

    render(
      <LightboxModal
        artwork={initialArtworks[0]}
        allArtworks={initialArtworks}
        onClose={handleClose}
        onSelect={handleSelect}
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('Edge case 2: pressing ArrowRight and ArrowLeft cycles through artworks', () => {
    const handleClose = vi.fn();
    const handleSelect = vi.fn();

    render(
      <LightboxModal
        artwork={initialArtworks[0]}
        allArtworks={initialArtworks}
        onClose={handleClose}
        onSelect={handleSelect}
      />
    );

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(handleSelect).toHaveBeenCalledWith(initialArtworks[1]);

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(handleSelect).toHaveBeenCalledWith(initialArtworks[initialArtworks.length - 1]);
  });
});
