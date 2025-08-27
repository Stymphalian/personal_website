# Task List: Personal Blog & Portfolio Implementation

## Relevant Files

- `package.json` - Project dependencies and scripts configuration
- `vite.config.js` - Vite build configuration for React app
- `tailwind.config.js` - Tailwind CSS configuration with custom theme
- `jest.config.js` - Jest testing framework configuration
- `tsconfig.test.json` - TypeScript configuration for Jest tests
- `src/setupTests.ts` - Jest test setup and global mocks
- `src/__mocks__/fileMock.js` - Mock file for static assets in tests
- `src/App.tsx` - Main application component with routing
- `src/App.test.tsx` - Unit tests for main App component
- `src/components/Navigation/Navigation.tsx` - Top-right navigation bar component
- `src/components/Navigation/Navigation.test.tsx` - Unit tests for Navigation component
- `src/pages/Home/Home.tsx` - Home page with bio and project carousel
- `src/pages/Home/Home.test.tsx` - Unit tests for Home page
- `src/pages/Projects/Projects.tsx` - Projects page with card layout
- `src/pages/Projects/Projects.test.tsx` - Unit tests for Projects page
- `src/pages/ProjectDetail/ProjectDetail.tsx` - Individual project page component
- `src/pages/ProjectDetail/ProjectDetail.test.tsx` - Unit tests for ProjectDetail component
- `src/pages/Blog/Blog.tsx` - Blog page component with article listing and responsive grid layout
- `src/pages/Blog/Blog.test.tsx` - Unit tests for Blog page
- `src/pages/Contact/Contact.tsx` - Contact page with contact information
- `src/pages/Contact/Contact.test.tsx` - Unit tests for Contact page
- `src/components/ProjectCard/ProjectCard.tsx` - Reusable project card component
- `src/components/ProjectCard/ProjectCard.test.tsx` - Unit tests for ProjectCard component
- `src/components/ProjectCarousel/ProjectCarousel.tsx` - Home page project carousel
- `src/components/ProjectCarousel/ProjectCarousel.test.tsx` - Unit tests for ProjectCarousel component
- `src/components/CodeBlock/CodeBlock.tsx` - Developer-focused code block component
- `src/components/CodeBlock/CodeBlock.test.tsx` - Unit tests for CodeBlock component
- `src/components/MediaGallery/MediaGallery.tsx` - Media gallery component for multiple images and videos
- `src/components/MediaGallery/MediaGallery.test.tsx` - Unit tests for MediaGallery component
- `src/pages/ProjectDetail/ProjectDetail.tsx` - Individual project detail page component
- `src/data/projects.ts` - Project data structure and initial projects
- `src/data/projects.test.ts` - Unit tests for project data
- `src/data/blog-posts.ts` - Blog post data structure
- `src/data/blog-posts.test.ts` - Unit tests for blog post data
- `src/utils/seo.ts` - SEO utility functions for meta tags
- `src/utils/seo.test.ts` - Unit tests for SEO utilities
- `src/utils/markdown.ts` - Markdown parsing utilities for blog content
- `src/utils/markdown.test.ts` - Unit tests for markdown utilities
- `src/styles/globals.css` - Global CSS with Tailwind imports and custom styles
- `public/index.html` - HTML template with SEO meta tags
- `public/robots.txt` - Search engine crawling configuration
- `public/sitemap.xml` - XML sitemap for SEO
- `Dockerfile` - Docker container configuration
- `docker-compose.yml` - Docker Compose configuration for development
- `.dockerignore` - Docker ignore file
- `README.md` - Project documentation and setup instructions

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Project Setup and Configuration
  - [x] 1.1 Initialize React project with Vite and TypeScript
  - [x] 1.2 Install and configure Tailwind CSS with custom theme
  - [x] 1.3 Set up project directory structure (components, pages, utils, data, styles)
  - [x] 1.4 Configure ESLint and Prettier for code quality
  - [x] 1.5 Set up Jest testing framework with React Testing Library
  - [x] 1.6 Install additional dependencies (react-router-dom, lucide-react, etc.)
  - [x] 1.7 Configure build scripts and development environment

- [x] 2.0 Core Layout and Navigation
  - [x] 2.1 Create main App component with React Router setup
  - [x] 2.2 Implement Navigation component with top-right positioning
  - [x] 2.3 Add responsive navigation menu for mobile devices
  - [x] 2.4 Implement smooth transitions and hover effects
  - [x] 2.5 Create layout wrapper component for consistent page structure
  - [x] 2.6 Add active state styling for current navigation item

- [x] 3.0 Home Page Implementation
  - [x] 3.1 Create Home page component with bio section
  - [x] 3.2 Implement professional headshot display with responsive image handling
  - [x] 3.3 Create bio section with skills and experience highlights
  - [x] 3.4 Implement ProjectCarousel component for showcasing 3 projects
  - [x] 3.5 Add carousel navigation controls and auto-play functionality
  - [x] 3.6 Implement responsive design for mobile, tablet, and desktop
  - [x] 3.7 Add smooth animations and transitions for enhanced UX

- [ ] 4.0 Projects Page and Individual Project Pages
  - [x] 4.1 Create Projects page with card vertical layout
  - [x] 4.2 Implement ProjectCard component with title, image, description, and tech stack
  - [x] 4.3 Create project data structure and populate with initial 3 projects
  - [x] 4.4 Implement ProjectDetail page component for individual project views
  - [x] 4.5 Add support for multiple images, videos, and live demo links
  - [ ] 4.6 Implement markdown rendering for project blog content
  - [x] 4.7 Add navigation breadcrumbs and back-to-projects functionality
  - [x] 4.8 Create responsive vertical layout that adapts to different screen sizes

- [x] 5.0 Blog Section Implementation
  - [x] 5.1 Create Blog page component with article listing
  - [x] 5.2 Implement blog post data structure.
  - [x] 5.3 Create CodeBlock component for developer-focused content
  - [x] 5.4 Add an example blog page.

- [x] 6.0 Contact Page Implementation
  - [x] 6.1 Create Contact page component with contact information display
  - [x] 6.2 Implement contact links (email, GitHub, LinkedIn) with proper styling
  - [x] 6.3 Configure external links to open in new tabs/windows
  - [x] 6.4 Implement responsive design for contact information layout
  - [x] 6.5 Add hover effects and interactive elements for contact links

- [ ] 7.0 SEO and Performance Optimization
  - [ ] 7.1 Create SEO utility functions for dynamic meta tag generation
  - [ ] 7.2 Implement Open Graph tags for social media sharing
  - [ ] 7.3 Add structured data markup for projects and blog posts
  - [ ] 7.4 Generate robots.txt and sitemap.xml files
  - [ ] 7.5 Implement code splitting and lazy loading for heavy components
  - [ ] 7.6 Optimize images and assets for web performance
  - [ ] 7.7 Add performance monitoring and Core Web Vitals optimization
  - [ ] 7.8 Implement proper semantic HTML structure for accessibility

- [ ] 8.0 Docker Configuration and Deployment
  - [x] 8.1 Create Dockerfile for production build
  - [x] 8.2 Configure docker-compose.yml for development environment
  - [x] 8.3 Set up .dockerignore file to exclude unnecessary files
  - [x] 8.4 Optimize Docker image size and build process
  - [x] 8.5 Create deployment scripts for DigitalOcean
  - [x] 8.6 Configure environment variables for different deployment stages
  - [x] 8.7 Set up health checks and monitoring for production deployment
  - [x] 8.8 Document deployment process and troubleshooting steps

- [x] 9.0 UI/UX Improvements and Bug Fixes
  - [x] 9.1 Fix "View My Work" and "Download Resume" button functionality
  - [x] 9.2 Remove "Let's Work Together" section from home page
  - [x] 9.3 Improve projects page horizontal space utilization (currently too narrow)
  - [x] 9.4 Update page title from "Vite + React + TS" to "Jordan's Blog"
  - [x] 9.5 Remove "Subscribe to stay updated for new blog posts..." statement from Blog page
  - [x] 9.6 Update footer text from "2025 Portfolio..." to "2025. Built with React & Tailwind & Cursor"
  - [ ] 9.7 The Projects Details page should use more horizontal space (currently too narrow)
