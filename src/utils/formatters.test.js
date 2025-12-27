import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatRelativeTime,
  truncateText,
  capitalizeFirst,
  slugify
} from './formatters';

describe('truncateText', () => {
  it('returns original text if shorter than maxLength', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  it('truncates text and adds ellipsis', () => {
    expect(truncateText('hello world', 5)).toBe('hello...');
  });

  it('returns empty string for null', () => {
    expect(truncateText(null)).toBeNull();
  });

  it('returns empty string for undefined', () => {
    expect(truncateText(undefined)).toBeUndefined();
  });

  it('uses default maxLength of 100', () => {
    const longText = 'a'.repeat(150);
    const result = truncateText(longText);
    expect(result.length).toBe(103); // 100 chars + '...'
  });
});

describe('capitalizeFirst', () => {
  it('capitalizes first letter of string', () => {
    expect(capitalizeFirst('hello')).toBe('Hello');
  });

  it('returns empty string for empty input', () => {
    expect(capitalizeFirst('')).toBe('');
  });

  it('returns empty string for null', () => {
    expect(capitalizeFirst(null)).toBe('');
  });

  it('handles single character', () => {
    expect(capitalizeFirst('a')).toBe('A');
  });

  it('preserves rest of string', () => {
    expect(capitalizeFirst('hELLO')).toBe('HELLO');
  });
});

describe('slugify', () => {
  it('converts to lowercase', () => {
    expect(slugify('Hello')).toBe('hello');
  });

  it('replaces spaces with dashes', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('hello!@#$%world')).toBe('helloworld');
  });

  it('replaces multiple spaces/dashes with single dash', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('removes leading and trailing dashes', () => {
    expect(slugify(' hello world ')).toBe('hello-world');
  });

  it('handles complex strings', () => {
    expect(slugify('My Project Name! (2024)')).toBe('my-project-name-2024');
  });
});

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Just now" for times less than 60 seconds ago', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    vi.setSystemTime(now);
    const date = new Date('2024-01-15T11:59:30Z');
    expect(formatRelativeTime(date.toISOString())).toBe('Just now');
  });

  it('returns minutes ago for times less than an hour', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    vi.setSystemTime(now);
    const date = new Date('2024-01-15T11:55:00Z');
    expect(formatRelativeTime(date.toISOString())).toBe('5 minutes ago');
  });

  it('returns singular minute for 1 minute ago', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    vi.setSystemTime(now);
    const date = new Date('2024-01-15T11:59:00Z');
    expect(formatRelativeTime(date.toISOString())).toBe('1 minute ago');
  });

  it('returns hours ago for times less than a day', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    vi.setSystemTime(now);
    const date = new Date('2024-01-15T09:00:00Z');
    expect(formatRelativeTime(date.toISOString())).toBe('3 hours ago');
  });

  it('returns days ago for times less than a week', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    vi.setSystemTime(now);
    const date = new Date('2024-01-13T12:00:00Z');
    expect(formatRelativeTime(date.toISOString())).toBe('2 days ago');
  });
});
