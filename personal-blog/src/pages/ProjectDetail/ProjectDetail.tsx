import { Clock, Tag } from 'lucide-react'; // Added lucide-react for icons
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { Layout } from '../../components/Layout';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import MediaGallery from '../../components/MediaGallery/MediaGallery';
import { getProjectById, loadProjectContent } from '../../data/projects';
import type { ContentLoadingState, ProjectContent } from '../../types/content';
import ErrorPage from '../ErrorPage/ErrorPage';

const ProjectDetail: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const [content, setContent] = useState<ProjectContent | null>(null);
    const [loadingState, setLoadingState] = useState<ContentLoadingState>('loading');
    const [error, setError] = useState<string | null>(null);

    // Scroll to top when component mounts or projectId changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);

    // Load project content when projectId changes
    useEffect(() => {
        const loadContent = async () => {
            if (!projectId) {
                setLoadingState('error');
                setError('No project ID provided');
                return;
            }

            try {
                setLoadingState('loading');
                const projectContent = await loadProjectContent(projectId);

                if (projectContent) {
                    setContent(projectContent);
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

        loadContent();
    }, [projectId]);

    const project = projectId ? getProjectById(projectId) : undefined;

    // Handle content loading errors
    if (loadingState === 'error' && error) {
        console.error(`Failed to load project content for ID "${projectId}":`, error);
        return (
            <ErrorPage
                errorType="content-error"
                title="Content Loading Error"
                message="The project exists but its content could not be loaded."
                error={error}
                showBackButton={true}
                showHomeButton={true}
            />
        );
    }

    if (!project) {
        console.warn(`Project with ID "${projectId}" not found in metadata`);
        return (
            <ErrorPage
                errorType="not-found"
                title="Project Not Found"
                message="The project you're looking for doesn't exist."
                showBackButton={true}
                showHomeButton={true}
            />
        );
    }

    const breadcrumbItems = [
        { label: 'Projects', path: '/projects' },
        { label: project.title, isCurrent: true }
    ];

    // Helper function to calculate read time (example: 100 words per minute)
    const calculateReadTime = (markdownContent: string) => {
        const words = markdownContent.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0);
        const wpm = 100; // Words per minute
        const minutes = Math.ceil(words.length / wpm);
        return minutes;
    };

    return (
        <Layout maxWidth="full" padding="lg">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Breadcrumb Navigation */}
                    <Breadcrumb items={breadcrumbItems} className="mb-4 sm:mb-6" />

                    {/* Enhanced Back to Projects Button and Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                        <button
                            onClick={() => navigate('/projects')}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm sm:text-base"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Projects
                        </button>

                        {/* Project Quick Actions */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            {project.liveDemo && (
                                <a
                                    href={project.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm text-center"
                                >
                                    View Live Demo
                                </a>
                            )}
                            {project.githubRepo && (
                                <a
                                    href={project.githubRepo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-xs sm:text-sm text-center"
                                >
                                    View on GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Project Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="heading-1 mb-3 sm:mb-4 text-lg sm:text-2xl lg:text-3xl">{project.title}</h1>
                        <p className="body-text text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{project.description}</p>

                        {/* Tags and Read Time - Now positioned together at the top */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-6">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                                    >
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Read Time and Word Count - Now positioned beside tags, always visible */}
                            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {content?.content ? calculateReadTime(content.content) : 'Loading...'} min read
                                </div>
                                {content?.content && (
                                    <div className="flex items-center">
                                        <span className="mr-1">📝</span>
                                        {content.content.trim().split(/\s+/).filter(word => word.length > 0).length} words
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="mb-6">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>

                    {/* Media Gallery */}
                    <MediaGallery images={project.images} videos={project.videos} />

                    {/* Project Content */}
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-6 sm:mt-8">
                        <MarkdownRenderer
                            content={content?.content || ''}
                            loadingState={loadingState}
                            loadingStateData={{ error }}
                            className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
                            options={{
                                highlightCode: true,
                                breaks: true
                            }}
                            emptyContentMessage="Project content is being loaded..."
                            onError={(err) => {
                                setError(err.message);
                                setLoadingState('error');
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectDetail;
