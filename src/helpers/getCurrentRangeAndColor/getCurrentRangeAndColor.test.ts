import { describe, it, expect, vi, afterEach } from 'vitest';
import { getBackgroundColor } from './getCurrentRangeAndColor';

describe('getBackgroundColor', () => {
  const originalDate = globalThis.Date;

  afterEach(() => {
    globalThis.Date = originalDate;
  });

  it('should return the correct color for the "05-11" range', () => {
    globalThis.Date = vi.fn(() => new originalDate('2024-10-10T06:00:00Z')) as unknown as DateConstructor;
    expect(getBackgroundColor()).toBe('linear-gradient(180deg, #81C5E6 0%, #DC927F 100%)');
  });

  it('should return the correct color for the "11-17" range', () => {
    globalThis.Date = vi.fn(() => new originalDate('2024-10-10T12:00:00Z')) as unknown as DateConstructor;
    expect(getBackgroundColor()).toBe('linear-gradient(180deg, #4982AD 0%, rgba(144, 187, 216, 0.5) 100%)');
  });

  it('should return the correct color for the "17-21" range', () => {
    globalThis.Date = vi.fn(() => new originalDate('2024-10-10T18:00:00Z')) as unknown as DateConstructor;
    expect(getBackgroundColor()).toBe('linear-gradient(180deg, #6F6D8C 0%, rgba(188, 97, 90, 0.5) 100%)');
  });

  it('should return the correct color for the "21-05" range', () => {
    globalThis.Date = vi.fn(() => new originalDate('2024-10-10T22:00:00Z')) as unknown as DateConstructor;
    expect(getBackgroundColor()).toBe('linear-gradient(180deg, #011E33 0%, rgba(61, 53, 81, 0.8) 100%)');
  });
});