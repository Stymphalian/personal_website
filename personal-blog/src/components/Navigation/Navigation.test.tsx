import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navigation', () => {
  it('renders "Jordan Yu" brand link pointing to /', () => {
    renderWithRouter(<Navigation />);

    const brand = screen.getByText('Jordan Yu');
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute('href', '/');
  });

  it('renders Projects and About nav links', () => {
    renderWithRouter(<Navigation />);

    expect(screen.getAllByText('Projects')[0]).toHaveAttribute(
      'href',
      '/projects'
    );
    expect(screen.getAllByText('About')[0]).toHaveAttribute('href', '/about');
  });

  it('renders Resume link that opens in a new tab', () => {
    renderWithRouter(<Navigation />);

    const resumeLinks = screen.getAllByText('Resume');
    // Desktop resume link is the first occurrence
    expect(resumeLinks[0]).toHaveAttribute('href', '/resume.pdf');
    expect(resumeLinks[0]).toHaveAttribute('target', '_blank');
  });

  it('does not render Home, Contact, or Tools nav items', () => {
    renderWithRouter(<Navigation />);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Contact')).not.toBeInTheDocument();
    expect(screen.queryByText('Tools')).not.toBeInTheDocument();
  });

  it('renders the ThemeToggle button', () => {
    renderWithRouter(<Navigation />);

    const toggleButtons = screen.getAllByRole('button', {
      name: /switch to (light|dark) mode/i,
    });
    expect(toggleButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders navigation component', () => {
    renderWithRouter(<Navigation />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows mobile menu button', () => {
    renderWithRouter(<Navigation />);

    const mobileMenuButton = screen.getByRole('button', {
      name: /open main menu/i,
    });
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    renderWithRouter(<Navigation />);

    const mobileMenuButton = screen.getByRole('button', {
      name: /open main menu/i,
    });

    // Open menu
    fireEvent.click(mobileMenuButton);
    expect(
      screen.getByRole('button', { name: /close main menu/i })
    ).toBeInTheDocument();

    // Close menu
    fireEvent.click(mobileMenuButton);
    expect(
      screen.getByRole('button', { name: /open main menu/i })
    ).toBeInTheDocument();
  });

  it('closes mobile menu when a navigation link is clicked', () => {
    renderWithRouter(<Navigation />);

    const mobileMenuButton = screen.getByRole('button', {
      name: /open main menu/i,
    });
    fireEvent.click(mobileMenuButton);

    // Click the mobile Projects link (last occurrence is the mobile one)
    const projectsLinks = screen.getAllByText('Projects');
    fireEvent.click(projectsLinks[projectsLinks.length - 1]);

    expect(
      screen.getByRole('button', { name: /open main menu/i })
    ).toBeInTheDocument();
  });

  it('has proper accessibility attributes on hamburger button', () => {
    renderWithRouter(<Navigation />);

    const mobileMenuButton = screen.getByRole('button', {
      name: /open main menu/i,
    });
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('prevents body scroll when mobile menu is open', () => {
    renderWithRouter(<Navigation />);

    const mobileMenuButton = screen.getByRole('button', {
      name: /open main menu/i,
    });

    fireEvent.click(mobileMenuButton);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(mobileMenuButton);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('shows mobile menu header and footer text', () => {
    renderWithRouter(<Navigation />);

    const mobileMenuButton = screen.getByRole('button', {
      name: /open main menu/i,
    });
    fireEvent.click(mobileMenuButton);

    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Swipe left to close')).toBeInTheDocument();
  });

  it('shows Projects, About, and Resume in the mobile menu', () => {
    renderWithRouter(<Navigation />);

    const mobileMenuButton = screen.getByRole('button', {
      name: /open main menu/i,
    });
    fireEvent.click(mobileMenuButton);

    expect(screen.getAllByText('Projects').length).toBeGreaterThan(1);
    expect(screen.getAllByText('About').length).toBeGreaterThan(1);
    expect(screen.getAllByText('Resume').length).toBeGreaterThan(1);
  });
});
