import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import type { ContentLoadingState } from '../../types/content';
import MermaidDiagram from '../MermaidDiagram';

export interface MarkdownRendererProps {
    content: string;
    className?: string;
    options?: {
        highlightCode?: boolean;
        allowHtml?: boolean;
        breaks?: boolean;
        extractExcerpt?: boolean;
        maxExcerptLength?: number;
    };
    onError?: (error: Error) => void;
    loadingState?: ContentLoadingState;
    loadingStateData?: any;
    showRetryButton?: boolean;
    retryLabel?: string;
    emptyContentMessage?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content,
    className = '',
    options = {},
    loadingState,
    loadingStateData,
    emptyContentMessage = 'No content to display'
}) => {
    const {
        highlightCode = true
    } = options;

    // Memoize plugins to prevent unnecessary re-renders
    const plugins = useMemo(() => {
        const pluginList = [remarkGfm];
        return pluginList;
    }, []);

    // Memoize rehype plugins for syntax highlighting
    const rehypePlugins = useMemo(() => {
        const rehypeList = [];
        if (highlightCode) {
            rehypeList.push(rehypeHighlight);
        }
        return rehypeList;
    }, [highlightCode]);

    // Handle loading state
    if (loadingState === 'loading') {
        return (
            <div className={`markdown-renderer loading ${className}`.trim()}>
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    // Handle error state
    if (loadingState === 'error') {
        return (
            <div className={`markdown-renderer error ${className}`.trim()}>
                <div className="error-message">
                    <p>Error loading content</p>
                    {loadingStateData?.error && (
                        <p>Details: {loadingStateData.error}</p>
                    )}
                </div>
            </div>
        );
    }

    // Handle empty content
    if (!content || content.trim().length === 0) {
        return (
            <div className={`markdown-renderer empty ${className}`.trim()}>
                <p>{emptyContentMessage}</p>
            </div>
        );
    }

    return (
        <div className={`markdown-renderer ${className}`.trim()}>
            <div className="markdown-content">
                <ReactMarkdown
                    remarkPlugins={plugins}
                    rehypePlugins={rehypePlugins}
                    components={{
                        // Custom component overrides for better styling
                        h1: ({ children, ...props }) => (
                            <h1 className="text-3xl font-bold mb-4" {...props}>
                                {children}
                            </h1>
                        ),
                        h2: ({ children, ...props }) => (
                            <h2 className="text-2xl font-bold mb-3" {...props}>
                                {children}
                            </h2>
                        ),
                        h3: ({ children, ...props }) => (
                            <h3 className="text-xl font-bold mb-2" {...props}>
                                {children}
                            </h3>
                        ),
                        h4: ({ children, ...props }) => (
                            <h4 className="text-lg font-semibold mb-2" {...props}>
                                {children}
                            </h4>
                        ),
                        h5: ({ children, ...props }) => (
                            <h5 className="text-base font-semibold mb-2" {...props}>
                                {children}
                            </h5>
                        ),
                        h6: ({ children, ...props }) => (
                            <h6 className="text-sm font-semibold mb-2" {...props}>
                                {children}
                            </h6>
                        ),
                        p: ({ children, ...props }) => (
                            <p className="mb-4 leading-relaxed" {...props}>
                                {children}
                            </p>
                        ),
                        code: ({ className, children, ...props }) => {
                            // Check if this is a Mermaid code block
                            if (className && className.includes('language-mermaid')) {
                                return (
                                    <MermaidDiagram
                                        chart={String(children)}
                                        className="my-6"
                                    />
                                );
                            }

                            // Check if this is inline code (no className) vs code block (has className)
                            if (!className) {
                                // Inline code styling
                                return (
                                    <code
                                        className="bg-vs-editor-surface text-vs-editor-text px-1.5 py-0.5 rounded text-sm font-mono border border-vs-editor-border"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            }

                            // Code block styling (already handled by pre component)
                            return (
                                <code
                                    className={className}
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ children, ...props }) => (
                            <pre className="bg-vs-editor-bg p-4 rounded-lg overflow-x-auto mb-4 border border-vs-editor-border" {...props}>
                                {children}
                            </pre>
                        ),
                        blockquote: ({ children, ...props }) => (
                            <blockquote className="border-l-4 border-vs-editor-border pl-4 italic mb-4 text-vs-editor-text2" {...props}>
                                {children}
                            </blockquote>
                        ),
                        ul: ({ children, ...props }) => (
                            <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
                                {children}
                            </ul>
                        ),
                        ol: ({ children, ...props }) => (
                            <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
                                {children}
                            </ol>
                        ),
                        li: ({ children, ...props }) => (
                            <li className="ml-4" {...props}>
                                {children}
                            </li>
                        ),
                        a: ({ href, children, ...props }) => (
                            <a
                                href={href}
                                className="text-crystal-blue-400 hover:text-crystal-blue-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            >
                                {children}
                            </a>
                        ),
                        img: ({ src, alt, ...props }) => (
                            <img
                                src={src}
                                alt={alt}
                                className="max-w-full h-auto rounded-lg shadow-md mb-4"
                                loading="lazy"
                                {...props}
                            />
                        ),
                        table: ({ children, ...props }) => (
                            <div className="overflow-x-auto mb-4">
                                <table className="min-w-full border-collapse border border-vs-editor-border" {...props}>
                                    {children}
                                </table>
                            </div>
                        ),
                        th: ({ children, ...props }) => (
                            <th className="border border-vs-editor-border px-4 py-2 bg-vs-editor-surface font-semibold" {...props}>
                                {children}
                            </th>
                        ),
                        td: ({ children, ...props }) => (
                            <td className="border border-vs-editor-border px-4 py-2" {...props}>
                                {children}
                            </td>
                        ),
                        hr: () => (
                            <hr className="border-t border-vs-editor-border my-6" />
                        )
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownRenderer;
