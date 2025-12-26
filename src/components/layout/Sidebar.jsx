import './Sidebar.css';

export default function Sidebar({ children, className = '' }) {
  return (
    <aside className={`sidebar ${className}`}>
      {children}
    </aside>
  );
}
