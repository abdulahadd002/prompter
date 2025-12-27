import { useState, useCallback } from 'react';
import { validateRequired, validateProjectName, validateMinLength } from '../utils/validators';

export function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, value) => {
      const rules = validationRules[name];
      if (!rules) return null;

      for (const rule of rules) {
        let error = null;

        if (rule.type === 'required' && rule.enabled) {
          error = validateRequired(value, rule.message || name);
        } else if (rule.type === 'projectName') {
          error = validateProjectName(value);
        } else if (rule.type === 'minLength') {
          error = validateMinLength(value, rule.length, rule.message || name);
        } else if (rule.type === 'custom' && rule.validate) {
          error = rule.validate(value);
        }

        if (error) return error;
      }

      return null;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (name) => (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setValues((prev) => ({ ...prev, [name]: value }));

      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name) => () => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [values, validateField]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return isValid;
  }, [values, validationRules, validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    resetForm,
    setFieldValue,
    setValues
  };
}
