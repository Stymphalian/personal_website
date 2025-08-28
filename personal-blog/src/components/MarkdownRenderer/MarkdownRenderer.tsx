import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import type { ContentLoadingState } from '../../types/content';

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
                        p: ({ children, ...props }) => (
                            <p className="mb-4 leading-relaxed" {...props}>
                                {children}
                            </p>
                        ),
                        code: ({ className, children, ...props }) => (
                            <code
                                className={className}
                                {...props}
                            >
                                {children}
                            </code>
                        ),
                        pre: ({ children, ...props }) => (
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props}>
                                {children}
                            </pre>
                        ),
                        blockquote: ({ children, ...props }) => (
                            <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props}>
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
                                className="text-blue-600 hover:text-blue-800 underline"
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
                                <table className="min-w-full border-collapse border border-gray-300" {...props}>
                                    {children}
                                </table>
                            </div>
                        ),
                        th: ({ children, ...props }) => (
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold" {...props}>
                                {children}
                            </th>
                        ),
                        td: ({ children, ...props }) => (
                            <td className="border border-gray-300 px-4 py-2" {...props}>
                                {children}
                            </td>
                        ),
                        hr: () => (
                            <hr className="border-t border-gray-300 my-6" />
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
