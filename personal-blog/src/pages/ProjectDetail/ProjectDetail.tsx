import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import MediaGallery from '../../components/MediaGallery/MediaGallery';
import { getProjectById } from '../../data/projects';

const ProjectDetail: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const project = projectId ? getProjectById(projectId) : undefined;

    if (!project) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="heading-1 mb-6">Project Not Found</h1>
                        <p className="body-text mb-6">The project you're looking for doesn't exist.</p>
                        <button
                            onClick={() => navigate('/projects')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb Navigation */}
                    <Breadcrumb items={breadcrumbItems} className="mb-6" />

                    {/* Enhanced Back to Projects Button */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => navigate('/projects')}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Projects
                        </button>
                        
                        {/* Project Quick Actions */}
                        <div className="flex gap-3">
                            {project.liveDemo && (
                                <a
                                    href={project.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    View Live Demo
                                </a>
                            )}
                            {project.githubRepo && (
                                <a
                                    href={project.githubRepo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                                >
                                    View on GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Project Header */}
                    <div className="mb-8">
                        <h1 className="heading-1 mb-4">{project.title}</h1>
                        <p className="body-text text-gray-600 mb-6">{project.description}</p>

                        {/* Project Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                            <span>Date: {new Date(project.date).toLocaleDateString()}</span>
                            <span>Tech: {project.techStack.join(', ')}</span>
                        </div>

                        {/* Project Image */}
                        <div className="mb-6">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>

                    {/* Media Gallery */}
                    <MediaGallery images={project.images} videos={project.videos} />

                    {/* Project Content */}
                    {project.content && (
                        <div className="prose prose-lg max-w-none mt-8">
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
