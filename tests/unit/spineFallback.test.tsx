import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpineAnimation } from '../../src/components/spine/SpineAnimation';

// Mock matchMedia for testing reduced-motion
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('SpineAnimation Component & Graceful Fallbacks', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('Happy path: renders interactive motion viewport with fallback image ready', () => {
    render(
      <SpineAnimation
        skeletonPath="/spine/giyu/giyu.json"
        atlasPath="/spine/giyu/giyu.atlas"
        fallbackImageUrl="/images/art1.jpeg"
        altText="Giyu Tomiyoka"
        defaultAnimation="idle"
        aimBoneName="head_aim"
      />
    );

    const viewport = screen.getByRole('region', { name: /interactive artwork motion viewport/i });
    expect(viewport).toBeInTheDocument();

    const fallbackImg = screen.getByAltText('Giyu Tomiyoka');
    expect(fallbackImg).toBeInTheDocument();
    expect(fallbackImg).toHaveAttribute('src', '/images/art1.jpeg');
  });

  it('Edge case 1: missing Spine asset paths gracefully displays fallback image without crashing', () => {
    const errorSpy = vi.fn();
    render(
      <SpineAnimation
        fallbackImageUrl="/images/art2.jpeg"
        altText="Douma"
        onLoadError={errorSpy}
      />
    );

    const img = screen.getByAltText('Douma');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/art2.jpeg');
  });

  it('Edge case 2: automatically enforces static archival image when prefers-reduced-motion is enabled (WCAG AA)', () => {
    mockMatchMedia(true); // User prefers reduced motion

    render(
      <SpineAnimation
        skeletonPath="/spine/giyu/giyu.json"
        atlasPath="/spine/giyu/giyu.atlas"
        fallbackImageUrl="/images/art1.jpeg"
        altText="Giyu Tomiyoka"
        aimBoneName="head_aim"
      />
    );

    const img = screen.getByAltText('Giyu Tomiyoka');
    expect(img).toBeInTheDocument();
    // In reduced motion, telemetry indicates ARCHIVAL STILL
    const badgeText = screen.getByText(/ARCHIVAL STILL/i);
    expect(badgeText).toBeInTheDocument();
  });
});
