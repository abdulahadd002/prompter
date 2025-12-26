import './Textarea.css';

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  rows = 4,
  className = ''
}) {
  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`textarea ${error ? 'textarea-error' : ''}`}
      />
      {helperText && <span className="textarea-helper">{helperText}</span>}
      {error && <span className="textarea-error-message">{error}</span>}
    </div>
  );
}
