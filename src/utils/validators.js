export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateMinLength(value, minLength, fieldName) {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
}

export function validateMaxLength(value, maxLength, fieldName) {
  if (value && value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`;
  }
  return null;
}

export function validateProjectName(name) {
  if (!name || !name.trim()) {
    return 'Project name is required';
  }

  if (name.length < 2) {
    return 'Project name must be at least 2 characters';
  }

  if (name.length > 50) {
    return 'Project name must be no more than 50 characters';
  }

  if (!/^[a-zA-Z0-9][a-zA-Z0-9-_ ]*$/.test(name)) {
    return 'Project name must start with a letter or number';
  }

  return null;
}

export function validateForm(formData, requiredFields) {
  const errors = {};

  requiredFields.forEach((field) => {
    const error = validateRequired(formData[field], field);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
