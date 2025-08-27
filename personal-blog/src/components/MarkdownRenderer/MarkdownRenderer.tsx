import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ContentLoadingState } from '../../types/content';
import { parseMarkdown } from '../../utils/markdown';

export interface MarkdownRendererProps {
    content: string;
    className?: string;
    options?: {
        highlightCode?: boolean;
        allowHtml?: boolean;
        breaks?: boolean;
    };
    onError?: (error: Error) => void;
    loadingState?: ContentLoadingState;
}

interface MarkdownRendererState {
    htmlContent: string;
    error: Error | null;
    isLoading: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content,
    className = '',
    options = {},
    onError,
    loadingState
}) => {
    const [state, setState] = useState<MarkdownRendererState>({
        htmlContent: '',
        error: null,
        isLoading: false
    });

    // Memoize options to prevent unnecessary re-renders
    const memoizedOptions = useMemo(() => options, [
        options.highlightCode,
        options.allowHtml,
        options.breaks
    ]);

    // Parse content when content or options change
    useEffect(() => {
        if (!content) {
            setState(prev => ({ ...prev, htmlContent: '', error: null, isLoading: false }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const htmlContent = parseMarkdown(content, memoizedOptions);
            setState(prev => ({
                ...prev,
                htmlContent,
                isLoading: false,
                error: null
            }));
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Failed to parse markdown');
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: errorObj
            }));

            if (onError) {
                onError(errorObj);
            }
        }
    }, [content, memoizedOptions]);

    // Memoize retry function
    const handleRetry = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
        // Re-parse content on retry
        if (content) {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            try {
                const htmlContent = parseMarkdown(content, memoizedOptions);
                setState(prev => ({
                    ...prev,
                    htmlContent,
                    isLoading: false,
                    error: null
                }));
            } catch (error) {
                const errorObj = error instanceof Error ? error : new Error('Failed to parse markdown');
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: errorObj
                }));
            }
        }
    }, [content, memoizedOptions]);

    // Handle loading state from props
    useEffect(() => {
        if (loadingState === 'loading') {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
        } else if (loadingState === 'error') {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [loadingState]);

    if (state.isLoading) {
        return (
            <div className={`markdown-renderer loading ${className}`.trim()}>
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (state.error) {
        return (
            <div className={`markdown-renderer error ${className}`.trim()}>
                <div className="error-message">
                    <p>Error rendering markdown: {state.error.message}</p>
                    <button onClick={handleRetry} className="retry-button">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!state.htmlContent) {
        return (
            <div className={`markdown-renderer empty ${className}`.trim()}>
                <p>No content to display</p>
            </div>
        );
    }

    return (
        <div
            className={`markdown-renderer ${className}`.trim()}
            dangerouslySetInnerHTML={{ __html: state.htmlContent }}
        />
    );
};

export default MarkdownRenderer;
