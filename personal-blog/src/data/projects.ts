// Project data structure and initial projects
// Updated to work with dynamic content loading system

import type { ProjectContent } from '../types/content';
import { loadContent } from '../utils/content-loader';
import type { Project } from './interfaces';
import { projects } from './projects_list';

// Content loading functions that integrate with existing data layer
export const loadProjectContent = async (
  slug: string
): Promise<ProjectContent | null> => {
  try {
    const content = await loadContent(
      `/content/projects/${slug}.md`,
      'project'
    );
    return content as ProjectContent;
  } catch (error) {
    console.error(`Failed to load project content for slug: ${slug}`, error);
    return null;
  }
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
