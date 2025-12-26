import './Card.css';

export default function Card({
  children,
  title,
  className = '',
  onClick,
  hoverable = false
}) {
  return (
    <div
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
