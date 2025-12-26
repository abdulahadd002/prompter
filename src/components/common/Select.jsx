import './Select.css';

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  error,
  className = ''
}) {
  return (
    <div className={`select-wrapper ${className}`}>
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`select ${error ? 'select-error' : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error-message">{error}</span>}
    </div>
  );
}
