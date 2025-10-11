// Project data structure and initial projects
// Updated to work with dynamic content loading system

import type { ProjectContent } from '../types/content';
import { loadContent } from '../utils/content-loader';
import type { Project } from './interfaces';
import { projects } from './projects_list';


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
