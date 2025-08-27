# Project Requirements Document: Personal Blog & Portfolio

## Overview

A modern, responsive personal blog and portfolio website built with React, TypeScript, and Tailwind CSS. The site serves as a professional digital resume showcasing technical skills, projects, and professional experience. It features a clean, developer-focused design with a black-white color scheme and crystal blue accents, inspired by VSCode interface design.

## Features

### Core Pages
- **Home Page** - Professional headshot, comprehensive bio, and featured project carousel
- **Projects Page** - Grid layout showcasing portfolio projects with detailed information
- **Individual Project Pages** - Dedicated pages for each project with markdown content, images, videos, and live demos
- **Blog Section** - Developer-focused articles with markdown support, tags, and categories
- **Contact Page** - Professional contact information and social media links

### Key Functionality
- **Responsive Design** - Mobile-first approach optimized for all devices
- **Project Showcase** - Dynamic project carousel with 3 featured projects
- **Markdown Support** - Rich content rendering for blog posts and project details
- **SEO Optimization** - Meta tags, Open Graph, and structured data markup
- **Performance Optimized** - Fast loading with Vite build tooling and code splitting

## Relevant Files

### Core Application Files
- `personal-blog/src/App.css` - Global application styles
- `personal-blog/src/App.tsx` - Main application component with routing configuration
- `personal-blog/src/main.tsx` - Application entry point and React rendering
- `personal-blog/src/styles/globals.css` - Global CSS with Tailwind directives

### Page Components
- `personal-blog/src/pages/Blog/Blog.tsx` - Blog posts listing page
- `personal-blog/src/pages/BlogPostDetail/BlogPostDetail.tsx` - Individual blog post page
- `personal-blog/src/pages/Contact/Contact.tsx` - Contact information page
- `personal-blog/src/pages/Home/Home.tsx` - Homepage with bio and project carousel
- `personal-blog/src/pages/ProjectDetail/ProjectDetail.tsx` - Individual project detail page
- `personal-blog/src/pages/Projects/Projects.tsx` - Projects listing page

### Reusable Components
- `personal-blog/src/components/Breadcrumb/Breadcrumb.tsx` - Navigation breadcrumb component
- `personal-blog/src/components/CodeBlock/CodeBlock.tsx` - Syntax-highlighted code blocks
- `personal-blog/src/components/Headshot/Headshot.tsx` - Professional headshot display
- `personal-blog/src/components/Layout/Layout.tsx` - Page layout wrapper component
- `personal-blog/src/components/MarkdownRenderer/` - Markdown content rendering components
- `personal-blog/src/components/MediaGallery/MediaGallery.tsx` - Image and video gallery component
- `personal-blog/src/components/Navigation/Navigation.tsx` - Top navigation bar component
- `personal-blog/src/components/ProjectCard/ProjectCard.tsx` - Project display card component
- `personal-blog/src/components/ProjectCarousel/ProjectCarousel.tsx` - Featured projects carousel

### Data Management
- `personal-blog/src/data/blog-posts.ts` - Blog post data with markdown content
- `personal-blog/src/data/index.ts` - Data export utilities
- `personal-blog/src/data/projects.ts` - Project data structure and sample projects

### Utility Functions
- `personal-blog/src/utils/index.ts` - Utility function exports
- `personal-blog/src/utils/markdown.ts` - Markdown processing utilities
- `personal-blog/src/utils/seo.ts` - SEO meta tag generation

### Configuration Files
- `personal-blog/package.json` - Project dependencies and scripts
- `personal-blog/vite.config.ts` - Vite build configuration with optimizations
- `personal-blog/tailwind.config.js` - Tailwind CSS configuration with custom theme
- `personal-blog/tsconfig.json` - TypeScript configuration
- `personal-blog/eslint.config.js` - ESLint configuration for code quality
- `personal-blog/jest.config.js` - Jest testing configuration

### Testing Files
- `personal-blog/src/App.test.tsx` - Main application tests
- `personal-blog/src/setupTests.ts` - Test environment setup
- `personal-blog/src/components/*/index.test.tsx` - Component unit tests
- `personal-blog/src/pages/*/index.test.tsx` - Page component tests
- `personal-blog/src/data/*.test.ts` - Data utility tests

### Build and Deployment
- `personal-blog/Dockerfile` - Multi-stage Docker container for production
- `personal-blog/docker-compose.yml` - Docker Compose configuration
- `personal-blog/nginx.conf` - Nginx server configuration
- `personal-blog/build.bat` - Windows build script
- `personal-blog/build.config.js` - Build configuration options

### Documentation
- `personal-blog/README.md` - Project documentation and setup instructions
- `personal-blog/BUILD_README.md` - Build process documentation
- `personal-blog/DEPLOYMENT.md` - Deployment instructions

## Technologies

### Frontend Framework
- **React 19** - Modern React with functional components and hooks
- **TypeScript 5.8** - Full type safety and enhanced development experience
- **React Router DOM 7.8** - Client-side routing and navigation

### Styling and UI
- **Tailwind CSS 3.4** - Utility-first CSS framework with custom theme
- **Custom Color Scheme** - Black-white with crystal blue (#00B4D8) accents
- **Responsive Design** - Mobile-first approach with breakpoint utilities

### Build Tools and Development
- **Vite 7.1** - Fast build tool with HMR and optimization
- **PostCSS 8.5** - CSS processing and autoprefixer
- **ESLint 9.33** - Code quality and consistency
- **Prettier 3.6** - Code formatting

### Content and Markdown
- **React Markdown 10.1** - Markdown rendering with React
- **Rehype Highlight 7.0** - Syntax highlighting for code blocks
- **Rehype Raw 7.0** - Raw HTML support in markdown
- **Remark GFM 4.0** - GitHub Flavored Markdown support

### Testing
- **Jest 30.0** - JavaScript testing framework
- **React Testing Library 16.3** - React component testing utilities
- **Jest DOM 6.8** - Custom Jest matchers for DOM testing

### Icons and UI Elements
- **Lucide React 0.542** - Modern icon library

### Containerization and Deployment
- **Docker** - Multi-stage containerization for production
- **Nginx** - Web server for serving static files
- **Docker Compose** - Multi-service orchestration

### Performance and Optimization
- **Code Splitting** - Dynamic imports and chunk optimization
- **Asset Optimization** - Image and CSS/JS minification
- **Tree Shaking** - Unused code elimination
- **Lazy Loading** - Component and route-based code splitting

## Common Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier

### Docker Operations
- `docker-compose up -d` - Start services in background
- `docker-compose down` - Stop and remove services
- `docker build -t personal-blog .` - Build Docker image

### Testing
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:ci` - Run tests for CI environment

## Project Structure

The project follows a clean, organized structure:
- **Components** - Reusable UI components with comprehensive testing
- **Pages** - Route-based page components
- **Data** - Static data and content management
- **Utils** - Helper functions and utilities
- **Styles** - Global CSS and Tailwind configuration
- **Tests** - Comprehensive test coverage for all components

## Design Philosophy

The application emphasizes:
- **Professional Aesthetic** - Clean, minimal design suitable for career development
- **Developer Experience** - VSCode-inspired interface elements and monospace typography
- **Performance** - Fast loading and smooth interactions
- **Accessibility** - Semantic HTML and proper contrast ratios
- **Mobile First** - Responsive design optimized for all devices
