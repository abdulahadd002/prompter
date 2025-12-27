export const mobileAppTemplate = (data) => {
  const { projectName, platform, framework, description, features, targetAudience, designStyle } =
    data;

  const platformLabel =
    {
      ios: 'iOS',
      android: 'Android',
      both: 'iOS and Android'
    }[platform] || platform;

  const frameworkLabel =
    {
      'react-native': 'React Native',
      flutter: 'Flutter',
      swift: 'Swift (Native iOS)',
      kotlin: 'Kotlin (Native Android)'
    }[framework] || framework;

  const featuresList = features
    ? features
        .split('\n')
        .filter((f) => f.trim())
        .map((f) => `- ${f.trim()}`)
        .join('\n')
    : '';

  return `# Mobile App Development Prompt

## Project Overview
**Project Name:** ${projectName}
**Platform:** ${platformLabel}
**Framework:** ${frameworkLabel}

## Description
${description}

## Target Audience
${targetAudience || 'General users'}

## Design Style
${designStyle || 'Modern and intuitive'}

## Key Features
${featuresList || '- Core functionality to be defined'}

## Technical Requirements

### Architecture
- Follow ${frameworkLabel} best practices and conventions
- Implement clean architecture with separation of concerns
- Use appropriate state management solution
- Ensure proper error handling and loading states

### UI/UX
- Responsive design for various screen sizes
- Smooth animations and transitions
- Accessible components following platform guidelines
- ${platform === 'ios' || platform === 'both' ? 'Follow iOS Human Interface Guidelines' : ''}
- ${platform === 'android' || platform === 'both' ? 'Follow Material Design guidelines' : ''}

### Performance
- Optimize for fast startup time
- Efficient memory management
- Minimize battery consumption
- Implement proper caching strategies

### Testing
- Unit tests for business logic
- Widget/Component tests for UI
- Integration tests for critical flows

## Deliverables
1. Complete source code with documentation
2. Build configuration for ${platformLabel}
3. README with setup instructions
4. Basic test coverage

## Additional Notes
- Ensure the app works offline where applicable
- Implement proper security measures for user data
- Follow platform-specific App Store guidelines
`;
};
