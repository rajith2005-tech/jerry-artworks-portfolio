import React from 'react';
import { Artwork } from '../../types';
import { ArtFrame } from './ArtFrame';

interface GallerySectionProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  artworks,
  onSelectArtwork,
}) => {
  const [filter, setFilter] = React.useState<'all' | 'anime' | 'portrait' | 'concept'>('all');

  const filteredArtworks = filter === 'all'
    ? artworks
    : artworks.filter((art) => art.category === filter);

  const largeArtwork = artworks[0];
  const item2 = artworks[1];
  const item3 = artworks[2];
  const item4 = artworks[3];
  const item5 = artworks[4];

  return (
    <section id="work" style={{ padding: '6rem 0 5rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <h2 className="section-title">SELECTED WORK</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="category-filters">
              {(['all', 'anime', 'portrait', 'concept'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '2px',
                    color: filter === cat ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderBottom: filter === cat ? '2px solid var(--text-primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <a
              href="#work"
              className="section-action-link"
              onClick={(e) => {
                e.preventDefault();
                setFilter('all');
              }}
            >
              VIEW ALL <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Dynamic Display based on filter */}
        {filter === 'all' ? (
          /* Exact Asymmetric Reference Layout */
          <div className="editorial-gallery-grid">
            {/* Left Big Featured Frame */}
            {largeArtwork && (
              <div className="gallery-col-large">
                <ArtFrame
                  artwork={largeArtwork}
                  onSelect={onSelectArtwork}
                  isLarge={true}
                />
              </div>
            )}

            {/* Right Stacked Multi-Frame Grid */}
            <div className="gallery-col-stacked">
              {/* Row 1: Portrait + Landscape */}
              <div className="gallery-sub-row">
                {item2 && (
                  <div className="frame-wrapper-item">
                    <ArtFrame
                      artwork={item2}
                      onSelect={onSelectArtwork}
                    />
                  </div>
                )}
                {item3 && (
                  <div className="frame-wrapper-item landscape-item">
                    <ArtFrame
                      artwork={item3}
                      onSelect={onSelectArtwork}
                    />
                  </div>
                )}
              </div>

              {/* Row 2: Portrait + Landscape */}
              <div className="gallery-sub-row" style={{ marginTop: '2.5rem' }}>
                {item4 && (
                  <div className="frame-wrapper-item">
                    <ArtFrame
                      artwork={item4}
                      onSelect={onSelectArtwork}
                    />
                  </div>
                )}
                {item5 && (
                  <div className="frame-wrapper-item landscape-item">
                    <ArtFrame
                      artwork={item5}
                      onSelect={onSelectArtwork}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Filtered Grid View */
          <div className="filtered-gallery-grid">
            {filteredArtworks.map((art) => (
              <ArtFrame
                key={art.id}
                artwork={art}
                onSelect={onSelectArtwork}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .editorial-gallery-grid {
          display: grid;
          grid-template-columns: 1.08fr 1.32fr;
          gap: 3.5rem;
          align-items: start;
        }
        .gallery-sub-row {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 2.2rem;
          align-items: start;
        }
        .filtered-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.5rem;
        }
        .category-filters {
          display: flex;
          gap: 0.5rem;
        }
        @media (max-width: 1024px) {
          .editorial-gallery-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 768px) {
          .gallery-sub-row {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .category-filters {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
