// Markdown parsing utilities for blog content
// Will be implemented in task 5.2

export interface MarkdownOptions {
  highlightCode?: boolean;
  allowHtml?: boolean;
  breaks?: boolean;
}

export const parseMarkdown = (
  content: string,
  options: MarkdownOptions = {}
): string => {
  // Placeholder implementation - will be completed in task 5.2
  let result = content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(
      /```(\w+)?\n([\s\S]*?)```/gim,
      '<pre><code class="language-$1">$2</code></pre>'
    )
    .replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Apply options
  if (options.breaks) {
    result = result.replace(/\n/g, '<br>');
  }

  if (options.highlightCode) {
    // Code highlighting will be implemented in task 5.4
    result = result.replace(
      /<code class="language-(\w+)">/g,
      '<code class="language-$1 hljs">'
    );
  }

  return result;
};

export const extractExcerpt = (
  content: string,
  maxLength: number = 150
): string => {
  // Placeholder implementation - will be completed in task 5.2
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.length > maxLength
    ? `${plainText.substring(0, maxLength)}...`
    : plainText;
};
