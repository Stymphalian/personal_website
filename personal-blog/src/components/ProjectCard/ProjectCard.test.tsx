import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Project } from '../../data';
import ProjectCard from './ProjectCard';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

// Mock project data for testing
const mockProject: Project = {
  id: 'test-project-1',
  title: 'Test Project',
  slug: 'test-project-1',
  description:
    'This is a test project description that should be displayed in the card.',
  shortDescription: 'Test project',
  image: '/test-image.jpg',
  techStack: ['React', 'TypeScript', 'Tailwind CSS'],
  featured: true,
  date: '2024-01-15',
  liveDemo: 'https://example.com',
  githubRepo: 'https://github.com/example/test',
  tags: ['React', 'TypeScript', 'Web Development'],
  showDetails: true,
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    renderWithRouter(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This is a test project description that should be displayed in the card.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('displays project image with correct alt text', () => {
    renderWithRouter(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('wraps image in a link to the project detail page', () => {
    renderWithRouter(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText('Test Project');
    const link = image.closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/projects/test-project-1');
  });

  it('shows fallback emoji when image fails to load', () => {
    renderWithRouter(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText('Test Project');
    const fallback = screen.getByText('🚀');

    // Initially hidden
    expect(fallback).toHaveClass('hidden');

    // Simulate image load error
    fireEvent.error(image);

    // Fallback should now be visible
    expect(fallback).not.toHaveClass('hidden');
  });

  it('does not render a View Details button', () => {
    renderWithRouter(<ProjectCard project={mockProject} />);
    expect(screen.queryByText('View Details')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    renderWithRouter(<ProjectCard project={mockProject} className={customClass} />);

    const card = screen.getByTestId('project-card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders tech stack tags correctly', () => {
    renderWithRouter(<ProjectCard project={mockProject} />);

    mockProject.techStack.forEach((tech: string) => {
      const techTag = screen.getByText(tech);
      expect(techTag).toBeInTheDocument();
      expect(techTag).toHaveClass(
        'px-2',
        'sm:px-3',
        'py-1',
        'bg-crystal-blue-500/20',
        'text-crystal-blue-400'
      );
    });
  });

  it('formats date correctly', () => {
    const projectWithDifferentDate: Project = {
      ...mockProject,
      date: '2024-12-25',
    };

    renderWithRouter(<ProjectCard project={projectWithDifferentDate} />);

    expect(screen.getByText('December 2024')).toBeInTheDocument();
  });

  it('handles empty tech stack', () => {
    const projectWithNoTech: Project = {
      ...mockProject,
      techStack: [],
    };

    renderWithRouter(<ProjectCard project={projectWithNoTech} />);

    // Should not crash and should still show other project info
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});
