# Prompter

AI-Powered Prompt Generator for development projects. Create structured, comprehensive prompts for AI assistants based on your project type and requirements.

## Features

- **Multiple Project Types**: Generate prompts for Mobile Apps, Web Apps, APIs/Backends, and Desktop Applications
- **Structured Templates**: Each project type has tailored prompts covering architecture, features, and best practices
- **Prompt History**: Save, edit, and manage your generated prompts
- **Export Options**: Copy to clipboard or export as Markdown files
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/prompter.git
cd prompter

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Button, Card, Input, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── prompt/          # Prompt-specific components
│   └── project-types/   # Form components for each project type
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── styles/              # Global styles and CSS variables
├── templates/           # Prompt template generators
└── utils/               # Utility functions
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run tests |

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS Variables** - Theming and design tokens

## Usage

1. **Select Project Type**: Choose from Mobile, Web, API, or Desktop
2. **Fill in Details**: Complete the project-specific form
3. **Generate Prompt**: Review the generated prompt
4. **Save or Export**: Save to history, copy to clipboard, or export as Markdown

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details
