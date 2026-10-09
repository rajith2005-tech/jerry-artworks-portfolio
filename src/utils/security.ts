import { CommissionInquiry } from '../types';

/**
 * Sanitizes user input to prevent XSS attacks and injection
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validates email address format with strict RFC 5322 regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Client CSRF simulation token storage
 */
let currentCsrfToken: string | null = null;

export function generateCsrfToken(): string {
  const randomBytes = new Uint8Array(16);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(randomBytes);
    currentCsrfToken = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  } else {
    currentCsrfToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  return currentCsrfToken;
}

export function verifyCsrfToken(token: string): boolean {
  if (!currentCsrfToken || !token) return false;
  return currentCsrfToken === token;
}

/**
 * Client-side rate limiter for form submissions
 */
class RateLimiter {
  private lastSubmissionTimes: number[] = [];
  private readonly maxSubmissions: number;
  private readonly windowMs: number;

  constructor(maxSubmissions = 3, windowMs = 60000) {
    this.maxSubmissions = maxSubmissions;
    this.windowMs = windowMs;
  }

  public canSubmit(): boolean {
    const now = Date.now();
    this.lastSubmissionTimes = this.lastSubmissionTimes.filter((time) => now - time < this.windowMs);
    return this.lastSubmissionTimes.length < this.maxSubmissions;
  }

  public recordSubmission(): void {
    this.lastSubmissionTimes.push(Date.now());
  }

  public getWaitTimeSeconds(): number {
    if (this.lastSubmissionTimes.length === 0) return 0;
    const oldest = this.lastSubmissionTimes[0];
    const elapsed = Date.now() - oldest;
    return Math.max(0, Math.ceil((this.windowMs - elapsed) / 1000));
  }

  public reset(): void {
    this.lastSubmissionTimes = [];
  }
}

export const submissionRateLimiter = new RateLimiter();

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: CommissionInquiry;
}

/**
 * Validates and sanitizes a commission inquiry
 */
export function validateCommissionInquiry(data: Partial<CommissionInquiry>): ValidationResult {
  const errors: Record<string, string> = {};

  const name = data.clientName ? sanitizeInput(data.clientName) : '';
  const email = data.email ? sanitizeInput(data.email) : '';
  const description = data.description ? sanitizeInput(data.description) : '';
  const projectType = data.projectType || 'traditional-graphite';
  const budgetTier = data.budgetTier ? sanitizeInput(data.budgetTier) : 'Standard';

  if (!name || name.length < 2) {
    errors.clientName = 'Please enter your name (minimum 2 characters).';
  } else if (name.length > 80) {
    errors.clientName = 'Name must be 80 characters or fewer.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!description || description.length < 10) {
    errors.description = 'Please describe your concept, characters, or requirements (at least 10 characters).';
  } else if (description.length > 2000) {
    errors.description = 'Project description must not exceed 2000 characters.';
  }

  if (data.csrfToken && !verifyCsrfToken(data.csrfToken)) {
    errors.csrf = 'Security validation failed (CSRF mismatch). Please refresh and try again.';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitizedData: isValid
      ? {
          clientName: name,
          email,
          description,
          projectType,
          budgetTier,
          deadline: data.deadline ? sanitizeInput(data.deadline) : undefined,
          csrfToken: data.csrfToken,
        }
      : undefined,
  };
}
