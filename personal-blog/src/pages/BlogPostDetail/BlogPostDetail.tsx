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

  if (!post) {
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
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorial':
        return 'bg-blue-100 text-blue-800';
      case 'project-showcase':
        return 'bg-purple-100 text-purple-800';
      case 'tech-review':
        return 'bg-orange-100 text-orange-800';
      case 'career-advice':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          {/* Meta Information */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min read
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer
              content={content?.content || ''}
              loadingState={loadingState}
              loadingStateData={{ error }}
              className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
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
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </button>

            <div className="text-sm text-gray-500">
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
