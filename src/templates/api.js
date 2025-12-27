export const apiTemplate = (data) => {
  const {
    projectName,
    apiType,
    language,
    database,
    description,
    endpoints,
    authentication,
    features
  } = data;

  const apiTypeLabel =
    {
      rest: 'REST API',
      graphql: 'GraphQL API',
      grpc: 'gRPC Service'
    }[apiType] || apiType;

  const languageLabel =
    {
      nodejs: 'Node.js (Express/Fastify)',
      python: 'Python (FastAPI/Django)',
      go: 'Go',
      rust: 'Rust',
      java: 'Java (Spring Boot)',
      csharp: 'C# (.NET)'
    }[language] || language;

  const databaseLabel =
    {
      postgresql: 'PostgreSQL',
      mysql: 'MySQL',
      mongodb: 'MongoDB',
      redis: 'Redis',
      sqlite: 'SQLite'
    }[database] || database;

  const endpointsList = endpoints
    ? endpoints
        .split('\n')
        .filter((e) => e.trim())
        .map((e) => `- ${e.trim()}`)
        .join('\n')
    : '';

  const featuresList = features
    ? features
        .split('\n')
        .filter((f) => f.trim())
        .map((f) => `- ${f.trim()}`)
        .join('\n')
    : '';

  return `# API / Backend Development Prompt

## Project Overview
**Project Name:** ${projectName}
**API Type:** ${apiTypeLabel}
**Language/Framework:** ${languageLabel}
${database ? `**Database:** ${databaseLabel}` : ''}
${authentication ? `**Authentication:** ${authentication}` : ''}

## Description
${description}

## API Endpoints/Operations
${endpointsList || '- Endpoints to be defined based on requirements'}

## Additional Features
${featuresList || '- Standard API features'}

## Technical Requirements

### Architecture
- Clean/Layered architecture
- Separation of concerns (controllers, services, repositories)
- Dependency injection where applicable
- Configuration management for different environments

### ${apiType === 'rest' ? 'REST API Design' : apiType === 'graphql' ? 'GraphQL Schema Design' : 'gRPC Service Design'}
${
  apiType === 'rest'
    ? `- RESTful resource naming conventions
- Proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Consistent response format
- Pagination for list endpoints
- Filtering and sorting capabilities`
    : ''
}
${
  apiType === 'graphql'
    ? `- Well-structured schema with types and resolvers
- Efficient query resolution
- Mutation handling
- Subscription support if needed
- N+1 query prevention`
    : ''
}
${
  apiType === 'grpc'
    ? `- Protocol buffer definitions
- Service method implementations
- Streaming support where needed
- Error handling with proper status codes`
    : ''
}

${
  authentication
    ? `### Authentication & Authorization
- ${authentication} implementation
- Secure token handling
- Role-based access control
- Session/token expiration handling
`
    : ''
}

${
  database
    ? `### Database
- ${databaseLabel} connection and pooling
- Migrations for schema changes
- Query optimization
- Data validation at database level
- Backup and recovery considerations
`
    : ''
}

### Security
- Input validation and sanitization
- SQL/NoSQL injection prevention
- Rate limiting
- CORS configuration
- Secrets management
- HTTPS enforcement

### Error Handling
- Consistent error response format
- Proper HTTP status codes
- Detailed error logging
- User-friendly error messages

### Logging & Monitoring
- Structured logging
- Request/response logging
- Performance metrics
- Health check endpoints

### Documentation
${apiType === 'rest' ? '- OpenAPI/Swagger specification' : ''}
${apiType === 'graphql' ? '- GraphQL schema documentation' : ''}
${apiType === 'grpc' ? '- Proto file documentation' : ''}
- Endpoint descriptions and examples
- Authentication documentation

### Testing
- Unit tests for services and utilities
- Integration tests for API endpoints
- Load testing for performance validation

## Deliverables
1. Complete source code with inline documentation
2. API documentation (${apiType === 'rest' ? 'OpenAPI/Swagger' : apiType === 'graphql' ? 'GraphQL Playground' : 'Proto files'})
3. Database migration scripts
4. Docker configuration for containerization
5. README with setup and deployment instructions
6. Environment configuration templates

## Performance Requirements
- Response time under 200ms for simple queries
- Support for concurrent requests
- Efficient database query patterns
- Caching strategy for frequently accessed data
`;
};
