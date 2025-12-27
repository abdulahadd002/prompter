import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateProjectName,
  validateForm
} from './validators';

describe('validateRequired', () => {
  it('returns error for empty string', () => {
    expect(validateRequired('', 'Name')).toBe('Name is required');
  });

  it('returns error for whitespace-only string', () => {
    expect(validateRequired('   ', 'Name')).toBe('Name is required');
  });

  it('returns error for null', () => {
    expect(validateRequired(null, 'Name')).toBe('Name is required');
  });

  it('returns error for undefined', () => {
    expect(validateRequired(undefined, 'Name')).toBe('Name is required');
  });

  it('returns null for valid string', () => {
    expect(validateRequired('hello', 'Name')).toBeNull();
  });
});

describe('validateMinLength', () => {
  it('returns error when string is too short', () => {
    expect(validateMinLength('ab', 3, 'Name')).toBe('Name must be at least 3 characters');
  });

  it('returns null when string meets minimum length', () => {
    expect(validateMinLength('abc', 3, 'Name')).toBeNull();
  });

  it('returns null when string exceeds minimum length', () => {
    expect(validateMinLength('abcdef', 3, 'Name')).toBeNull();
  });

  it('returns null for empty value', () => {
    expect(validateMinLength('', 3, 'Name')).toBeNull();
  });
});

describe('validateMaxLength', () => {
  it('returns error when string exceeds max length', () => {
    expect(validateMaxLength('abcdef', 3, 'Name')).toBe('Name must be no more than 3 characters');
  });

  it('returns null when string meets max length', () => {
    expect(validateMaxLength('abc', 3, 'Name')).toBeNull();
  });

  it('returns null when string is under max length', () => {
    expect(validateMaxLength('ab', 3, 'Name')).toBeNull();
  });
});

describe('validateProjectName', () => {
  it('returns error for empty name', () => {
    expect(validateProjectName('')).toBe('Project name is required');
  });

  it('returns error for name too short', () => {
    expect(validateProjectName('a')).toBe('Project name must be at least 2 characters');
  });

  it('returns error for name too long', () => {
    const longName = 'a'.repeat(51);
    expect(validateProjectName(longName)).toBe('Project name must be no more than 50 characters');
  });

  it('returns error for name starting with special character', () => {
    expect(validateProjectName('-project')).toBe('Project name must start with a letter or number');
  });

  it('returns null for valid project name', () => {
    expect(validateProjectName('MyProject')).toBeNull();
  });

  it('returns null for name with numbers', () => {
    expect(validateProjectName('Project123')).toBeNull();
  });

  it('returns null for name with dashes', () => {
    expect(validateProjectName('my-project')).toBeNull();
  });

  it('returns null for name with spaces', () => {
    expect(validateProjectName('My Project')).toBeNull();
  });
});

describe('validateForm', () => {
  it('returns isValid true when all required fields are filled', () => {
    const formData = { name: 'Test', email: 'test@example.com' };
    const result = validateForm(formData, ['name', 'email']);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('returns isValid false when required fields are missing', () => {
    const formData = { name: '', email: 'test@example.com' };
    const result = validateForm(formData, ['name', 'email']);
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it('returns multiple errors when multiple fields are invalid', () => {
    const formData = { name: '', email: '' };
    const result = validateForm(formData, ['name', 'email']);
    expect(result.isValid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(2);
  });
});
