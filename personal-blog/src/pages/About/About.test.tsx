import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

describe('About', () => {
  it('does not render an About heading', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.queryByRole('heading', { name: 'About' })).not.toBeInTheDocument();
  });

  it('does not render coming soon text', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });

  it('renders placeholder bio content', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText(/Vancouver, Canada/i)).toBeInTheDocument();
  });
});
