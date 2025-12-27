import PropTypes from 'prop-types';
import './Textarea.css';

export default function Textarea({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  rows = 4,
  className = '',
  id,
  name
}) {
  const textareaId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
          {required && (
            <span className="textarea-required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`textarea ${error ? 'textarea-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
      />
      {helperText && (
        <span id={`${textareaId}-helper`} className="textarea-helper">
          {helperText}
        </span>
      )}
      {error && (
        <span id={`${textareaId}-error`} className="textarea-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

Textarea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

Textarea.defaultProps = {
  required: false,
  disabled: false,
  rows: 4,
  className: ''
};
