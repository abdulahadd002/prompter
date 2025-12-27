export const webAppTemplate = (data) => {
  const {
    projectName,
    appType,
    framework,
    styling,
    description,
    features,
    pages,
    authentication,
    database
  } = data;

  const appTypeLabel =
    {
      spa: 'Single Page Application (SPA)',
      ssr: 'Server-Side Rendered Application',
      static: 'Static Site',
      fullstack: 'Full-Stack Application'
    }[appType] || appType;

  const frameworkLabel =
    {
      react: 'React',
      vue: 'Vue.js',
      angular: 'Angular',
      nextjs: 'Next.js',
      nuxt: 'Nuxt.js',
      svelte: 'Svelte/SvelteKit'
    }[framework] || framework;

  const stylingLabel =
    {
      tailwind: 'Tailwind CSS',
      'css-modules': 'CSS Modules',
      'styled-components': 'Styled Components',
      sass: 'Sass/SCSS',
      vanilla: 'Vanilla CSS'
    }[styling] || styling;

  const featuresList = features
    ? features
        .split('\n')
        .filter((f) => f.trim())
        .map((f) => `- ${f.trim()}`)
        .join('\n')
    : '';

  const pagesList = pages
    ? pages
        .split('\n')
        .filter((p) => p.trim())
        .map((p) => `- ${p.trim()}`)
        .join('\n')
    : '';

  return `# Web Application Development Prompt

## Project Overview
**Project Name:** ${projectName}
**App Type:** ${appTypeLabel}
**Framework:** ${frameworkLabel}
**Styling:** ${stylingLabel || 'To be determined'}
${database ? `**Database:** ${database}` : ''}
${authentication ? '**Authentication:** Required' : ''}

## Description
${description}

## Key Features
${featuresList || '- Core functionality to be defined'}

## Pages/Routes
${pagesList || '- Home page\n- Additional pages to be defined'}

## Technical Requirements

### Frontend Architecture
- Use ${frameworkLabel} with modern best practices
- Implement component-based architecture
- Proper state management (Context API, Redux, Zustand, or framework-specific)
- Type safety with TypeScript recommended
- ${stylingLabel ? `Style components using ${stylingLabel}` : 'Implement consistent styling approach'}

### Responsive Design
- Mobile-first approach
- Breakpoints for mobile, tablet, and desktop
- Touch-friendly interactive elements
- Proper viewport handling

${
  authentication
    ? `### Authentication
- Secure user authentication flow
- Login/Register pages
- Password reset functionality
- Session management
- Protected routes
`
    : ''
}

${
  database
    ? `### Database & API
- ${database} database integration
- RESTful API or GraphQL endpoints
- Data validation
- Error handling
`
    : ''
}

### Performance
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Core Web Vitals optimization

### SEO ${appType === 'spa' ? '(for SPA)' : ''}
- Proper meta tags
- Semantic HTML structure
- ${appType === 'ssr' || appType === 'static' ? 'Server-side rendering benefits' : 'Consider SSR for critical pages'}
- Sitemap and robots.txt

### Testing
- Unit tests for components and utilities
- Integration tests for user flows
- E2E tests for critical paths

## Deliverables
1. Complete source code with documentation
2. Build and deployment configuration
3. README with setup and development instructions
4. Environment configuration examples

## Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Responsive from 320px to 4K displays
`;
};
