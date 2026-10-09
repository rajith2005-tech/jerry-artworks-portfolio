import { describe, it, expect, beforeEach } from 'vitest';
import {
  sanitizeInput,
  isValidEmail,
  generateCsrfToken,
  verifyCsrfToken,
  validateCommissionInquiry,
  submissionRateLimiter,
} from '../../src/utils/security';

describe('Security & Form Utilities', () => {
  beforeEach(() => {
    submissionRateLimiter.reset();
  });

  describe('sanitizeInput', () => {
    it('defangs malicious HTML and script tags (XSS Prevention)', () => {
      const malicious = '<script>alert("hack")</script><img src="x" onerror="evil()" />';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('&lt;script&gt;');
      expect(sanitized).toContain('&lt;img');
    });

    it('preserves clean editorial text with quotes and punctuation safely', () => {
      const input = 'Character portrait with 2B-8B pencils.';
      expect(sanitizeInput(input)).toBe('Character portrait with 2B-8B pencils.');
    });
  });

  describe('isValidEmail', () => {
    it('approves RFC-compliant email addresses', () => {
      expect(isValidEmail('rajitr2005@gmail.com')).toBe(true);
      expect(isValidEmail('collector.studio@domain.co.uk')).toBe(true);
    });

    it('rejects malformed email addresses', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('missing@tld')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });

  describe('CSRF Token Generation & Verification', () => {
    it('generates a unique hexadecimal token and verifies it correctly', () => {
      const token = generateCsrfToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(10);
      expect(verifyCsrfToken(token)).toBe(true);
      expect(verifyCsrfToken('tampered-token')).toBe(false);
    });
  });

  describe('validateCommissionInquiry', () => {
    it('Happy path: passes clean, valid commission inquiry', () => {
      const csrf = generateCsrfToken();
      const result = validateCommissionInquiry({
        clientName: 'Alex Mercer',
        email: 'alex@conceptstudio.com',
        description: 'Commission for an anime fantasy hero with flowing haori in graphite.',
        projectType: 'traditional-graphite',
        budgetTier: '$250 - $400 USD',
        csrfToken: csrf,
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
      expect(result.sanitizedData?.clientName).toBe('Alex Mercer');
    });

    it('Edge case 1: rejects empty fields or too short description', () => {
      const result = validateCommissionInquiry({
        clientName: '',
        email: 'invalid-email',
        description: 'Hi',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.clientName).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.description).toBeDefined();
    });

    it('Edge case 2: catches CSRF mismatch', () => {
      const result = validateCommissionInquiry({
        clientName: 'Valid Name',
        email: 'valid@example.com',
        description: 'Valid description that has enough characters.',
        csrfToken: 'wrong-token',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.csrf).toBeDefined();
    });
  });

  describe('Rate Limiter', () => {
    it('Edge case 3: blocks rapid repeated submissions (spam protection)', () => {
      expect(submissionRateLimiter.canSubmit()).toBe(true);
      submissionRateLimiter.recordSubmission();
      submissionRateLimiter.recordSubmission();
      submissionRateLimiter.recordSubmission();

      // 4th submission in same window should be blocked
      expect(submissionRateLimiter.canSubmit()).toBe(false);
      expect(submissionRateLimiter.getWaitTimeSeconds()).toBeGreaterThan(0);
    });
  });
});
