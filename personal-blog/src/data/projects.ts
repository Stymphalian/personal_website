// Project data structure and initial projects
// Completed in task 4.3

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  techStack: string[];
  liveDemo?: string;
  githubRepo?: string;
  featured: boolean;
  date: string;
  content?: string; // Markdown content for detailed view
}

export const projects: Project[] = [
  {
    id: 'personal-blog-portfolio',
    title: 'Personal Blog & Portfolio',
    description:
      'A modern, responsive personal blog and portfolio website built with React, TypeScript, and Tailwind CSS. Features include a dynamic project showcase, blog section with markdown support, and responsive design optimized for all devices.',
    shortDescription: 'Modern personal blog and portfolio website',
    image: '/headshot.jpg',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Jest'],
    featured: true,
    date: '2024-01-15',
    liveDemo: 'https://yourdomain.com',
    githubRepo: 'https://github.com/yourusername/personal-blog',
    content: `
# Personal Blog & Portfolio

A modern, responsive personal blog and portfolio website showcasing my development skills and projects.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety and better development experience
- **Component Architecture**: Reusable components with comprehensive testing
- **Performance**: Optimized with Vite for fast development and builds
- **Testing**: Jest and React Testing Library for reliable code

## Tech Stack

- React 19 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Jest for testing
- React Router for navigation

## Development Process

This project demonstrates modern React development practices including:
- Component-based architecture
- Responsive design principles
- Comprehensive testing strategies
- Performance optimization
- Clean code practices
    `
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern web technologies and following best practices for scalability and security.',
    shortDescription: 'Full-stack e-commerce solution',
    image: '/placeholder-project-2.jpg',
    techStack: ['Node.js', 'Express', 'MongoDB', 'React', 'Stripe API'],
    featured: true,
    date: '2023-12-01',
    liveDemo: 'https://ecommerce-demo.com',
    githubRepo: 'https://github.com/yourusername/ecommerce-platform',
    content: `
# E-Commerce Platform

A comprehensive e-commerce solution built with modern web technologies.

## Features

- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and checkout process
- Secure payment processing with Stripe
- Admin dashboard for product management
- Responsive design for all devices

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Redux, Material-UI
- **Payment**: Stripe API integration
- **Authentication**: JWT tokens
- **Database**: MongoDB with Mongoose ODM

## Architecture

The platform follows a microservices architecture pattern with:
- RESTful API design
- JWT-based authentication
- Secure payment processing
- Scalable database design
- Comprehensive error handling
    `
  },
  {
    id: 'task-management-app',
    title: 'Task Management Application',
    description:
      'A collaborative task management application with real-time updates, team collaboration features, and intuitive project organization. Includes drag-and-drop functionality, progress tracking, and comprehensive reporting tools.',
    shortDescription: 'Collaborative task management app',
    image: '/placeholder-project-3.jpg',
    techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    featured: true,
    date: '2023-10-15',
    liveDemo: 'https://taskmanager-demo.com',
    githubRepo: 'https://github.com/yourusername/task-management-app',
    content: `
# Task Management Application

A collaborative task management solution designed for teams and organizations.

## Features

- Real-time collaboration with Socket.io
- Drag-and-drop task organization
- Team management and permissions
- Progress tracking and reporting
- Mobile-responsive design
- Integration with external tools

## Tech Stack

- **Frontend**: React with Redux for state management
- **Backend**: Node.js with Express
- **Real-time**: Socket.io for live updates
- **Database**: PostgreSQL with Redis caching
- **Authentication**: OAuth 2.0 and JWT

## Key Functionality

- Task creation, assignment, and tracking
- Project organization and milestones
- Team collaboration and communication
- Progress analytics and reporting
- Mobile app for on-the-go access
    `
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
