import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">P</span>
          <span className="logo-text">Prompter</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/builder" className="nav-link">Builder</Link>
          <Link to="/history" className="nav-link">History</Link>
        </nav>
      </div>
    </header>
  );
}
