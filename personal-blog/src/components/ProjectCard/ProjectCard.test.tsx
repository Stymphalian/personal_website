
import { fireEvent, render, screen } from '@testing-library/react';
import type { Project } from '../../data';
import ProjectCard from './ProjectCard';

// Mock project data for testing
const mockProject: Project = {
  id: 'test-project-1',
  title: 'Test Project',
  description: 'This is a test project description that should be displayed in the card.',
  shortDescription: 'Test project',
  image: '/test-image.jpg',
  techStack: ['React', 'TypeScript', 'Tailwind CSS'],
  featured: true,
  date: '2024-01-15',
  liveDemo: 'https://example.com',
  githubRepo: 'https://github.com/example/test'
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description that should be displayed in the card.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('displays project image with correct alt text', () => {
    render(<ProjectCard project={mockProject} />);
    
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('shows fallback emoji when image fails to load', () => {
    render(<ProjectCard project={mockProject} />);
    
    const image = screen.getByAltText('Test Project');
    const fallback = screen.getByText('🚀');
    
    // Initially hidden
    expect(fallback).toHaveClass('hidden');
    
    // Simulate image load error
    fireEvent.error(image);
    
    // Fallback should now be visible
    expect(fallback).not.toHaveClass('hidden');
  });

  it('calls onViewDetails when View Details button is clicked', () => {
    const mockOnViewDetails = jest.fn();
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const viewDetailsButton = screen.getByText('View Details');
    fireEvent.click(viewDetailsButton);
    
    expect(mockOnViewDetails).toHaveBeenCalledWith('test-project-1');
  });

  it('does not call onViewDetails when callback is not provided', () => {
    const mockOnViewDetails = jest.fn();
    render(<ProjectCard project={mockProject} />);
    
    const viewDetailsButton = screen.getByText('View Details');
    fireEvent.click(viewDetailsButton);
    
    expect(mockOnViewDetails).not.toHaveBeenCalled();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<ProjectCard project={mockProject} className={customClass} />);
    
    const card = screen.getByTestId('project-card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders tech stack tags correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    mockProject.techStack.forEach(tech => {
      const techTag = screen.getByText(tech);
      expect(techTag).toBeInTheDocument();
      expect(techTag).toHaveClass('px-2', 'sm:px-3', 'py-1', 'bg-blue-100', 'text-blue-800');
    });
  });

  it('formats date correctly', () => {
    const projectWithDifferentDate: Project = {
      ...mockProject,
      date: '2024-12-25'
    };
    
    render(<ProjectCard project={projectWithDifferentDate} />);
    
    expect(screen.getByText('December 2024')).toBeInTheDocument();
  });

  it('handles empty tech stack', () => {
    const projectWithNoTech: Project = {
      ...mockProject,
      techStack: []
    };
    
    render(<ProjectCard project={projectWithNoTech} />);
    
    // Should not crash and should still show other project info
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });
});
