import React, { useState, useEffect } from 'react';
import { contactData } from '../data/portfolioData';
import { generateCsrfToken, sanitizeInput, isValidEmail, submissionRateLimiter } from '../utils/security';
import { useCursor } from '../hooks/useCursorState';

export const ContactPage: React.FC = () => {
  const { setCursorContext, resetCursor } = useCursor();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Message Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentSuccess, setSentSuccess] = useState(false);
  const [rateLimitErr, setRateLimitErr] = useState<string | null>(null);

  useEffect(() => {
    setCsrfToken(generateCsrfToken());
  }, []);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setSentSuccess(true);
      return;
    }

    if (!submissionRateLimiter.canSubmit()) {
      setRateLimitErr(`Please wait ${submissionRateLimiter.getWaitTimeSeconds()} seconds before sending another message.`);
      return;
    }

    const newErrors: Record<string, string> = {};
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMsg = sanitizeInput(message);

    if (!sanitizedName || sanitizedName.length < 2) newErrors.name = 'Please provide your name.';
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) newErrors.email = 'Please provide a valid email.';
    if (!sanitizedMsg || sanitizedMsg.length < 10) newErrors.message = 'Please enter a message (at least 10 characters).';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    submissionRateLimiter.recordSubmission();
    setSentSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setRateLimitErr(null);
  };

  return (
    <div className="anim-fade-in" style={{ paddingTop: '8rem', paddingBottom: '7rem' }}>
      <div className="container">
        {/* Giant Editorial Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 7.5rem)',
            fontWeight: 800,
            color: 'var(--ink-primary)',
            letterSpacing: '0.02em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            marginBottom: '4.5rem',
          }}
        >
          REACH OUT<br />TO ME
        </h1>

        {/* 3-Column Meta Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3.5rem',
            marginBottom: '6rem',
          }}
        >
          {/* Column 1: Studio / Location */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              STUDIO LOCATION
            </span>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                lineHeight: 1.6,
              }}
            >
              {contactData.locationDetails}
            </p>
          </div>

          {/* Column 2: E-Mail with Copy Action */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              DIRECT E-MAIL
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={`mailto:${contactData.email}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--ink-primary)',
                  textDecoration: 'underline',
                }}
              >
                {contactData.email}
              </a>
              <button
                onClick={() => copyToClipboard(contactData.email, 'email')}
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--ink-secondary)',
                  padding: '3px 8px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '2px',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                {copiedField === 'email' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Column 3: Phone with Copy Action */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              STUDIO TELEPHONE
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={`tel:${contactData.phone.replace(/[^0-9+]/g, '')}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--ink-primary)',
                }}
              >
                {contactData.phone}
              </a>
              <button
                onClick={() => copyToClipboard(contactData.phone, 'phone')}
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--ink-secondary)',
                  padding: '3px 8px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '2px',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                {copiedField === 'phone' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Direct Studio Message Box */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '5rem',
            maxWidth: '780px',
            margin: '0 auto',
          }}
        >
          <div className="editorial-header-row" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <h2 className="editorial-header-title">DISPATCH A DIRECT MESSAGE</h2>
          </div>

          {sentSuccess ? (
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--ink-primary)',
                padding: '2.5rem',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Message Dispatched
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                Your note has been transmitted to Rajith. You will receive a direct reply shortly.
              </p>
              <button
                onClick={() => setSentSuccess(false)}
                className="btn-editorial-outline"
                style={{ marginTop: '1.5rem' }}
              >
                Send Another Message ↗
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate>
              {rateLimitErr && (
                <div style={{ color: '#D32F2F', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {rateLimitErr}
                </div>
              )}

              {/* Honeypot & CSRF */}
              <input type="hidden" name="csrfToken" value={csrfToken} />
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <label
                    htmlFor="contact_name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    NAME *
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: errors.name ? '1.5px solid #D32F2F' : '1px solid var(--border-light)',
                      borderRadius: '2px',
                    }}
                  />
                  {errors.name && <span style={{ color: '#D32F2F', fontSize: '0.75rem' }}>{errors.name}</span>}
                </div>

                <div>
                  <label
                    htmlFor="contact_email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: errors.email ? '1.5px solid #D32F2F' : '1px solid var(--border-light)',
                      borderRadius: '2px',
                    }}
                  />
                  {errors.email && <span style={{ color: '#D32F2F', fontSize: '0.75rem' }}>{errors.email}</span>}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="contact_message"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: '0.4rem',
                  }}
                >
                  MESSAGE *
                </label>
                <textarea
                  id="contact_message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: errors.message ? '1.5px solid #D32F2F' : '1px solid var(--border-light)',
                    borderRadius: '2px',
                    resize: 'vertical',
                  }}
                />
                {errors.message && <span style={{ color: '#D32F2F', fontSize: '0.75rem' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-editorial-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onMouseEnter={() => setCursorContext('hover')}
                onMouseLeave={resetCursor}
              >
                Transmit Message ↗
              </button>
            </form>
          )}
        </div>

        {/* Social Media Channels */}
        <div
          style={{
            marginTop: '6rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {contactData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                {social.name} <span>↗</span>
              </a>
            ))}
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ink-muted)',
            }}
          >
            Worldwide Archival Shipping & Digital Delivery
          </span>
        </div>
      </div>
    </div>
  );
};
