// Project data structure and initial projects
// Updated to work with dynamic content loading system

import type { ProjectContent, ProjectFrontmatter } from '../types/content';
import { loadContent } from '../utils/content-loader';

export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
  thumbnail?: string;
}

export interface Project extends ProjectFrontmatter {
  // Content field removed - content is now loaded dynamically from markdown files
  // All other fields remain the same for backward compatibility
  images?: ProjectMedia[]; // Additional images
  videos?: ProjectMedia[]; // Video content
}

export const projects: Project[] = [
  {
    id: 'personal-blog-portfolio',
    title: 'Personal Blog & Portfolio',
    slug: 'personal-blog-portfolio',
    description:
      'A modern, responsive personal blog and portfolio website built with React, TypeScript, and Tailwind CSS. Features include a dynamic project showcase, blog section with markdown support, and responsive design optimized for all devices.',
    shortDescription: 'Modern personal blog and portfolio website',
    image: '/headshot.jpg',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Jest'],
    featured: true,
    date: '2024-01-15',
    liveDemo: 'https://yourdomain.com',
    githubRepo: 'https://github.com/yourusername/personal-blog',
    tags: ['React', 'TypeScript', 'Portfolio', 'Blog', 'Web Development'],
    images: [
      {
        type: 'image',
        src: '/headshot.jpg',
        alt: 'Homepage screenshot',
        caption: 'Responsive homepage with bio and project showcase'
      },
      {
        type: 'image',
        src: '/placeholder-project-2.jpg',
        alt: 'Projects page',
        caption: 'Grid layout of featured projects'
      }
    ],
    videos: [
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/demo-video-id',
        alt: 'Project walkthrough',
        caption: 'Video demonstration of key features',
        thumbnail: '/placeholder-project-3.jpg'
      }
    ]
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description:
      'A full-stack e-commerce solution with user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern web technologies and following best practices for scalability and security.',
    shortDescription: 'Full-stack e-commerce solution',
    image: '/placeholder-project-2.jpg',
    techStack: ['Node.js', 'Express', 'MongoDB', 'React', 'Stripe API'],
    featured: true,
    date: '2023-12-01',
    liveDemo: 'https://ecommerce-demo.com',
    githubRepo: 'https://github.com/yourusername/ecommerce-platform',
    tags: ['E-commerce', 'Full-stack', 'Node.js', 'React', 'MongoDB'],
    images: [
      {
        type: 'image',
        src: '/placeholder-project-2.jpg',
        alt: 'Product catalog',
        caption: 'Product listing with search and filtering'
      },
      {
        type: 'image',
        src: '/placeholder-project-3.jpg',
        alt: 'Shopping cart',
        caption: 'Shopping cart with item management'
      }
    ],
    videos: [
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/ecommerce-demo',
        alt: 'E-commerce demo',
        caption: 'Complete shopping experience walkthrough',
        thumbnail: '/placeholder-project-2.jpg'
      }
    ]
  },
  {
    id: 'task-management-app',
    title: 'Task Management Application',
    slug: 'task-management-app',
    description:
      'A collaborative task management application with real-time updates, team collaboration features, and intuitive project organization. Includes drag-and-drop functionality, progress tracking, and comprehensive reporting tools.',
    shortDescription: 'Collaborative task management app',
    image: '/placeholder-project-3.jpg',
    techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    featured: true,
    date: '2023-10-15',
    liveDemo: 'https://taskmanager-demo.com',
    githubRepo: 'https://github.com/yourusername/task-management-app',
    tags: ['Task Management', 'Collaboration', 'Real-time', 'React', 'Node.js'],
    images: [
      {
        type: 'image',
        src: '/placeholder-project-3.jpg',
        alt: 'Task dashboard',
        caption: 'Main task management dashboard'
      },
      {
        type: 'image',
        src: '/placeholder-project-2.jpg',
        alt: 'Team collaboration',
        caption: 'Team workspace with real-time updates'
      }
    ],
    videos: [
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/task-manager-demo',
        alt: 'Task manager demo',
        caption: 'Real-time collaboration features demonstration',
        thumbnail: '/placeholder-project-2.jpg'
      }
    ]
  }
];

// Content loading functions that integrate with existing data layer
export const loadProjectContent = async (slug: string): Promise<ProjectContent | null> => {
  try {
    const content = await loadContent(`/content/projects/${slug}.md`, 'project');
    return content as ProjectContent;
  } catch (error) {
    console.error(`Failed to load project content for slug: ${slug}`, error);
    return null;
  }
};

export const loadProjectContentById = async (id: string): Promise<ProjectContent | null> => {
  const project = getProjectById(id);
  if (!project) return null;
  return loadProjectContent(project.slug);
};

export const preloadProjectContent = async (slug: string): Promise<void> => {
  try {
    await loadContent(`/content/projects/${slug}.md`, 'project', { cacheEnabled: true });
  } catch (error) {
    console.warn(`Failed to preload project content for slug: ${slug}`, error);
  }
};

export const preloadFeaturedProjectsContent = async (): Promise<void> => {
  const featuredProjects = getFeaturedProjects();
  await Promise.all(
    featuredProjects.map(project => preloadProjectContent(project.slug))
  );
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
