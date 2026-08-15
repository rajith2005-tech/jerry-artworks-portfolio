import React, { useRef } from 'react';
import { Artwork } from '../types';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  portraitUrl: string;
  onUpdatePortrait: (url: string) => void;
  artworks: Artwork[];
  onUpdateArtwork: (id: string, updates: Partial<Artwork>) => void;
  onResetPlaceholders: () => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  portraitUrl,
  onUpdatePortrait,
  artworks,
  onUpdateArtwork,
  onResetPlaceholders,
}) => {
  const portraitInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdatePortrait(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArtworkUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateArtwork(id, { imageUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(15, 14, 13, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <input
        type="file"
        ref={portraitInputRef}
        onChange={handlePortraitUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '88vh',
          borderRadius: '6px',
          padding: '2.2rem',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              Artwork & Portrait Drop-Zone
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Drop your sketches, paintings, or portrait photo to preview them instantly inside the frames!
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Hero Portrait Slot */}
        <div style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: '#F8F6F1', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '66px', backgroundColor: '#E2DDD5', border: '2px solid #FFFFFF', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {portraitUrl ? (
                  <img src={portraitUrl} alt="Hero Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Empty</span>
                )}
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Hero Portrait Frame</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>The photo shown between the script title and headline.</p>
              </div>
            </div>
            <button
              onClick={() => portraitInputRef.current?.click()}
              style={{
                padding: '0.45rem 0.9rem',
                backgroundColor: 'var(--text-primary)',
                color: '#FFFFFF',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {portraitUrl ? 'Change Portrait' : 'Upload Portrait'}
            </button>
          </div>
        </div>

        {/* 5 Artwork Slots */}
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          5 Artwork Slots (Selected Work)
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {artworks.map((art, index) => (
            <div
              key={art.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                border: '1px solid var(--border-light)',
                borderRadius: '4px',
                flexWrap: 'wrap',
                gap: '1rem',
                backgroundColor: '#FAFAF8',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Mini thumbnail */}
                <div
                  style={{
                    width: art.orientation === 'portrait' ? '44px' : '58px',
                    height: '52px',
                    backgroundColor: '#EAE6DE',
                    border: '2px solid #141414',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {art.imageUrl ? (
                    <img src={art.imageUrl} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Slot {index + 1}</span>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>SLOT #{index + 1}</span>
                    <span style={{ fontSize: '0.68rem', backgroundColor: '#EFECE6', padding: '1px 6px', borderRadius: '2px', fontWeight: 600 }}>
                      {art.orientation.toUpperCase()}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={art.title}
                    onChange={(e) => onUpdateArtwork(art.id, { title: e.target.value })}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      border: '1px solid transparent',
                      borderBottom: '1px solid var(--border-light)',
                      backgroundColor: 'transparent',
                      padding: '2px 4px',
                      color: 'var(--text-primary)',
                      marginTop: '2px',
                      width: '200px',
                    }}
                    placeholder="Artwork Title"
                  />
                  <div style={{ marginTop: '2px' }}>
                    <input
                      type="text"
                      value={art.medium}
                      onChange={(e) => onUpdateArtwork(art.id, { medium: e.target.value })}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        border: 'none',
                        borderBottom: '1px dashed var(--border-light)',
                        backgroundColor: 'transparent',
                        padding: '1px 3px',
                        width: '220px',
                      }}
                      placeholder="Medium (e.g. Graphite / Digital)"
                    />
                  </div>
                </div>
              </div>

              {/* Upload action for this slot */}
              <div>
                <label
                  style={{
                    display: 'inline-block',
                    padding: '0.4rem 0.85rem',
                    backgroundColor: art.imageUrl ? '#F2EFE9' : '#141414',
                    color: art.imageUrl ? 'var(--text-primary)' : '#FFFFFF',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {art.imageUrl ? 'Replace Art' : '+ Upload Art'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleArtworkUpload(art.id, e)}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Bottom Actions */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
          <button
            onClick={onResetPlaceholders}
            style={{
              fontSize: '0.75rem',
              color: '#8A3B3B',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Reset to Clean Placeholders
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '0.55rem 1.4rem',
              backgroundColor: 'var(--text-primary)',
              color: '#FFFFFF',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            Done Previewing
          </button>
        </div>
      </div>
    </div>
  );
};
