export const desktopAppTemplate = (data) => {
  const { projectName, platform, framework, description, features, fileTypes, systemIntegration } =
    data;

  const platformLabel =
    {
      windows: 'Windows',
      macos: 'macOS',
      linux: 'Linux',
      'cross-platform': 'Cross-Platform (Windows, macOS, Linux)'
    }[platform] || platform;

  const frameworkLabel =
    {
      electron: 'Electron',
      tauri: 'Tauri',
      qt: 'Qt',
      wpf: 'WPF (.NET)',
      swiftui: 'SwiftUI'
    }[framework] || framework;

  const featuresList = features
    ? features
        .split('\n')
        .filter((f) => f.trim())
        .map((f) => `- ${f.trim()}`)
        .join('\n')
    : '';

  const integrationList = systemIntegration
    ? systemIntegration
        .split('\n')
        .filter((i) => i.trim())
        .map((i) => `- ${i.trim()}`)
        .join('\n')
    : '';

  return `# Desktop Application Development Prompt

## Project Overview
**Project Name:** ${projectName}
**Target Platform:** ${platformLabel}
**Framework:** ${frameworkLabel}

## Description
${description}

## Key Features
${featuresList || '- Core functionality to be defined'}

${
  fileTypes
    ? `## Supported File Types
${fileTypes
  .split(',')
  .map((ft) => `- ${ft.trim()}`)
  .join('\n')}
`
    : ''
}

## System Integration
${integrationList || '- Standard desktop application integrations'}

## Technical Requirements

### Application Architecture
- ${frameworkLabel} application structure
- Clean separation of UI and business logic
- Proper state management
- Event-driven architecture where appropriate

### User Interface
- Native look and feel for ${platformLabel}
- Responsive window sizing
- Keyboard shortcuts and accessibility
- Dark/Light mode support
- High DPI display support

### File System Operations
${
  fileTypes
    ? `- File operations for ${fileTypes}
- File association registration
- Recent files tracking
- Auto-save functionality`
    : '- Standard file operations as needed'
}

### System Integration
- ${platform === 'cross-platform' ? 'Cross-platform compatible integrations' : `${platformLabel}-specific integrations`}
- System tray support (if applicable)
- Native notifications
- Clipboard operations
- Drag and drop support

### Performance
- Fast application startup
- Efficient memory usage
- Smooth UI rendering
- Background task handling

${
  framework === 'electron' || framework === 'tauri'
    ? `### Web Technologies Integration
- Modern JavaScript/TypeScript
- ${framework === 'electron' ? 'Node.js' : 'Rust'} backend integration
- IPC communication between main and renderer
- Security best practices for ${framework}
`
    : ''
}

### Security
- Secure data storage
- Safe file operations
- Input validation
- ${framework === 'electron' ? 'Context isolation and sandbox mode' : 'Platform security best practices'}

### Updates
- Auto-update mechanism
- Version checking
- Graceful update installation

### Distribution
${platform === 'windows' || platform === 'cross-platform' ? '- Windows: MSI/EXE installer, optional Microsoft Store' : ''}
${platform === 'macos' || platform === 'cross-platform' ? '- macOS: DMG or PKG installer, optional Mac App Store' : ''}
${platform === 'linux' || platform === 'cross-platform' ? '- Linux: AppImage, Snap, or Flatpak' : ''}
- Code signing for distribution
- Installation and uninstallation handling

### Testing
- Unit tests for core functionality
- UI automation tests
- Cross-platform testing (if applicable)

## Deliverables
1. Complete source code with documentation
2. Build configuration for ${platformLabel}
3. Installer/package for distribution
4. README with development setup
5. User documentation

## Platform-Specific Considerations
${platform === 'windows' || platform === 'cross-platform' ? '- Windows: Registry integration, Windows-specific UX patterns' : ''}
${platform === 'macos' || platform === 'cross-platform' ? '- macOS: Menu bar integration, Apple Human Interface Guidelines' : ''}
${platform === 'linux' || platform === 'cross-platform' ? '- Linux: Desktop environment compatibility, freedesktop.org standards' : ''}
`;
};
