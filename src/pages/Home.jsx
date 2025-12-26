import { Link } from 'react-router-dom';
import { Button, Card } from '../components/common';
import './Home.css';

const FEATURES = [
  {
    icon: '🎯',
    title: 'Project-Specific',
    description: 'Generate prompts tailored to mobile, web, API, or desktop projects',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: '📋',
    title: 'Structured Output',
    description: 'Get well-organized prompts that cover all essential aspects',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: '💾',
    title: 'Save & Reuse',
    description: 'Save your prompts to history and reuse them anytime',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: '⚡',
    title: 'Quick & Easy',
    description: 'Simple form-based interface for fast prompt generation',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }
];

const PROJECT_TYPES = [
  { icon: '📱', label: 'Mobile Apps', delay: 0 },
  { icon: '🌐', label: 'Web Apps', delay: 0.1 },
  { icon: '⚡', label: 'APIs & Backends', delay: 0.2 },
  { icon: '💻', label: 'Desktop Apps', delay: 0.3 }
];

export default function Home() {
  return (
    <div className="home">
      {/* Animated background elements */}
      <div className="home-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <section className="hero">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          AI-Powered Prompt Generator
        </div>
        <h1 className="hero-title">
          Generate Structured Prompts
          <span className="hero-title-highlight"> for Your Projects</span>
        </h1>
        <p className="hero-subtitle">
          Create comprehensive, well-organized prompts for AI assistants
          based on your project type and requirements
        </p>
        <div className="hero-cta">
          <Link to="/builder">
            <Button variant="primary" size="large">
              Start Building
              <span className="btn-arrow">→</span>
            </Button>
          </Link>
          <Link to="/history" className="hero-secondary-link">
            View History
          </Link>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">
          <span className="section-title-text">Features</span>
        </h2>
        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              hoverable
              className={`feature-card stagger-${index + 1}`}
            >
              <div
                className="feature-icon-wrapper"
                style={{ background: feature.gradient }}
              >
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="project-types">
        <h2 className="section-title">
          <span className="section-title-text">Supported Project Types</span>
        </h2>
        <div className="types-list">
          {PROJECT_TYPES.map((type, index) => (
            <div
              key={index}
              className="type-item"
              style={{ animationDelay: `${type.delay}s` }}
            >
              <span className="type-icon">{type.icon}</span>
              <span className="type-label">{type.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
