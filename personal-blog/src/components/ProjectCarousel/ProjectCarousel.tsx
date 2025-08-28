import { ChevronLeft, ChevronRight, ExternalLink, Eye, Github } from 'lucide-react';
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

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

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
      <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
        {/* Project Image */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-100 to-blue-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl text-gray-400">🖼️</div>
          </div>
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
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentProject.title}</h3>
            <p className="text-lg text-gray-200 mb-4">{currentProject.shortDescription}</p>

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
              {/* View Details Button - Always visible */}
              <button
                onClick={handleViewDetails}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>

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
          <p className="text-gray-600 leading-relaxed">{currentProject.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Featured • {new Date(currentProject.date).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Navigation Controls - Repositioned to avoid overlap */}
      {projects.length > 1 && (
        <>
          {/* Previous/Next Buttons - Moved to avoid overlapping with action buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/3 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/3 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCarousel;
