import { Check, Copy, FileCode, Terminal } from 'lucide-react';
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  theme?: 'light' | 'dark';
  maxHeight?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
  showCopyButton = true,
  theme = 'dark',
  maxHeight = 'none',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'typescript':
      case 'ts':
        return <FileCode className="w-4 h-4" />;
      case 'javascript':
      case 'js':
        return <FileCode className="w-4 h-4" />;
      case 'bash':
      case 'shell':
      case 'sh':
        return <Terminal className="w-4 h-4" />;
      default:
        return <FileCode className="w-4 h-4" />;
    }
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'typescript':
        return 'TypeScript';
      case 'ts':
        return 'TypeScript';
      case 'javascript':
        return 'JavaScript';
      case 'js':
        return 'JavaScript';
      case 'jsx':
        return 'JSX';
      case 'tsx':
        return 'TSX';
      case 'bash':
        return 'Bash';
      case 'shell':
        return 'Shell';
      case 'sh':
        return 'Shell';
      case 'json':
        return 'JSON';
      case 'css':
        return 'CSS';
      case 'html':
        return 'HTML';
      case 'yaml':
        return 'YAML';
      case 'yml':
        return 'YAML';
      case 'dockerfile':
        return 'Dockerfile';
      case 'docker':
        return 'Docker';
      case 'sql':
        return 'SQL';
      case 'python':
        return 'Python';
      case 'py':
        return 'Python';
      case 'java':
        return 'Java';
      case 'csharp':
        return 'C#';
      case 'cpp':
        return 'C++';
      case 'c':
        return 'C';
      case 'go':
        return 'Go';
      case 'rust':
        return 'Rust';
      case 'php':
        return 'PHP';
      case 'ruby':
        return 'Ruby';
      case 'swift':
        return 'Swift';
      case 'kotlin':
        return 'Kotlin';
      case 'scala':
        return 'Scala';
      case 'r':
        return 'R';
      case 'matlab':
        return 'MATLAB';
      default:
        return lang.charAt(0).toUpperCase() + lang.slice(1);
    }
  };

  const getDisplayCode = (code: string) => {
    // Remove leading/trailing whitespace
    const trimmedCode = code.trim();

    // If no line numbers or no content, return as is
    if (!showLineNumbers || !trimmedCode) {
      return trimmedCode;
    }

    // Split into lines and add line numbers
    const lines = trimmedCode.split('\n');
    const maxLineNumber = lines.length;
    const lineNumberWidth = maxLineNumber.toString().length;

    return lines
      .map((line, index) => {
        const lineNumber = (index + 1).toString().padStart(lineNumberWidth, ' ');
        return `${lineNumber}  ${line}`;
      })
      .join('\n');
  };

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return 'bg-gray-900 text-gray-100 border-gray-700';
    }
    return 'bg-gray-50 text-gray-900 border-gray-200';
  };

  const getHeaderThemeClasses = () => {
    if (theme === 'dark') {
      return 'bg-gray-800 border-gray-700 text-gray-300';
    }
    return 'bg-gray-100 border-gray-200 text-gray-600';
  };

  return (
    <div className={`code-block rounded-lg border overflow-hidden ${getThemeClasses()} ${className}`}>
      {/* Header */}
      {(filename || language) && (
        <div className={`flex items-center justify-between px-4 py-2 border-b ${getHeaderThemeClasses()}`}>
          <div className="flex items-center space-x-2">
            {getLanguageIcon(language)}
            <span className="text-sm font-medium">
              {filename && (
                <span className="mr-2 text-gray-400">
                  {filename}
                </span>
              )}
              {getLanguageLabel(language)}
            </span>
          </div>

          {showCopyButton && (
            <button
              onClick={handleCopy}
              className={`p-1.5 rounded-md transition-colors ${theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                }`}
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Code Content */}
      <div
        className="relative overflow-auto"
        style={{ maxHeight }}
      >
        <pre className={`p-4 text-sm font-mono leading-relaxed m-0 ${showLineNumbers ? 'pl-8' : ''
          }`}>
          <code
            className={`language-${language}`}
            style={{
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, Monaco, monospace',
            }}
          >
            {getDisplayCode(code)}
          </code>
        </pre>

        {/* Line numbers overlay */}
        {showLineNumbers && code.trim() && (
          <div
            className={`absolute top-0 left-0 w-12 h-full text-xs font-mono select-none pointer-events-none ${theme === 'dark'
              ? 'bg-gray-900 text-gray-500 border-r border-gray-700'
              : 'bg-gray-50 text-gray-400 border-gray-200'
              }`}
            style={{
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, Monaco, monospace',
            }}
          >
            {code.trim().split('\n').map((_, index) => (
              <div
                key={index}
                className="px-2 py-1 text-right"
                style={{ lineHeight: '1.5rem' }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
