import React, { useState, useEffect } from 'react';
import { commissionTiers } from '../data/portfolioData';
import { CommissionInquiry } from '../types';
import {
  generateCsrfToken,
  validateCommissionInquiry,
  submissionRateLimiter,
} from '../utils/security';
import { useCursor } from '../hooks/useCursorState';

export const CommissionsPage: React.FC = () => {
  const { setCursorContext, resetCursor } = useCursor();

  // Form State
  const [formData, setFormData] = useState<Partial<CommissionInquiry>>({
    clientName: '',
    email: '',
    projectType: 'traditional-graphite',
    budgetTier: '$250 - $400 USD (Graphite)',
    description: '',
  });

  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);

  // Generate CSRF token on mount
  useEffect(() => {
    const token = generateCsrfToken();
    setFormData((prev) => ({ ...prev, csrfToken: token }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check (bot detection)
    if (honeypot) {
      console.warn('Spam detected via honeypot.');
      setIsSubmitted(true); // Fail silently for bots
      return;
    }

    // 2. Rate limiting check
    if (!submissionRateLimiter.canSubmit()) {
      const waitSec = submissionRateLimiter.getWaitTimeSeconds();
      setRateLimitMessage(
        `Submission rate limit reached. Please wait ${waitSec} seconds before sending another inquiry.`
      );
      return;
    }

    // 3. Validation & Sanitization
    const result = validateCommissionInquiry(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    setRateLimitMessage(null);

    // Record submission for rate limiting
    submissionRateLimiter.recordSubmission();

    // Simulate secure client API transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        clientName: '',
        email: '',
        projectType: 'traditional-graphite',
        budgetTier: '$250 - $400 USD (Graphite)',
        description: '',
      });
    }, 750);
  };

  return (
    <div className="anim-fade-in" style={{ paddingTop: '8rem', paddingBottom: '7rem' }}>
      <div className="container">
        {/* Editorial Page Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            BESPOKE COMMISSIONS & CONCEPT ART CONTRACTS
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: 'var(--ink-primary)',
            }}
          >
            COMMISSIONS
          </h1>

          <p
            style={{
              marginTop: '1rem',
              maxWidth: '680px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.96rem',
              color: 'var(--ink-secondary)',
              lineHeight: 1.7,
            }}
          >
            Whether commissioning a physical signed graphite piece on 300gsm Bristol, digital key visuals, or an interactive Spine 2D rigged animation, each piece receives museum-grade attention to anatomical silhouette and tonal depth.
          </p>
        </div>

        {/* 3-Tier Commission Pricing Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '6rem',
          }}
        >
          {commissionTiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s var(--ease-editorial), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-frame-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {tier.turnaroundTime}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--accent-ochre)',
                    }}
                  >
                    {tier.startingPrice}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--ink-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {tier.name}
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.84rem',
                    color: 'var(--ink-secondary)',
                    marginBottom: '1.8rem',
                  }}
                >
                  Ideal for: {tier.idealFor}
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    INCLUDED DELIVERABLES:
                  </span>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {tier.deliverables.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          color: 'var(--ink-primary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          lineHeight: 1.45,
                        }}
                      >
                        <span style={{ color: 'var(--accent-ochre)', fontWeight: 'bold' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  const formEl = document.getElementById('inquiry-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  setFormData((prev) => ({
                    ...prev,
                    projectType:
                      tier.id === 'tier-graphite'
                        ? 'traditional-graphite'
                        : tier.id === 'tier-digital'
                        ? 'digital-portrait'
                        : 'commercial-spine',
                    budgetTier: tier.startingPrice,
                  }));
                }}
                className="btn-editorial-outline"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
                onMouseEnter={() => setCursorContext('hover')}
                onMouseLeave={resetCursor}
              >
                Select Tier & Inquire ↗
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Commission Inquiry Form */}
        <div
          id="inquiry-form"
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '5rem',
            maxWidth: '820px',
            margin: '0 auto',
          }}
        >
          <div className="editorial-header-row" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <h2 className="editorial-header-title">COMMISSION PROJECT INQUIRY FORM</h2>
          </div>

          {isSubmitted ? (
            <div
              style={{
                backgroundColor: '#F1EFEA',
                border: '1.5px solid var(--ink-primary)',
                padding: '3rem 2rem',
                textAlign: 'center',
                animation: 'fadeIn 0.4s ease',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Inquiry Received with Gratitude
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--ink-secondary)',
                  maxWidth: '560px',
                  margin: '0 auto 2rem',
                  lineHeight: 1.7,
                }}
              >
                Thank you! Rajith will review your concept notes and respond within 24 to 48 hours via email with estimated scheduling and draft sketches.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-editorial-primary"
              >
                Send Another Inquiry ↗
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {rateLimitMessage && (
                <div
                  style={{
                    backgroundColor: '#FBE9E7',
                    color: '#C62828',
                    padding: '0.9rem 1.25rem',
                    borderRadius: '2px',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                  role="alert"
                >
                  {rateLimitMessage}
                </div>
              )}

              {/* Honeypot field (hidden from real users) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website_hp">Leave this empty</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                {/* Client Name */}
                <div>
                  <label
                    htmlFor="clientName"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    YOUR NAME / STUDIO *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName || ''}
                    onChange={handleChange}
                    placeholder="e.g. Maya Lin"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: errors.clientName ? '1.5px solid #D32F2F' : '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontSize: '0.9rem',
                    }}
                  />
                  {errors.clientName && (
                    <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                      {errors.clientName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder="e.g. maya@domain.com"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: errors.email ? '1.5px solid #D32F2F' : '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontSize: '0.9rem',
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Type & Budget Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <label
                    htmlFor="projectType"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    MEDIUM & PROJECT TYPE
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="traditional-graphite">Traditional Graphite Masterpiece (Bristol 300gsm)</option>
                    <option value="digital-portrait">Digital Character & Concept Art</option>
                    <option value="commercial-spine">Spine 2D Rigged Animation Artwork</option>
                    <option value="concept-illustration">Anime Figurative Key-Visual Board</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="budgetTier"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    ESTIMATED BUDGET TIER
                  </label>
                  <select
                    id="budgetTier"
                    name="budgetTier"
                    value={formData.budgetTier}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="$250 - $400 USD (Graphite)">$250 - $400 USD (Archival Graphite)</option>
                    <option value="$350 - $600 USD (Digital)">$350 - $600 USD (Digital Illustration)</option>
                    <option value="$600 - $1200+ USD (Spine 2D)">$600 - $1200+ USD (Spine 2D Rigged Motion)</option>
                    <option value="Commercial Licensing">Commercial Rights / Game Studio Contract</option>
                  </select>
                </div>
              </div>

              {/* Project Concept Description */}
              <div style={{ marginBottom: '2rem' }}>
                <label
                  htmlFor="description"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: '0.5rem',
                  }}
                >
                  PROJECT CONCEPT & CHARACTER REFERENCES *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description || ''}
                  onChange={handleChange}
                  placeholder="Describe your character pose, mood, medium preference, reference links, and intended usage..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: errors.description ? '1.5px solid #D32F2F' : '1px solid var(--border-light)',
                    borderRadius: '2px',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    resize: 'vertical',
                  }}
                />
                {errors.description && (
                  <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                    {errors.description}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-editorial-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onMouseEnter={() => setCursorContext('hover')}
                onMouseLeave={resetCursor}
              >
                {isSubmitting ? 'Transmitting Secure Inquiry...' : 'Submit Commission Inquiry ↗'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
