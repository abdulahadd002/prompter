import { Card } from '../common';
import './ProjectTypeSelector.css';

const PROJECT_TYPES = [
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'iOS, Android, React Native, Flutter',
    icon: '📱'
  },
  {
    id: 'web',
    name: 'Web App',
    description: 'Frontend, Full-stack, SPA, SSR',
    icon: '🌐'
  },
  {
    id: 'api',
    name: 'API / Backend',
    description: 'REST, GraphQL, Microservices',
    icon: '⚡'
  },
  {
    id: 'desktop',
    name: 'Desktop App',
    description: 'Electron, Tauri, Native',
    icon: '💻'
  }
];

export default function ProjectTypeSelector({ onSelect }) {
  return (
    <div className="project-type-selector">
      <h2>Select Project Type</h2>
      <p className="selector-subtitle">
        Choose the type of project you want to generate a prompt for
      </p>
      <div className="project-type-grid">
        {PROJECT_TYPES.map((type) => (
          <Card
            key={type.id}
            hoverable
            onClick={() => onSelect(type.id)}
            className="project-type-card"
          >
            <span className="project-type-icon">{type.icon}</span>
            <h3 className="project-type-name">{type.name}</h3>
            <p className="project-type-description">{type.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
