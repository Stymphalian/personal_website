import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  it('renders the hero bio paragraph', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/software engineer by trade/i)).toBeInTheDocument();
  });

  it('does not render Senior Software Developer subtitle', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(
      screen.queryByText('Senior Software Developer')
    ).not.toBeInTheDocument();
  });

  it('renders Projects section heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('does not render Featured Projects heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText('Featured Projects')).not.toBeInTheDocument();
  });

  it('does not render Technical Expertise section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText('Technical Expertise')).not.toBeInTheDocument();
  });

  it('does not render Professional Experience section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(
      screen.queryByText('Professional Experience')
    ).not.toBeInTheDocument();
  });

  it('does not render the project carousel', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('project-carousel')).not.toBeInTheDocument();
  });

  it('does not render View My Work button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText('View My Work')).not.toBeInTheDocument();
  });

  it('does not render Download Resume button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText('Download Resume')).not.toBeInTheDocument();
  });
});
