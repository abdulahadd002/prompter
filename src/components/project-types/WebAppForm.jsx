import { useState } from 'react';
import { Input, Select, Textarea, Button } from '../common';
import './ProjectForm.css';

const APP_TYPE_OPTIONS = [
  { value: 'spa', label: 'Single Page Application (SPA)' },
  { value: 'ssr', label: 'Server-Side Rendered (SSR)' },
  { value: 'static', label: 'Static Site' },
  { value: 'fullstack', label: 'Full-Stack Application' }
];

const FRAMEWORK_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'svelte', label: 'Svelte/SvelteKit' }
];

const STYLING_OPTIONS = [
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'css-modules', label: 'CSS Modules' },
  { value: 'styled-components', label: 'Styled Components' },
  { value: 'sass', label: 'Sass/SCSS' },
  { value: 'vanilla', label: 'Vanilla CSS' }
];

export default function WebAppForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    projectName: '',
    appType: '',
    framework: '',
    styling: '',
    description: '',
    features: '',
    pages: '',
    authentication: false,
    database: ''
  });

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>Web App Details</h3>

      <Input
        label="Project Name"
        value={formData.projectName}
        onChange={handleChange('projectName')}
        placeholder="e.g., TaskBoard"
        required
      />

      <div className="form-row">
        <Select
          label="App Type"
          value={formData.appType}
          onChange={handleChange('appType')}
          options={APP_TYPE_OPTIONS}
          required
        />

        <Select
          label="Framework"
          value={formData.framework}
          onChange={handleChange('framework')}
          options={FRAMEWORK_OPTIONS}
          required
        />
      </div>

      <Select
        label="Styling Approach"
        value={formData.styling}
        onChange={handleChange('styling')}
        options={STYLING_OPTIONS}
      />

      <Textarea
        label="App Description"
        value={formData.description}
        onChange={handleChange('description')}
        placeholder="Describe what your web app does..."
        required
        rows={3}
      />

      <Textarea
        label="Key Features"
        value={formData.features}
        onChange={handleChange('features')}
        placeholder="List the main features (one per line)..."
        rows={4}
      />

      <Textarea
        label="Pages/Routes"
        value={formData.pages}
        onChange={handleChange('pages')}
        placeholder="List the main pages (one per line)..."
        helperText="e.g., Home, Dashboard, Profile, Settings"
        rows={3}
      />

      <Input
        label="Database (if any)"
        value={formData.database}
        onChange={handleChange('database')}
        placeholder="e.g., PostgreSQL, MongoDB, Firebase"
      />

      <div className="form-checkbox">
        <input
          type="checkbox"
          id="authentication"
          checked={formData.authentication}
          onChange={handleChange('authentication')}
        />
        <label htmlFor="authentication">Requires user authentication</label>
      </div>

      <Button type="submit" variant="primary" size="large">
        Generate Prompt
      </Button>
    </form>
  );
}
