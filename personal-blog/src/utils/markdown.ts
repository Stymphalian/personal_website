// Markdown utilities — word count and reading time

export interface ParsedMarkdownResult {
  wordCount: number;
  readTime: number; // in minutes
}

// Get word count and reading time for markdown content
// Average reading speed: 200 words per minute
export const getContentStats = (content: string): { wordCount: number; readTime: number } => {
  const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
  return {
    wordCount: words,
    readTime: Math.ceil(words / 200)
  };
};

// Alias kept for any existing callers; delegates to getContentStats
export const parseMarkdown = (content: string): ParsedMarkdownResult => {
  return getContentStats(content);
};

