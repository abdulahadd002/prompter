import PropTypes from 'prop-types';
import { Input, Select, Textarea, Button } from '../common';
import { useFormValidation } from '../../hooks/useFormValidation';
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

const initialValues = {
  projectName: '',
  appType: '',
  framework: '',
  styling: '',
  description: '',
  features: '',
  pages: '',
  authentication: false,
  database: ''
};

const validationRules = {
  projectName: [
    { type: 'required', enabled: true, message: 'Project Name' },
    { type: 'projectName' }
  ],
  appType: [{ type: 'required', enabled: true, message: 'App Type' }],
  framework: [{ type: 'required', enabled: true, message: 'Framework' }],
  description: [
    { type: 'required', enabled: true, message: 'Description' },
    { type: 'minLength', length: 10, message: 'Description' }
  ]
};

export default function WebAppForm({ onSubmit }) {
  const { values, errors, handleChange, handleBlur, validateAll } = useFormValidation(
    initialValues,
    validationRules
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      onSubmit(values);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit} noValidate>
      <h3>Web App Details</h3>

      <Input
        label="Project Name"
        name="projectName"
        value={values.projectName}
        onChange={handleChange('projectName')}
        onBlur={handleBlur('projectName')}
        placeholder="e.g., TaskBoard"
        required
        error={errors.projectName}
      />

      <div className="form-row">
        <Select
          label="App Type"
          name="appType"
          value={values.appType}
          onChange={handleChange('appType')}
          onBlur={handleBlur('appType')}
          options={APP_TYPE_OPTIONS}
          required
          error={errors.appType}
        />

        <Select
          label="Framework"
          name="framework"
          value={values.framework}
          onChange={handleChange('framework')}
          onBlur={handleBlur('framework')}
          options={FRAMEWORK_OPTIONS}
          required
          error={errors.framework}
        />
      </div>

      <Select
        label="Styling Approach"
        name="styling"
        value={values.styling}
        onChange={handleChange('styling')}
        options={STYLING_OPTIONS}
      />

      <Textarea
        label="App Description"
        name="description"
        value={values.description}
        onChange={handleChange('description')}
        onBlur={handleBlur('description')}
        placeholder="Describe what your web app does..."
        required
        rows={3}
        error={errors.description}
      />

      <Textarea
        label="Key Features"
        name="features"
        value={values.features}
        onChange={handleChange('features')}
        placeholder="List the main features (one per line)..."
        rows={4}
      />

      <Textarea
        label="Pages/Routes"
        name="pages"
        value={values.pages}
        onChange={handleChange('pages')}
        placeholder="List the main pages (one per line)..."
        helperText="e.g., Home, Dashboard, Profile, Settings"
        rows={3}
      />

      <Input
        label="Database (if any)"
        name="database"
        value={values.database}
        onChange={handleChange('database')}
        placeholder="e.g., PostgreSQL, MongoDB, Firebase"
      />

      <div className="form-checkbox">
        <input
          type="checkbox"
          id="authentication"
          checked={values.authentication}
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

WebAppForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
