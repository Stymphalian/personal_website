import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { Layout } from '../../components/Layout';
import MediaGallery from '../../components/MediaGallery/MediaGallery';
import { getProjectById } from '../../data/projects';

const ProjectDetail: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const project = projectId ? getProjectById(projectId) : undefined;

    if (!project) {
        return (
            <Layout>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="heading-1 mb-4 sm:mb-6">Project Not Found</h1>
                        <p className="body-text mb-4 sm:mb-6">The project you're looking for doesn't exist.</p>
                        <button
                            onClick={() => navigate('/projects')}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            ← Back to Projects
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    const breadcrumbItems = [
        { label: 'Projects', path: '/projects' },
        { label: project.title, isCurrent: true }
    ];

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="max-w-4xl mx-auto">
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

                        {/* Project Meta Info */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(project.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                                {project.techStack.join(', ')}
                            </span>
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
                    {project.content && (
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-6 sm:mt-8">
                            <div
                                className="markdown-content"
                                dangerouslySetInnerHTML={{
                                    __html: project.content.replace(/\n/g, '<br />')
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProjectDetail;
