import type { ProjectFrontmatter } from "../types/content";

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