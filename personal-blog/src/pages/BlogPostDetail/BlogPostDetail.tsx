import { ArrowLeft, BookOpen, Calendar, Clock, Tag, User } from 'lucide-react';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// TODO: Re-enable when Task 5.0 is implemented to use dynamic content loading
// import CodeBlock from '../../components/CodeBlock/CodeBlock';
import { getPostBySlug } from '../../data/blog-posts';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = getPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h1 className="text-2xl font-semibold text-gray-600 mb-2">
              Blog post not found
            </h1>
            <p className="text-gray-500 mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
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

  // TODO: Replace with dynamic content loading in Task 5.0
  // Simple markdown parser for basic formatting
  // const parseMarkdown = (content: string) => {
  //   // Split content into lines for processing
  //   const lines = content.split('\n');
  //   const elements: React.ReactNode[] = [];

  //   let currentCodeBlock = '';
  //   let inCodeBlock = false;
  //   let codeLanguage = '';

  //   lines.forEach((line, index) => {
  //     // Handle code blocks
  //     if (line.startsWith('```')) {
  //       if (!inCodeBlock) {
  //         // Start of code block
  //         inCodeBlock = true;
  //         codeLanguage = line.slice(3).trim() || 'typescript';
  //         currentCodeBlock = '';
  //         } else {
  //         // End of code block
  //         inCodeBlock = false;
  //         if (currentCodeBlock.trim()) {
  //           elements.push(
  //             <div key={`code-${index}`} className="my-6">
  //               <CodeBlock
  //                 code={currentCodeBlock.trim()}
  //                 language={code-blue-500
  //                 showLineNumbers={true}
  //                 showCopyButton={true}
  //               />
  //             </div>
  //           );
  //         }
  //         currentCodeBlock = '';
  //       }
  //       return;
  //     }

  //     if (inCodeBlock) {
  //       currentCodeBlock += line + '\n';
  //       return;
  //     }

  //     // Handle headers
  //     if (line.startsWith('#')) {
  //         const level = line.match(/^#+/)?.[0].length || 1;
  //         const text = line.replace(/^#+\s*/, '');

  //         if (level === 1) {
  //           elements.push(
  //             <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
  //               {text}
  //             </h1>
  //           );
  //         } else if (level === 2) {
  //           elements.push(
  //             <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
  //             {text}
  //           </h2>
  //         );
  //       } else if (level === 3) {
  //         elements.push(
  //           <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">
  //             {text}
  //           </h3>
  //         );
  //       }
  //       return;
  //     }

  //     // Handle paragraphs
  //     if (line.trim()) {
  //       elements.push(
  //         <p key={index} className="text-gray-700 leading-relaxed mb-4">
  //         {line}
  //       </p>
  //     );
  //   } else {
  //     // Empty line for spacing
  //     elements.push(<div key={index} className="h-4" />);
  //   }
  // });

  //   return elements;
  // };

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
          {/* TODO: Replace with dynamic content loading in Task 5.0 */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Content loading will be implemented in Task 5.0</p>
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
