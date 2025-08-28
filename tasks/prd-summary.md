# Project Requirements Document: Personal Blog & Portfolio

## Overview

A modern, responsive personal blog and portfolio website built with React, TypeScript, and Tailwind CSS. The site showcases technical skills, projects, and professional experience through a VSCode-inspired dark theme design. It features a markdown-based content management system that separates content from application logic, making it easy to add new blog posts and project showcases.

## Features

### Core Pages
- **Home Page**: Professional headshot, bio section, and featured project carousel
- **Projects Page**: Grid layout showcasing portfolio projects with detailed descriptions
- **Individual Project Pages**: Dedicated pages for each project with rich markdown content
- **Blog Section**: Technical articles and tutorials with markdown support
- **Contact Page**: Professional contact information and social links

### Content Management
- **Markdown-Based System**: Blog posts and project content stored in separate `.md` files
- **Dynamic Content Loading**: Runtime loading of markdown content from designated directories
- **Frontmatter Support**: YAML metadata for posts and projects with validation
- **Media Support**: Images and other media files referenced in markdown content
- **Content Caching**: Performance optimization with configurable cache expiry

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **VSCode-Inspired Theme**: Dark color scheme with crystal blue accents
- **SEO Optimization**: Meta tags, Open Graph, and structured data
- **Performance Optimized**: Code splitting, lazy loading, and asset optimization
- **Docker Deployment**: Containerized for production hosting

## Relevant Files

### Core Application Files
- `personal-blog/src/App.tsx` - Main application component with routing configuration
- `personal-blog/src/main.tsx` - Application entry point and React rendering
- `personal-blog/src/components/Layout/Layout.tsx` - Reusable layout component with page headers and footers
- `personal-blog/src/components/Navigation/Navigation.tsx` - Top navigation bar component
- `personal-blog/src/components/CodeBlock/CodeBlock.tsx` - Syntax-highlighted code block component for markdown content

### Page Components
- `personal-blog/src/pages/Home/Home.tsx` - Home page with bio and project carousel
- `personal-blog/src/pages/Projects/Projects.tsx` - Projects listing page
- `personal-blog/src/pages/ProjectDetail/ProjectDetail.tsx` - Individual project detail page
- `personal-blog/src/pages/Blog/Blog.tsx` - Blog posts listing page
- `personal-blog/src/pages/BlogPostDetail/BlogPostDetail.tsx` - Individual blog post page
- `personal-blog/src/pages/Contact/Contact.tsx` - Contact information page
- `personal-blog/src/pages/ErrorPage/ErrorPage.tsx` - Error handling and 404 pages

### Content Management
- `personal-blog/src/utils/content-loader.ts` - Core content loading and caching system
- `personal-blog/src/utils/markdown.ts` - Markdown processing and validation utilities
- `personal-blog/src/types/content.ts` - TypeScript interfaces for content management
- `personal-blog/content/blog-posts/` - Directory containing blog post markdown files
- `personal-blog/content/projects/` - Directory containing project markdown files

### Data and Configuration
- `personal-blog/src/data/blog-posts.ts` - Blog post metadata and listings
- `personal-blog/src/data/projects.ts` - Project metadata and listings
- `personal-blog/tailwind.config.js` - Tailwind CSS configuration with custom VSCode theme colors
- `personal-blog/vite.config.ts` - Vite build configuration with content copying plugin
- `personal-blog/package.json` - Project dependencies and build scripts

### Testing
- `personal-blog/src/components/**/*.test.tsx` - Unit tests for React components
- `personal-blog/src/utils/**/*.test.ts` - Unit tests for utility functions
- `personal-blog/src/data/**/*.test.ts` - Unit tests for data management
- `personal-blog/jest.config.js` - Jest testing framework configuration

### Deployment and Infrastructure
- `personal-blog/Dockerfile` - Multi-stage Docker build for production deployment
- `personal-blog/docker-compose.yml` - Docker Compose configuration for local development
- `personal-blog/nginx.conf` - Nginx server configuration for production
- `personal-blog/env.development` - Development environment variables
- `personal-blog/env.production` - Production environment variables

## Technologies

### Frontend Framework
- **React 19.1.1** - Modern React with functional components and hooks
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **React Router DOM 7.8.2** - Client-side routing and navigation

### Styling and UI
- **Tailwind CSS 3.4.0** - Utility-first CSS framework with custom VSCode theme
- **PostCSS 8.5.6** - CSS processing and optimization
- **Lucide React 0.542.0** - Modern icon library

### Content Management
- **React Markdown 10.1.0** - Markdown rendering in React components
- **Rehype Highlight 7.0.2** - Syntax highlighting for code blocks
- **Remark GFM 4.0.1** - GitHub Flavored Markdown support

### Build Tools
- **Vite 7.1.3** - Fast build tool and development server
- **ESLint 9.33.0** - Code linting and quality enforcement
- **Prettier 3.6.2** - Code formatting and style consistency

### Testing
- **Jest 30.0.5** - JavaScript testing framework
- **Testing Library React 16.3.0** - React component testing utilities
- **Jest DOM 6.8.0** - Custom Jest matchers for DOM testing

### Development Tools
- **ESLint Config Prettier** - ESLint and Prettier integration
- **TypeScript ESLint** - TypeScript-specific linting rules
- **React ESLint Plugin** - React-specific linting rules

### Deployment
- **Docker** - Containerization for consistent deployment
- **Nginx** - Production web server with optimized configuration
- **Node.js 20+** - Runtime environment for build and development

## Common Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run dev:prod` - Start development server in production mode
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:ci` - Run tests for CI/CD pipeline

### Code Quality
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Fix auto-fixable ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

### Docker Operations
- `docker-compose up` - Start development environment
- `docker build -t personal-blog .` - Build production Docker image
- `docker run -p 80:80 personal-blog` - Run production container

## Project Structure

```
personal-blog/
├── src/                    # Source code
│   ├── components/        # Reusable React components
│   ├── pages/            # Page-level components
│   ├── utils/            # Utility functions and content management
│   ├── types/            # TypeScript type definitions
│   ├── data/             # Static data and metadata
│   └── styles/           # Global CSS and styling
├── content/               # Markdown content files
│   ├── blog-posts/       # Blog post markdown files
│   └── projects/         # Project markdown files
├── public/                # Static assets
├── dist/                  # Production build output
└── tasks/                 # Project documentation and requirements
```

## Key Design Decisions

1. **VSCode-Inspired Theme**: Dark color scheme with crystal blue accents for developer aesthetic
2. **Markdown-First Content**: Separation of content from application logic for easy maintenance
3. **Component-Based Architecture**: Reusable components with consistent styling and behavior
4. **Performance Optimization**: Code splitting, lazy loading, and efficient content caching
5. **Mobile-First Responsiveness**: Tailwind CSS utilities for consistent cross-device experience
6. **Type Safety**: Comprehensive TypeScript interfaces for content management and components
7. **Testing Coverage**: Jest and Testing Library for comprehensive component and utility testing
8. **Docker Deployment**: Multi-stage builds for optimized production images

## Development Workflow

1. **Content Creation**: Write markdown files in `content/` directories with proper frontmatter
2. **Component Development**: Create React components with TypeScript interfaces and Tailwind styling
3. **Testing**: Write unit tests for components and utilities using Jest and Testing Library
4. **Build and Preview**: Use Vite for fast development builds and production optimization
5. **Deployment**: Build Docker image and deploy to production environment

This project serves as a professional portfolio and technical blog, demonstrating modern web development practices while maintaining excellent performance and user experience.
