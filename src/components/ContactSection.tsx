import React, { useState } from 'react';
import { ContactInfo } from '../types';

interface ContactSectionProps {
  contact: ContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section
      id="contact"
      style={{
        padding: '7rem 0 6rem',
        backgroundColor: '#F5F2EB',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container">
        {/* Giant Section Title matching reference */}
        <h2
          style={{
            fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 7.5rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            marginBottom: '4.5rem',
          }}
        >
          REACH OUT<br />TO ME
        </h2>

        {/* 3-Column Meta Layout matching reference */}
        <div className="contact-details-grid">
          {/* Column 1: Studio / Location */}
          <div className="contact-col">
            <span className="contact-label">STUDIO / LOCATION</span>
            <p className="contact-value" style={{ maxWidth: '240px' }}>
              {contact.locationDetails}
            </p>
          </div>

          {/* Column 2: E-Mail */}
          <div className="contact-col">
            <span className="contact-label">E-MAIL</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <a
                href={`mailto:${contact.email}`}
                className="contact-value contact-link"
              >
                {contact.email}
              </a>
              <button
                onClick={() => copyToClipboard(contact.email, 'email')}
                title="Copy email to clipboard"
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  padding: '2px 6px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '3px',
                }}
              >
                {copiedField === 'email' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Column 3: Phone */}
          <div className="contact-col">
            <span className="contact-label">PHONE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                className="contact-value contact-link"
              >
                {contact.phone}
              </a>
              <button
                onClick={() => copyToClipboard(contact.phone, 'phone')}
                title="Copy phone to clipboard"
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  padding: '2px 6px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '3px',
                }}
              >
                {copiedField === 'phone' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Channels Row */}
        <div
          style={{
            marginTop: '4.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  opacity: 0.8,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
              >
                {social.name} <span style={{ fontSize: '0.85rem' }}>↗</span>
              </a>
            ))}
          </div>

          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            Available for Freelance, Commissions & Studio Roles
          </span>
        </div>
      </div>

      <style>{`
        .contact-details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        .contact-col {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .contact-label {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .contact-value {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.5;
        }
        .contact-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 860px) {
          .contact-details-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};
