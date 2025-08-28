import { ArrowLeft, BookOpen, Calendar, Clock, Tag, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import { getPostBySlug, loadBlogPostContent } from '../../data/blog-posts';
import type { BlogPostContent, ContentLoadingState } from '../../types/content';
import ErrorPage from '../ErrorPage/ErrorPage';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [content, setContent] = useState<BlogPostContent | null>(null);
  const [loadingState, setLoadingState] = useState<ContentLoadingState>('loading');
  const [error, setError] = useState<string | null>(null);

  const post = getPostBySlug(slug || '');

  const loadContent = async (slug: string | undefined) => {
    if (!slug) {
      setLoadingState('error');
      setError('No slug provided');
      return;
    }

    try {
      setLoadingState('loading');
      const blogContent = await loadBlogPostContent(slug);

      if (blogContent) {
        setContent(blogContent);
        setLoadingState('loaded');
      } else {
        setLoadingState('error');
        setError('Content not found');
      }
    } catch (err) {
      setLoadingState('error');
      setError(err instanceof Error ? err.message : 'Failed to load content');
    }
  };

  useEffect(() => { loadContent(slug); }, [slug]);

  // Handle content loading errors
  if (loadingState === 'error' && error) {
    console.error(`Failed to load blog post content for slug "${slug}":`, error);
    return (
      <ErrorPage
        errorType="content-error"
        title="Content Loading Error"
        message="The blog post exists but its content could not be loaded."
        error={error}
        showBackButton={true}
        showHomeButton={true}
      />
    );
  }

  if (!post) {
    console.warn(`Blog post with slug "${slug}" not found in metadata`);
    return (
      <ErrorPage
        errorType="not-found"
        title="Blog Post Not Found"
        message="The blog post you're looking for doesn't exist."
        showBackButton={true}
        showHomeButton={true}
      />
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-vs-editor-surface2 text-vs-editor-text2';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorial':
        return 'bg-crystal-blue-500/20 text-crystal-blue-400';
      case 'project-showcase':
        return 'bg-purple-500/20 text-purple-400';
      case 'tech-review':
        return 'bg-orange-500/20 text-orange-400';
      case 'career-advice':
        return 'bg-indigo-500/20 text-indigo-400';
      default:
        return 'bg-vs-editor-surface2 text-vs-editor-text2';
    }
  };



  return (
    <div className="min-h-screen bg-vs-editor-bg pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-vs-editor-text2 hover:text-vs-editor-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          {/* Meta Information - Repositioned for better layout */}
          <div className="mb-6">
            {/* Primary Meta Info - Author, Date, Category */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-vs-editor-text3 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {post.category.replace('-', ' ')}
              </div>
            </div>

            {/* Difficulty and Category Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                {post.difficulty.charAt(0).toUpperCase() + post.difficulty.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>

            {/* Tags and Read Time - Now positioned together at the top */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vs-editor-surface2 text-vs-editor-text2"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read Time and Word Count - Now positioned beside tags */}
              <div className="flex items-center gap-4 text-sm text-vs-editor-text3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </div>
                {content?.content && (
                  <div className="flex items-center">
                    <span className="mr-1">📝</span>
                    {content.content.trim().split(/\s+/).filter(word => word.length > 0).length} words
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-vs-editor-text mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-vs-editor-text2 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer
              content={content?.content || ''}
              loadingState={loadingState}
              loadingStateData={{ error }}
              className="prose-headings:text-vs-editor-text prose-p:text-vs-editor-text2 prose-strong:text-vs-editor-text"
              options={{
                highlightCode: true,
                breaks: true
              }}
              emptyContentMessage="Content is being loaded..."
              onError={(err) => {
                setError(err.message);
                setLoadingState('error');
              }}
            />
          </div>
        </article>

        {/* Footer Navigation */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-vs-editor-border">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center px-4 py-2 text-vs-editor-text2 hover:text-vs-editor-text transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </button>

            <div className="text-sm text-vs-editor-text3">
              <span>Written by {post.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
