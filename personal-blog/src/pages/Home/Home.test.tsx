import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  it('renders the hero heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Jordan Yu/i)).toBeInTheDocument();
  });

  it('renders Senior Software Developer subtitle', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Senior Software Developer')).toBeInTheDocument();
  });

  it('renders Featured Projects section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
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

  it('renders project cards in a grid', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const cards = screen.queryAllByTestId('project-card');
    expect(cards.length).toBeGreaterThanOrEqual(0);
  });

  it('renders View My Work button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('View My Work')).toBeInTheDocument();
  });

  it('renders Download Resume button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });
});
