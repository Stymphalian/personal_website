# AGENTS.md - Repository Summary

## 🏗️ Project Overview

This repository contains a **Personal Website and AI Development Workflow System** built entirely using AI tools (Cursor/Claude) as a learning exercise. The project demonstrates modern web development practices while providing a structured framework for AI-assisted feature development.

### Repository Structure
```
/workspace/
├── personal-blog/          # React/TypeScript/Vite frontend application
├── tasks/                  # AI workflow PRD and task files
├── content/               # Markdown content (blog posts, projects)
├── apache/                # Apache server configuration
├── docker-compose.yaml    # Development environment setup
├── LLM.md                 # AI development workflow guide
└── Various AI workflow files (.md)
```

## 🎯 Primary Components

### 1. Personal Blog Website (`/personal-blog/`)
A modern React-based personal portfolio and blog website featuring:

**Tech Stack:**
- **Frontend**: React 19.1.1, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router DOM 7.8.2
- **Content**: React Markdown with syntax highlighting
- **Testing**: Jest, React Testing Library
- **Build**: Vite with TypeScript compilation

**Key Features:**
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Black/white theme with crystal blue accents
- 📝 Markdown-based blog posts and project showcases
- 🖼️ Project carousel with navigation
- 📊 Mermaid diagram support
- 🔍 SEO optimized
- ♿ Accessible design

**Main Pages:**
- **Home**: Professional headshot, bio, featured projects carousel
- **Projects**: Grid view of all projects with detailed individual pages
- **Blog**: List of blog posts with individual detail pages
- **Contact**: Professional contact information

### 2. AI Development Workflow System
A structured approach to AI-assisted feature development using markdown templates:

**Core Files:**
- [`LLM.md`](./LLM.md) - Complete AI development workflow guide
- [`create-prd.md`](./create-prd.md) - Product Requirements Document template
- [`generate-tasks.md`](./generate-tasks.md) - Task breakdown template
- [`process-task-list.md`](./process-task-list.md) - Implementation guide

**Workflow:**
1. Create PRD using AI agent
2. Generate detailed task breakdown
3. Implement features iteratively
4. Review and approve changes step-by-step

## 🚀 Quick Start Commands

### Development Setup

#### Using Docker (Recommended)
```bash
# Start development environment
docker-compose up dev

# Access shell for commands
docker-compose up shell
docker-compose exec shell sh
```

#### Local Development
```bash
# Navigate to the React app
cd personal-blog

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts
```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run dev:prod         # Start with production mode

# Building
npm run build            # Production build
npm run build:dev        # Development build
npm run build:analyze    # Build with bundle analysis

# Quality Assurance
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript type checking
npm run test             # Run Jest tests
npm run test:coverage    # Run tests with coverage
```

## 📁 Key File References

### Frontend Architecture
- [`src/App.tsx`](./personal-blog/src/App.tsx) - Main application component with routing
- [`src/components/`](./personal-blog/src/components/) - Reusable React components
- [`src/pages/`](./personal-blog/src/pages/) - Page-level components
- [`src/data/`](./personal-blog/src/data/) - Data management and content loading
- [`src/utils/`](./personal-blog/src/utils/) - Utility functions and helpers

### Content Management
- [`content/projects/`](./personal-blog/content/projects/) - Project markdown files
- [`content/blog-posts/`](./personal-blog/content/blog-posts/) - Blog post markdown files
- [`public/images/`](./personal-blog/public/images/) - Project and blog images

### Configuration Files
- [`package.json`](./personal-blog/package.json) - Dependencies and scripts
- [`vite.config.ts`](./personal-blog/vite.config.ts) - Vite build configuration
- [`tailwind.config.js`](./personal-blog/tailwind.config.js) - Tailwind CSS configuration
- [`tsconfig.json`](./personal-blog/tsconfig.json) - TypeScript configuration
- [`jest.config.js`](./personal-blog/jest.config.js) - Jest testing configuration

### AI Workflow Files
- [`tasks/prd-personal-blog.md`](./tasks/prd-personal-blog.md) - Main website PRD
- [`tasks/prd-markdown-content-management.md`](./tasks/prd-markdown-content-management.md) - Content system PRD
- [`summary.md`](./summary.md) - Latest development summary

## 🔧 Development Environment

### Docker Development
The project includes a complete Docker development environment:
- **Ports**: 5173 (Vite dev server), 3000 (alternative)
- **Live Reload**: Configured with file watching
- **Volume Mounting**: Full workspace access with node_modules exclusion

### Local Development Requirements
- **Node.js**: Latest LTS version
- **Package Manager**: npm
- **Browser**: Modern browser with ES modules support

## 🧪 Testing

The project includes comprehensive testing setup:
- **Unit Tests**: Jest with React Testing Library
- **Component Tests**: Full component rendering and interaction testing
- **Mocking**: Configured mocks for external dependencies
- **Coverage**: Coverage reporting available

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage report
npm run test:ci           # CI-friendly test run
```

## 📝 Content Management

### Adding New Projects
1. Create new markdown file in [`content/projects/`](./personal-blog/content/projects/)
2. Add project images to [`public/images/`](./personal-blog/public/images/)
3. Update [`src/data/projects.ts`](./personal-blog/src/data/projects.ts) if needed
4. Content automatically loads via the content management system

### Adding New Blog Posts
1. Create new markdown file in [`content/blog-posts/`](./personal-blog/content/blog-posts/)
2. Update [`src/data/blog-posts.ts`](./personal-blog/src/data/blog-posts.ts)
3. Blog posts support syntax highlighting and Mermaid diagrams

## 🤖 AI Development Workflow

This repository demonstrates a structured approach to AI-assisted development:

1. **Planning Phase**: Use [`create-prd.md`](./create-prd.md) to create detailed requirements
2. **Task Breakdown**: Use [`generate-tasks.md`](./generate-tasks.md) for granular planning
3. **Implementation**: Use [`process-task-list.md`](./process-task-list.md) for guided development
4. **Documentation**: Maintain clear summaries and progress tracking

### Recent Implementations
- ✅ Bug fixes and UI cleanup (carousel buttons, scroll behavior)
- ✅ Markdown content management system
- ✅ Global scroll-to-top functionality
- ✅ Responsive design improvements
- ✅ Test coverage improvements

## 🌐 Deployment

### Production Build
```bash
cd personal-blog
npm run build
npm run preview  # Test production build locally
```

### Apache Configuration
- Server configuration available in [`apache/`](./apache/) directory
- SSL configuration included for production deployment

## 📊 Project Status

**Current State**: ✅ Production Ready
- ✅ Core features implemented
- ✅ Responsive design complete
- ✅ Testing suite established
- ✅ Content management system functional
- ✅ AI workflow templates available

**Next Steps**: Ready for additional features or content expansion using the established AI workflow system.

---

*This repository serves as both a personal website and a demonstration of structured AI-assisted development workflows. Built entirely with AI tools as a learning exercise in modern web development and AI collaboration.*