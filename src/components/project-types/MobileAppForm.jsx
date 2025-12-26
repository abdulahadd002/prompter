import { useState } from 'react';
import { Input, Select, Textarea, Button } from '../common';
import './ProjectForm.css';

const PLATFORM_OPTIONS = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'both', label: 'iOS & Android' }
];

const FRAMEWORK_OPTIONS = [
  { value: 'react-native', label: 'React Native' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'swift', label: 'Swift (Native iOS)' },
  { value: 'kotlin', label: 'Kotlin (Native Android)' }
];

export default function MobileAppForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    projectName: '',
    platform: '',
    framework: '',
    description: '',
    features: '',
    targetAudience: '',
    designStyle: ''
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
      <h3>Mobile App Details</h3>

      <Input
        label="Project Name"
        value={formData.projectName}
        onChange={handleChange('projectName')}
        placeholder="e.g., FitTracker"
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
        placeholder="Describe what your app does and its main purpose..."
        required
        rows={3}
      />

      <Textarea
        label="Key Features"
        value={formData.features}
        onChange={handleChange('features')}
        placeholder="List the main features (one per line)..."
        helperText="e.g., User authentication, Push notifications, Offline support"
        rows={4}
      />

      <Input
        label="Target Audience"
        value={formData.targetAudience}
        onChange={handleChange('targetAudience')}
        placeholder="e.g., Fitness enthusiasts, ages 18-35"
      />

      <Input
        label="Design Style"
        value={formData.designStyle}
        onChange={handleChange('designStyle')}
        placeholder="e.g., Minimalist, Material Design, iOS Human Interface"
      />

      <Button type="submit" variant="primary" size="large">
        Generate Prompt
      </Button>
    </form>
  );
}
