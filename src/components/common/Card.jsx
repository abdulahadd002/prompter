import PropTypes from 'prop-types';
import './Card.css';

export default function Card({ children, title, className = '', onClick, hoverable = false }) {
  return (
    <div
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
    >
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool
};

Card.defaultProps = {
  className: '',
  hoverable: false
};
