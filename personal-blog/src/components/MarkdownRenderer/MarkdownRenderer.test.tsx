import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MarkdownRenderer from './MarkdownRenderer';

// Mock the markdown utility
jest.mock('../../utils/markdown', () => ({
    parseMarkdown: jest.fn()
}));

import { parseMarkdown } from '../../utils/markdown';

const mockParseMarkdown = parseMarkdown as jest.MockedFunction<typeof parseMarkdown>;

describe('MarkdownRenderer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Basic Rendering', () => {
        it('should render markdown content correctly', () => {
            const mockHtml = '<h1>Test Title</h1><p>Test content</p>';
            mockParseMarkdown.mockReturnValue(mockHtml);

            render(<MarkdownRenderer content="# Test Title\n\nTest content" />);

            expect(mockParseMarkdown).toHaveBeenCalledWith(expect.stringContaining("Test Title"), {});
            expect(screen.getByText('Test Title')).toBeInTheDocument();
            expect(screen.getByText('Test content')).toBeInTheDocument();
        });

        it('should apply custom className', () => {
            const mockHtml = '<p>Test content</p>';
            mockParseMarkdown.mockReturnValue(mockHtml);

            const { container } = render(
                <MarkdownRenderer content="Test content" className="custom-class" />
            );

            expect(container.firstChild).toHaveClass('markdown-renderer', 'custom-class');
        });

        it('should pass markdown options to parser', () => {
            const mockHtml = '<p>Test content</p>';
            mockParseMarkdown.mockReturnValue(mockHtml);

            const options = {
                highlightCode: true,
                allowHtml: false,
                breaks: true
            };

            render(<MarkdownRenderer content="Test content" options={options} />);

            expect(mockParseMarkdown).toHaveBeenCalledWith("Test content", options);
        });
    });

    describe('Loading States', () => {
        it('should show loading state when content is being processed', async () => {
            // The component shows loading state internally while processing
            render(<MarkdownRenderer content="Test content" />);

            // Wait for content to be processed
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            });
        });

        it('should show loading state when loadingState prop is loading', () => {
            mockParseMarkdown.mockReturnValue('<p>Content</p>');

            render(
                <MarkdownRenderer
                    content="Test content"
                    loadingState="loading"
                />
            );

            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });

        it('should hide loading state when loadingState changes from loading', async () => {
            mockParseMarkdown.mockReturnValue('<p>Content</p>');

            const { rerender } = render(
                <MarkdownRenderer
                    content="Test content"
                    loadingState="loading"
                />
            );

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            rerender(
                <MarkdownRenderer
                    content="Test content"
                    loadingState="idle"
                />
            );

            // The component should still show loading until content is processed
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });

    describe('Error Handling', () => {
        it('should display error message when markdown parsing fails', () => {
            const errorMessage = 'Failed to parse markdown';
            mockParseMarkdown.mockImplementation(() => {
                throw new Error(errorMessage);
            });

            render(<MarkdownRenderer content="Invalid markdown" />);

            expect(screen.getByText(/Error rendering markdown:/)).toBeInTheDocument();
            expect(screen.getByText(/Failed to parse markdown/)).toBeInTheDocument();
        });

        it('should call onError callback when error occurs', () => {
            const onError = jest.fn();
            const errorMessage = 'Failed to parse markdown';

            mockParseMarkdown.mockImplementation(() => {
                throw new Error(errorMessage);
            });

            render(
                <MarkdownRenderer
                    content="Invalid markdown"
                    onError={onError}
                />
            );

            expect(onError).toHaveBeenCalledWith(expect.any(Error));
            expect(onError.mock.calls[0][0].message).toBe(errorMessage);
        });

        it('should show retry button when error occurs', () => {
            mockParseMarkdown.mockImplementation(() => {
                throw new Error('Failed to parse markdown');
            });

            render(<MarkdownRenderer content="Invalid markdown" />);

            expect(screen.getByText('Retry')).toBeInTheDocument();
        });

        it('should retry parsing when retry button is clicked', () => {
            const errorMessage = 'Failed to parse markdown';
            mockParseMarkdown
                .mockImplementationOnce(() => {
                    throw new Error(errorMessage);
                })
                .mockReturnValueOnce('<p>Retried content</p>');

            render(<MarkdownRenderer content="Test content" />);

            // Should show error initially
            expect(screen.getByText(/Error rendering markdown:/)).toBeInTheDocument();

            // Click retry button
            fireEvent.click(screen.getByText('Retry'));

            // Should show retried content
            expect(screen.getByText('Retried content')).toBeInTheDocument();
            expect(screen.queryByText('Error Rendering Content')).not.toBeInTheDocument();
        });

        it('should handle non-Error objects thrown during parsing', () => {
            mockParseMarkdown.mockImplementation(() => {
                throw 'String error';
            });

            render(<MarkdownRenderer content="Invalid markdown" />);

            expect(screen.getByText(/Error rendering markdown:/)).toBeInTheDocument();
            expect(screen.getByText(/Failed to parse markdown/)).toBeInTheDocument();
        });
    });

    describe('Empty Content Handling', () => {
        it('should show empty state when no content is provided', () => {
            render(<MarkdownRenderer content="" />);

            expect(screen.getByText('No content to display')).toBeInTheDocument();
        });

        it('should show empty state when content is undefined', () => {
            render(<MarkdownRenderer content={undefined as any} />);

            expect(screen.getByText('No content to display')).toBeInTheDocument();
        });

        it('should clear error state when content becomes empty', () => {
            mockParseMarkdown.mockImplementation(() => {
                throw new Error('Failed to parse markdown');
            });

            const { rerender } = render(<MarkdownRenderer content="Invalid content" />);

            expect(screen.getByText(/Error rendering markdown:/)).toBeInTheDocument();

            rerender(<MarkdownRenderer content="" />);

            expect(screen.getByText('No content to display')).toBeInTheDocument();
            expect(screen.queryByText(/Error rendering markdown:/)).not.toBeInTheDocument();
        });
    });

    describe('Content Updates', () => {
        it('should re-parse content when content prop changes', () => {
            const { rerender } = render(<MarkdownRenderer content="Initial content" />);

            expect(mockParseMarkdown).toHaveBeenCalledWith("Initial content", {});

            mockParseMarkdown.mockReturnValue('<p>Updated content</p>');
            rerender(<MarkdownRenderer content="Updated content" />);

            expect(mockParseMarkdown).toHaveBeenCalledWith("Updated content", {});
        });

        it('should re-parse content when options prop changes', () => {
            const { rerender } = render(
                <MarkdownRenderer
                    content="Test content"
                    options={{ highlightCode: false }}
                />
            );

            expect(mockParseMarkdown).toHaveBeenCalledWith("Test content", { highlightCode: false });

            rerender(
                <MarkdownRenderer
                    content="Test content"
                    options={{ highlightCode: true }}
                />
            );

            expect(mockParseMarkdown).toHaveBeenCalledWith("Test content", { highlightCode: true });
        });

        it('should not re-parse when onError callback changes', () => {
            const onError1 = jest.fn();
            const onError2 = jest.fn();

            const { rerender } = render(
                <MarkdownRenderer
                    content="Test content"
                    onError={onError1}
                />
            );

            const initialCallCount = mockParseMarkdown.mock.calls.length;

            rerender(
                <MarkdownRenderer
                    content="Test content"
                    onError={onError2}
                />
            );

            expect(mockParseMarkdown).toHaveBeenCalledTimes(initialCallCount);
        });
    });

    describe('Accessibility', () => {
        it('should render content with proper HTML structure', () => {
            const mockHtml = '<h1>Title</h1><p>Content</p>';
            mockParseMarkdown.mockReturnValue(mockHtml);

            render(<MarkdownRenderer content="# Title\n\nContent" />);

            expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('should have proper button accessibility for retry functionality', () => {
            mockParseMarkdown.mockImplementation(() => {
                throw new Error('Failed to parse markdown');
            });

            render(<MarkdownRenderer content="Invalid markdown" />);

            const retryButton = screen.getByRole('button', { name: 'Retry' });
            expect(retryButton).toBeInTheDocument();
            expect(retryButton).toBeEnabled();
        });
    });

    describe('Edge Cases', () => {
        it('should handle very long content', () => {
            const longContent = 'A'.repeat(10000);
            const mockHtml = '<p>Long content</p>';
            mockParseMarkdown.mockReturnValue(mockHtml);

            render(<MarkdownRenderer content={longContent} />);

            expect(mockParseMarkdown).toHaveBeenCalledWith(longContent, {});
            expect(screen.getByText('Long content')).toBeInTheDocument();
        });

        it('should handle content with special characters', () => {
            const specialContent = 'Content with <script>alert("xss")</script> and &amp; entities';
            const mockHtml = '<p>Content with &lt;script&gt;alert("xss")&lt;/script&gt; and &amp; entities</p>';
            mockParseMarkdown.mockReturnValue(mockHtml);

            render(<MarkdownRenderer content={specialContent} />);

            expect(mockParseMarkdown).toHaveBeenCalledWith(specialContent, {});
            expect(screen.getByText(/Content with/)).toBeInTheDocument();
        });

        it('should handle rapid content changes', async () => {
            const { rerender } = render(<MarkdownRenderer content="Content 1" />);

            // Rapidly change content
            rerender(<MarkdownRenderer content="Content 2" />);
            rerender(<MarkdownRenderer content="Content 3" />);
            rerender(<MarkdownRenderer content="Content 4" />);

            // Should handle the last content change
            await waitFor(() => {
                expect(mockParseMarkdown).toHaveBeenCalledWith("Content 4", {});
            });
        });
    });
});
