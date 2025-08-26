import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { blogPosts } from '../../data/blog-posts';
import BlogPostDetail from './BlogPostDetail';

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

// Mock the CodeBlock component
jest.mock('../../components/CodeBlock/CodeBlock', () => {
  return function MockCodeBlock({ code, language }: { code: string; language: string }) {
    return (
      <div data-testid="code-block" data-language={language}>
        <pre>{code}</pre>
      </div>
    );
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BlogPostDetail', () => {
  const mockPost = blogPosts[0]; // Use the first blog post for testing

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ slug: mockPost.slug });
  });

  describe('Post Found', () => {
    it('renders blog post content correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Check the main title (should be the first one)
      const titles = screen.getAllByText(mockPost.title);
      expect(titles.length).toBeGreaterThan(0);
      expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
      expect(screen.getByText(mockPost.author)).toBeInTheDocument();
    });

    it('displays meta information correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Check date formatting
      const date = new Date(mockPost.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      // Use getAllByText since date appears in multiple places
      const dates = screen.getAllByText(formattedDate);
      expect(dates.length).toBeGreaterThan(0);
      
      // Check read time
      expect(screen.getByText(`${mockPost.readTime} min read`)).toBeInTheDocument();
      
      // Check category
      const categoryText = mockPost.category.replace('-', ' ');
      expect(screen.getByText(categoryText)).toBeInTheDocument();
    });

    it('displays difficulty and category badges with correct colors', () => {
      renderWithRouter(<BlogPostDetail />);
      
      const difficultyBadge = screen.getByText(mockPost.difficulty.charAt(0).toUpperCase() + mockPost.difficulty.slice(1));
      expect(difficultyBadge).toBeInTheDocument();
      
      const categoryBadge = screen.getByText(mockPost.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()));
      expect(categoryBadge).toBeInTheDocument();
    });

    it('displays all tags correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      mockPost.tags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });

    it('renders markdown content correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Check that headers are rendered
      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Understanding the Problem')).toBeInTheDocument();
      expect(screen.getByText('The useMemo Hook')).toBeInTheDocument();
      expect(screen.getByText('The useCallback Hook')).toBeInTheDocument();
      expect(screen.getByText('Real-World Example')).toBeInTheDocument();
    });

    it('renders code blocks with CodeBlock component', () => {
      renderWithRouter(<BlogPostDetail />);
      
      const codeBlocks = screen.getAllByTestId('code-block');
      expect(codeBlocks.length).toBeGreaterThan(0);
    });

    it('handles back navigation correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Get the first back button (header navigation)
      const backButtons = screen.getAllByText('Back to Blog');
      expect(backButtons.length).toBeGreaterThan(0);
      
      backButtons[0].click();
      expect(mockNavigate).toHaveBeenCalledWith('/blog');
    });

    it('displays footer navigation correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      expect(screen.getByText(`Written by ${mockPost.author}`)).toBeInTheDocument();
      // Check that there are back buttons (both header and footer)
      const backButtons = screen.getAllByText('Back to Blog');
      expect(backButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Post Not Found', () => {
    it('renders 404 state when post is not found', () => {
      mockUseParams.mockReturnValue({ slug: 'non-existent-post' });
      
      renderWithRouter(<BlogPostDetail />);
      
      expect(screen.getByText('Blog post not found')).toBeInTheDocument();
      expect(screen.getByText("The blog post you're looking for doesn't exist.")).toBeInTheDocument();
      expect(screen.getByText('Back to Blog')).toBeInTheDocument();
    });

    it('provides link back to blog when post not found', () => {
      mockUseParams.mockReturnValue({ slug: 'non-existent-post' });
      
      renderWithRouter(<BlogPostDetail />);
      
      const backLink = screen.getByText('Back to Blog');
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/blog');
    });
  });

  describe('Markdown Parsing', () => {
    it('handles different header levels correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // The content should have headers at different levels
      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Understanding the Problem')).toBeInTheDocument();
      expect(screen.getByText('The useMemo Hook')).toBeInTheDocument();
    });

    it('handles paragraphs correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Should render paragraph content
      expect(screen.getByText(/Performance optimization in React applications/)).toBeInTheDocument();
    });

    it('handles empty lines for spacing', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // The component should render without errors even with empty lines
      const titles = screen.getAllByText(mockPost.title);
      expect(titles.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes correctly', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Find the article container
      const article = screen.getByRole('article');
      expect(article).toHaveClass('max-w-4xl', 'mx-auto');
    });

    it('uses proper spacing and typography classes', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Get the main title (first one)
      const titles = screen.getAllByText(mockPost.title);
      const mainTitle = titles[0];
      expect(mainTitle).toHaveClass('text-4xl', 'font-bold', 'text-gray-900');
      
      const excerpt = screen.getByText(mockPost.excerpt);
      expect(excerpt).toHaveClass('text-xl', 'text-gray-600');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      renderWithRouter(<BlogPostDetail />);
      
      expect(screen.getByRole('article')).toBeInTheDocument();
      // Check that there are buttons (multiple back buttons)
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('provides proper navigation context', () => {
      renderWithRouter(<BlogPostDetail />);
      
      // Check that there are back buttons
      const backButtons = screen.getAllByText('Back to Blog');
      expect(backButtons.length).toBeGreaterThan(0);
      expect(backButtons[0].tagName).toBe('BUTTON');
    });
  });
});
