import { ExternalLink, Eye, Github } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  techStack: string[];
  liveDemo?: string;
  githubRepo?: string;
  featured: boolean;
  date: string;
  showDetails?: boolean;
}

interface ProjectCarouselProps {
  projects: Project[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const navigate = useNavigate();

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, projects.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleViewDetails = () => {
    const currentProject = projects[currentIndex];
    navigate(`/projects/${currentProject.id}`);
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No projects to display</p>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Project Display */}
      <div className="relative bg-vs-editor-surface rounded-xl overflow-hidden shadow-lg border border-vs-editor-border">
        {/* Project Info Above Image */}
        <div className="px-6 py-4 bg-vs-editor-surface border-b border-vs-editor-border">
          <h2 className="text-2xl md:text-3xl font-bold text-vs-editor-text mb-2">
            {currentProject.title}
          </h2>
          <p className="text-lg text-vs-editor-text2 px-4 py-2 bg-vs-editor-surface2/80 backdrop-blur-sm rounded-lg border border-vs-editor-border">{currentProject.shortDescription}</p>
        </div>

        {/* Project Image */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-vs-editor-surface to-vs-editor-surface2">
          {currentProject.image && (
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Project Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProject.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons - Restructured to prevent overlap */}
            <div className="flex flex-wrap gap-3">
              {/* View Details Button - Only visible if showDetails is true */}
              {currentProject.showDetails && (
                <button
                  onClick={handleViewDetails}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              )}

              {/* Live Demo Button - Only if available */}
              {currentProject.liveDemo && (
                <a
                  href={currentProject.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}

              {/* GitHub Button - Only if available */}
              {currentProject.githubRepo && (
                <a
                  href={currentProject.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="p-6">
          <p className="text-vs-editor-text2 leading-relaxed">{currentProject.description}</p>
          <div className="mt-4 text-sm text-vs-editor-text3">
            Featured • {new Date(currentProject.date).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Navigation Controls - Only dots indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                ? 'bg-crystal-blue-500 scale-125'
                : 'bg-vs-editor-border hover:bg-vs-editor-text2'
                }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
