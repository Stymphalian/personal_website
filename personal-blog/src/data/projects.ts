// Project data structure and initial projects
// Will be implemented in task 4.3

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
  // Placeholder projects - will be populated in task 4.3
  {
    id: 'project-1',
    title: 'Sample Project 1',
    description:
      'This is a sample project description that will be replaced with real content.',
    shortDescription: 'Sample project for portfolio',
    image: '/placeholder-project-1.jpg',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    date: '2024-01-01',
  },
  {
    id: 'project-2',
    title: 'Sample Project 2',
    description:
      'Another sample project description for demonstration purposes.',
    shortDescription: 'Another sample project',
    image: '/placeholder-project-2.jpg',
    techStack: ['Node.js', 'Express', 'MongoDB'],
    featured: true,
    date: '2024-02-01',
  },
  {
    id: 'project-3',
    title: 'Sample Project 3',
    description: 'Third sample project to complete the initial set.',
    shortDescription: 'Third sample project',
    image: '/placeholder-project-3.jpg',
    techStack: ['Python', 'Django', 'PostgreSQL'],
    featured: true,
    date: '2024-03-01',
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
