import { mobileAppTemplate } from '../templates/mobileApp';
import { webAppTemplate } from '../templates/webApp';
import { apiTemplate } from '../templates/api';
import { desktopAppTemplate } from '../templates/desktopApp';

const TEMPLATE_MAP = {
  mobile: mobileAppTemplate,
  web: webAppTemplate,
  api: apiTemplate,
  desktop: desktopAppTemplate
};

export function generatePrompt(projectType, formData) {
  const template = TEMPLATE_MAP[projectType];

  if (!template) {
    return 'Invalid project type selected.';
  }

  if (!formData || Object.keys(formData).length === 0) {
    return 'No form data provided.';
  }

  try {
    return template(formData);
  } catch (error) {
    console.error('Error generating prompt:', error);
    return 'Error generating prompt. Please check your input.';
  }
}

export function getProjectTypeLabel(type) {
  const labels = {
    mobile: 'Mobile App',
    web: 'Web App',
    api: 'API / Backend',
    desktop: 'Desktop App'
  };
  return labels[type] || type;
}
