import { useState } from 'react';
import { Input, Select, Textarea, Button } from '../common';
import './ProjectForm.css';

const API_TYPE_OPTIONS = [
  { value: 'rest', label: 'REST API' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'grpc', label: 'gRPC' }
];

const LANGUAGE_OPTIONS = [
  { value: 'nodejs', label: 'Node.js (Express/Fastify)' },
  { value: 'python', label: 'Python (FastAPI/Django)' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'java', label: 'Java (Spring Boot)' },
  { value: 'csharp', label: 'C# (.NET)' }
];

const DATABASE_OPTIONS = [
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'redis', label: 'Redis' },
  { value: 'sqlite', label: 'SQLite' }
];

export default function ApiForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    projectName: '',
    apiType: '',
    language: '',
    database: '',
    description: '',
    endpoints: '',
    authentication: '',
    features: ''
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>API / Backend Details</h3>

      <Input
        label="Project Name"
        value={formData.projectName}
        onChange={handleChange('projectName')}
        placeholder="e.g., user-service"
        required
      />

      <div className="form-row">
        <Select
          label="API Type"
          value={formData.apiType}
          onChange={handleChange('apiType')}
          options={API_TYPE_OPTIONS}
          required
        />

        <Select
          label="Language/Framework"
          value={formData.language}
          onChange={handleChange('language')}
          options={LANGUAGE_OPTIONS}
          required
        />
      </div>

      <Select
        label="Database"
        value={formData.database}
        onChange={handleChange('database')}
        options={DATABASE_OPTIONS}
      />

      <Textarea
        label="API Description"
        value={formData.description}
        onChange={handleChange('description')}
        placeholder="Describe the purpose of this API..."
        required
        rows={3}
      />

      <Textarea
        label="Main Endpoints/Operations"
        value={formData.endpoints}
        onChange={handleChange('endpoints')}
        placeholder="List the main endpoints (one per line)..."
        helperText="e.g., GET /users, POST /users, PUT /users/:id"
        rows={4}
      />

      <Input
        label="Authentication Method"
        value={formData.authentication}
        onChange={handleChange('authentication')}
        placeholder="e.g., JWT, OAuth2, API Key"
      />

      <Textarea
        label="Additional Features"
        value={formData.features}
        onChange={handleChange('features')}
        placeholder="e.g., Rate limiting, Caching, Logging..."
        rows={3}
      />

      <Button type="submit" variant="primary" size="large">
        Generate Prompt
      </Button>
    </form>
  );
}
