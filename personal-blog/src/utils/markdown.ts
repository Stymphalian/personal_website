// Enhanced markdown parsing utilities for blog content
// Integrated with the new content management system



export interface MarkdownOptions {
  highlightCode?: boolean;
  allowHtml?: boolean;
  breaks?: boolean;
  extractExcerpt?: boolean;
  maxExcerptLength?: number;
}

export interface ParsedMarkdownResult {
  htmlContent: string;
  excerpt?: string;
  wordCount: number;
  readTime: number; // in minutes
}

// Enhanced markdown parsing with better HTML generation
export const parseMarkdown = (
  content: string,
  options: MarkdownOptions = {}
): ParsedMarkdownResult => {
  const {
    highlightCode = false,
    breaks = false,
    extractExcerpt = false,
    maxExcerptLength = 150
  } = options;

  let result = content;

  // Headers
  result = result
    .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
    .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Emphasis and strong text
  result = result
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/__(.*?)__/gim, '<strong>$1</strong>')
    .replace(/_(.*?)_/gim, '<em>$1</em>');

  // Code blocks and inline code
  result = result
    .replace(
      /```(\w+)?\n([\s\S]*?)```/gim,
      '<pre><code class="language-$1">$2</code></pre>'
    )
    .replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Images
  result = result.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/gim,
    '<img src="$2" alt="$1" loading="lazy" />'
  );

  // Lists
  result = result
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^\+ (.*$)/gim, '<li>$1</li>');

  // Wrap consecutive list items in ul tags
  result = result.replace(
    /(<li>.*<\/li>)/gims,
    '<ul>$1</ul>'
  );

  // Blockquotes
  result = result.replace(
    /^> (.*$)/gim,
    '<blockquote>$1</blockquote>'
  );

  // Horizontal rules
  result = result.replace(/^---$/gim, '<hr>');

  // Paragraphs (wrap text in p tags)
  result = result.replace(
    /^(?!<[a-z][1-6]?|<li|<ul|<blockquote|<hr|<pre|<code)(.+)$/gim,
    '<p>$1</p>'
  );

  // Apply options
  if (breaks) {
    result = result.replace(/\n/g, '<br>');
  }

  if (highlightCode) {
    // Add syntax highlighting classes
    result = result.replace(
      /<code class="language-(\w+)">/g,
      '<code class="language-$1 hljs">'
    );
  }

  // Clean up empty paragraphs and fix list wrapping
  result = result
    .replace(/<p><\/p>/g, '')
    .replace(/<ul><\/ul>/g, '')
    .replace(/<\/ul>\s*<ul>/g, '');

  // Calculate word count and read time
  const plainText = result.replace(/<[^>]*>/g, '');
  const wordCount = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

  // Extract excerpt if requested
  let excerpt: string | undefined;
  if (extractExcerpt) {
    excerpt = extractExcerptFromText(plainText, maxExcerptLength);
  }

  return {
    htmlContent: result,
    excerpt,
    wordCount,
    readTime
  };
};

// Enhanced excerpt extraction
export const extractExcerptFromText = (
  content: string,
  maxLength: number = 150
): string => {
  // Remove HTML tags and normalize whitespace
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Try to break at sentence boundaries
  const truncated = plainText.substring(0, maxLength);
  const lastSentenceEnd = truncated.lastIndexOf('.');
  const lastWordEnd = truncated.lastIndexOf(' ');

  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }

  if (lastWordEnd > maxLength * 0.8) {
    return truncated.substring(0, lastWordEnd) + '...';
  }

  return truncated + '...';
};

// Utility function to parse content and extract metadata
export const parseContentWithMetadata = (
  content: string,
  options: MarkdownOptions = {}
): ParsedMarkdownResult => {
  return parseMarkdown(content, { ...options, extractExcerpt: true });
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
