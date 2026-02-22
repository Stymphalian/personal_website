#!/usr/bin/env node

/**
 * Generate projects_list.ts from markdown files in content/projects/
 * 
 * This script:
 * 1. Reads all .md files from content/projects/
 * 2. Extracts frontmatter from each file
 * 3. Generates src/data/projects_list.ts with proper TypeScript types
 * 
 * Usage: node scripts/generate-projects.mjs
 */

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const PROJECTS_DIR = path.join(__dirname, '../content/projects');
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects_list.ts');

/**
 * Parse a markdown file and extract frontmatter
 */
function parseProjectFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter } = matter(content);
  
  return frontmatter;
}

/**
 * Convert frontmatter data to TypeScript object literal.
 * baseIndent: number of spaces before the opening '{' (default 2 for array items).
 */
function formatProject(frontmatter, baseIndent = 2) {
  const base = ' '.repeat(baseIndent);       // indent for { and }
  const prop = ' '.repeat(baseIndent + 2);   // indent for properties
  const lines = [];

  lines.push(`${base}{`);

  // Required fields
  if (frontmatter.id) lines.push(`${prop}id: '${frontmatter.id}',`);
  if (frontmatter.slug) lines.push(`${prop}slug: '${frontmatter.slug}',`);
  if (frontmatter.title) lines.push(`${prop}title: '${escapeString(frontmatter.title)}',`);
  if (frontmatter.description) lines.push(`${prop}description: '${escapeString(frontmatter.description)}',`);
  if (frontmatter.shortDescription) lines.push(`${prop}shortDescription: '${escapeString(frontmatter.shortDescription)}',`);
  if (frontmatter.image) lines.push(`${prop}image: '${frontmatter.image}',`);

  // Array fields
  if (frontmatter.techStack && Array.isArray(frontmatter.techStack)) {
    lines.push(`${prop}techStack: [${frontmatter.techStack.map(t => `'${t}'`).join(', ')}],`);
  }

  if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
    lines.push(`${prop}tags: [${frontmatter.tags.map(t => `'${t}'`).join(', ')}],`);
  }

  // Boolean and other fields
  if (typeof frontmatter.featured === 'boolean') {
    lines.push(`${prop}featured: ${frontmatter.featured},`);
  }

  if (frontmatter.date) {
    // Convert date to YYYY-MM-DD format if it's a Date object
    const dateStr = frontmatter.date instanceof Date
      ? frontmatter.date.toISOString().split('T')[0]
      : String(frontmatter.date);
    lines.push(`${prop}date: '${dateStr}',`);
  }

  // Optional fields
  if (frontmatter.liveDemo) {
    lines.push(`${prop}liveDemo: '${frontmatter.liveDemo}',`);
  }

  if (frontmatter.githubRepo) {
    lines.push(`${prop}githubRepo: '${frontmatter.githubRepo}',`);
  }

  if (typeof frontmatter.showDetails === 'boolean') {
    lines.push(`${prop}showDetails: ${frontmatter.showDetails},`);
  }

  // Handle images array
  // Media arrays start inline after the property name, so inner items indent at baseIndent + 4
  if (frontmatter.images && Array.isArray(frontmatter.images) && frontmatter.images.length > 0) {
    lines.push(`${prop}images: ${formatMediaArray(frontmatter.images, baseIndent + 4)},`);
  } else {
    lines.push(`${prop}images: [],`);
  }

  // Handle videos array
  if (frontmatter.videos && Array.isArray(frontmatter.videos) && frontmatter.videos.length > 0) {
    lines.push(`${prop}videos: ${formatMediaArray(frontmatter.videos, baseIndent + 4)},`);
  } else {
    lines.push(`${prop}videos: [],`);
  }

  lines.push(`${base}},`);

  return lines.join('\n');
}

/**
 * Format images/videos array for TypeScript.
 * itemIndent: spaces before each '{' inside the array.
 * The '[' is emitted inline (caller writes `prop: [`), and
 * the closing ']' is indented at itemIndent - 2.
 */
function formatMediaArray(mediaArray, itemIndent = 4) {
  if (!mediaArray || mediaArray.length === 0) {
    return '[]';
  }

  const item = ' '.repeat(itemIndent);           // indent for { and }
  const mprop = ' '.repeat(itemIndent + 2);      // indent for media properties
  const close = ' '.repeat(itemIndent - 2);      // indent for closing ]

  const lines = ['['];

  mediaArray.forEach((media, index) => {
    const isLast = index === mediaArray.length - 1;
    lines.push(`${item}{`);
    if (media.type) lines.push(`${mprop}type: '${media.type}',`);
    if (media.src) lines.push(`${mprop}src: '${media.src}',`);
    if (media.alt) lines.push(`${mprop}alt: '${escapeString(media.alt)}',`);
    if (media.caption) lines.push(`${mprop}caption: '${escapeString(media.caption)}',`);
    if (media.thumbnail) lines.push(`${mprop}thumbnail: '${media.thumbnail}',`);
    lines.push(`${item}}${isLast ? '' : ','}`);
  });

  lines.push(`${close}]`);
  return lines.join('\n');
}

/**
 * Escape single quotes in strings for TypeScript
 */
function escapeString(str) {
  return str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

/**
 * Generate the projects_list.ts file
 */
function generateProjectsList() {
  console.log('🔍 Scanning for project markdown files...');
  
  // Read all markdown files from projects directory
  const files = fs.readdirSync(PROJECTS_DIR)
    .filter(file => file.endsWith('.md'))
    .sort(); // Sort alphabetically for consistent output
  
  if (files.length === 0) {
    console.warn('⚠️  No markdown files found in', PROJECTS_DIR);
    return;
  }
  
  console.log(`📄 Found ${files.length} project file(s):`);
  files.forEach(file => console.log(`   - ${file}`));
  
  // Parse all project files
  const projects = files.map(file => {
    const filePath = path.join(PROJECTS_DIR, file);
    console.log(`\n📖 Parsing ${file}...`);
    
    try {
      const frontmatter = parseProjectFile(filePath);
      console.log(`   ✅ Successfully parsed: ${frontmatter.title || 'Untitled'}`);
      return frontmatter;
    } catch (error) {
      console.error(`   ❌ Error parsing ${file}:`, error.message);
      return null;
    }
  }).filter(Boolean); // Remove any null entries from errors
  
  // Sort projects by date in descending order (newest first)
  projects.sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01');
    const dateB = new Date(b.date || '1970-01-01');
    return dateB - dateA; // Descending order
  });
  
  console.log('\n📅 Projects sorted by date (newest first)');
  
  // Generate TypeScript file content
  const fileContent = `import type { Project } from './interfaces';

/**
 * Project list generated from markdown files
 * Sorted by date in descending order (newest first)
 * 
 * DO NOT EDIT THIS FILE MANUALLY
 * Run 'npm run generate:projects' to regenerate this file
 * 
 * Generated on: ${new Date().toISOString()}
 */

export const projects: Project[] = [
${projects.map(p => formatProject(p, 2)).join('\n')}
];
`;
  
  // Write to file
  console.log(`\n💾 Writing to ${path.relative(process.cwd(), OUTPUT_FILE)}...`);
  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');
  
  console.log(`✨ Successfully generated projects_list.ts with ${projects.length} project(s)!\n`);
}

// Run the script
try {
  generateProjectsList();
} catch (error) {
  console.error('❌ Error generating projects list:', error);
  process.exit(1);
}
