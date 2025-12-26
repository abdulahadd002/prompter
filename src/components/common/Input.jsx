import './Input.css';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  className = ''
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {helperText && <span className="input-helper">{helperText}</span>}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}
