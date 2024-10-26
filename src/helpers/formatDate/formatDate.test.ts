import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should return "Today" when the input date is today', () => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    expect(formatDate(dateString)).toBe('Today');
  });

  it('should return the correct day of the week for a past date', () => {
    const dateString = '2023-01-01';
    expect(formatDate(dateString)).toBe('Sun');
  });

  it('should return the correct day of the week for a future date', () => {
    const dateString = '2025-12-25';
    expect(formatDate(dateString)).toBe('Thu');
  });

  it('should handle invalid date strings gracefully', () => {
    const dateString = 'invalid-date';
    expect(formatDate(dateString)).toBe('invalidDate');
  });
});