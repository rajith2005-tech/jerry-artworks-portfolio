import React, { useMemo } from 'react';

/**
 * High-performance inline procedural SVG grain overlay
 * Replicates the organic tooth of 300gsm cold-press watercolor paper and charcoal dust.
 */
export const NoiseOverlay: React.FC = () => {
  const noiseSvgDataUrl = useMemo(() => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'>
        <filter id='noiseFilter'>
          <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>
          <feColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0'/>
        </filter>
        <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  return (
    <div
      className="noise-overlay"
      style={{ backgroundImage: `url("${noiseSvgDataUrl}")` }}
      aria-hidden="true"
    />
  );
};
