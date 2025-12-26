import { useState } from 'react';
import { Input, Select, Textarea, Button } from '../common';
import './ProjectForm.css';

const PLATFORM_OPTIONS = [
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'macOS' },
  { value: 'linux', label: 'Linux' },
  { value: 'cross-platform', label: 'Cross-Platform' }
];

const FRAMEWORK_OPTIONS = [
  { value: 'electron', label: 'Electron' },
  { value: 'tauri', label: 'Tauri' },
  { value: 'qt', label: 'Qt' },
  { value: 'wpf', label: 'WPF (.NET)' },
  { value: 'swiftui', label: 'SwiftUI (macOS)' }
];

export default function DesktopAppForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    projectName: '',
    platform: '',
    framework: '',
    description: '',
    features: '',
    fileTypes: '',
    systemIntegration: ''
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
      <h3>Desktop App Details</h3>

      <Input
        label="Project Name"
        value={formData.projectName}
        onChange={handleChange('projectName')}
        placeholder="e.g., NoteKeeper"
        required
      />

      <div className="form-row">
        <Select
          label="Target Platform"
          value={formData.platform}
          onChange={handleChange('platform')}
          options={PLATFORM_OPTIONS}
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

      <Textarea
        label="App Description"
        value={formData.description}
        onChange={handleChange('description')}
        placeholder="Describe what your desktop app does..."
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

      <Input
        label="File Types (if applicable)"
        value={formData.fileTypes}
        onChange={handleChange('fileTypes')}
        placeholder="e.g., .txt, .md, .json"
        helperText="File extensions the app will work with"
      />

      <Textarea
        label="System Integration"
        value={formData.systemIntegration}
        onChange={handleChange('systemIntegration')}
        placeholder="e.g., System tray, File associations, Keyboard shortcuts..."
        rows={3}
      />

      <Button type="submit" variant="primary" size="large">
        Generate Prompt
      </Button>
    </form>
  );
}
