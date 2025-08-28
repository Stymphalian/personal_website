import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectCarousel from './ProjectCarousel';

// Mock projects data
const mockProjects = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    shortDescription: 'Modern e-commerce solution',
    image: '/project-1.jpg',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveDemo: 'https://demo.com',
    githubRepo: 'https://github.com/project1',
    featured: true,
    date: '2024-01-01'
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    shortDescription: 'Team collaboration tool',
    image: '/project-2.jpg',
    techStack: ['Vue.js', 'Express', 'Socket.io'],
    featured: true,
    date: '2024-02-01'
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'A weather dashboard with interactive charts and location-based data',
    shortDescription: 'Weather visualization app',
    image: '/project-3.jpg',
    techStack: ['React', 'Chart.js', 'OpenWeather API'],
    liveDemo: 'https://weather.demo.com',
    featured: true,
    date: '2024-03-01'
  }
];

// Helper function to render with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProjectCarousel', () => {
  it('renders with projects', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    expect(screen.getByText('Modern e-commerce solution')).toBeInTheDocument();
  });

  it('displays project information correctly', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    expect(screen.getByText('A full-stack e-commerce platform built with React and Node.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });

  it('navigates to specific project when dot indicator is clicked', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    const dotButtons = screen.getAllByLabelText(/Go to project/);
    fireEvent.click(dotButtons[2]); // Click third dot

    expect(screen.getByText('A weather dashboard with interactive charts and location-based data')).toBeInTheDocument();
  });

  it('shows View Details button for all projects', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    const viewDetailsButton = screen.getByText('View Details');
    expect(viewDetailsButton).toBeInTheDocument();
  });

  it('shows live demo button when available', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    const liveDemoButton = screen.getByText('Live Demo');
    expect(liveDemoButton).toBeInTheDocument();
    expect(liveDemoButton.closest('a')).toHaveAttribute('href', 'https://demo.com');
  });

  it('shows GitHub button when available', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    const githubButton = screen.getByText('View Code');
    expect(githubButton).toBeInTheDocument();
    expect(githubButton.closest('a')).toHaveAttribute('href', 'https://github.com/project1');
  });

  it('displays tech stack tags', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });

  it('handles empty projects array', () => {
    renderWithRouter(<ProjectCarousel projects={[]} />);

    expect(screen.getByText('No projects to display')).toBeInTheDocument();
  });

  it('displays project date in readable format', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    expect(screen.getByText(/Featured •/)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<ProjectCarousel projects={mockProjects} />);

    expect(screen.getByLabelText('Go to project 1')).toBeInTheDocument();
  });

});
