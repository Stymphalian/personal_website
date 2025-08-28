// Enhanced markdown parsing utilities for blog content
// Integrated with the new content management system

export interface MarkdownOptions {
  // Simplified options - no HTML parsing needed
}

export interface ParsedMarkdownResult {
  wordCount: number;
  readTime: number; // in minutes
}

// Simplified markdown processing - no HTML generation
export const parseMarkdown = (
  content: string,
  _options: MarkdownOptions = {}
): ParsedMarkdownResult => {
  // Calculate word count and read time from plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

  return {
    wordCount,
    readTime
  };
};

// Utility function to get content statistics
export const getContentStats = (content: string): { wordCount: number; readTime: number } => {
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readTime = Math.ceil(wordCount / 200);
  
  return { wordCount, readTime };
};

// Utility function to validate markdown content
export const validateMarkdownContent = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!content || content.trim().length === 0) {
    errors.push('Content is empty');
  }
  
  // Check for unclosed markdown elements
  const openHeaders = (content.match(/^#{1,6} /gm) || []).length;
  const closeHeaders = (content.match(/<\/h[1-6]>/g) || []).length;
  
  if (openHeaders !== closeHeaders) {
    errors.push('Mismatched header tags');
  }
  
  // Check for unclosed code blocks
  const codeBlockOpen = (content.match(/```/g) || []).length;
  if (codeBlockOpen % 2 !== 0) {
    errors.push('Unclosed code block');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
