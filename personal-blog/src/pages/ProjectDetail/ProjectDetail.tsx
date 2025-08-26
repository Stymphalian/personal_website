import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="heading-1 mb-6">Project Not Found</h1>
                        <p className="body-text mb-6">The project you're looking for doesn't exist.</p>
                        <button
                            onClick={() => navigate('/projects')}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            ← Back to Projects
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/projects')}
                        className="mb-6 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        ← Back to Projects
                    </button>

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

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            {project.liveDemo && (
                                <a
                                    href={project.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Live Demo
                                </a>
                            )}
                            {project.githubRepo && (
                                <a
                                    href={project.githubRepo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                                >
                                    View on GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Media Gallery */}
                    <MediaGallery images={project.images} videos={project.videos} />

                    {/* Project Content */}
                    {project.content && (
                        <div className="prose prose-lg max-w-none">
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
