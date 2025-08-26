import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

// Wrapper component to provide router context for tests
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navigation', () => {
  it('renders navigation component with all menu items', () => {
    renderWithRouter(<Navigation />);
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders desktop navigation menu', () => {
    renderWithRouter(<Navigation />);
    
    const desktopNav = screen.getByRole('navigation');
    expect(desktopNav).toBeInTheDocument();
  });

  it('shows mobile menu button on mobile view', () => {
    renderWithRouter(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    renderWithRouter(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    
    // Initially menu should be closed
    expect(screen.queryByText('Home')).toBeInTheDocument(); // Desktop version
    expect(screen.queryByText('Projects')).toBeInTheDocument(); // Desktop version
    
    // Click to open menu
    fireEvent.click(mobileMenuButton);
    expect(screen.getByRole('button', { name: /close main menu/i })).toBeInTheDocument();
    
    // Click to close menu
    fireEvent.click(mobileMenuButton);
    expect(screen.getByRole('button', { name: /open main menu/i })).toBeInTheDocument();
  });

  it('closes mobile menu when navigation link is clicked', () => {
    renderWithRouter(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    
    // Open menu
    fireEvent.click(mobileMenuButton);
    
    // Click on a mobile navigation link (use getAllByText to get the mobile version)
    const homeLinks = screen.getAllByText('Home');
    const mobileHomeLink = homeLinks[1]; // Second Home link is mobile version
    fireEvent.click(mobileHomeLink);
    
    // Menu should be closed
    expect(screen.getByRole('button', { name: /open main menu/i })).toBeInTheDocument();
  });

  it('has proper navigation links with correct hrefs', () => {
    renderWithRouter(<Navigation />);
    
    const homeLink = screen.getByText('Home');
    const projectsLink = screen.getByText('Projects');
    const blogLink = screen.getByText('Blog');
    const contactLink = screen.getByText('Contact');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(blogLink).toHaveAttribute('href', '/blog');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('applies active state styling to current page', () => {
    renderWithRouter(<Navigation />);
    
    // Since we're on the root path in tests, Home should be active
    const homeLinks = screen.getAllByText('Home');
    const desktopHomeLink = homeLinks[0];
    expect(desktopHomeLink).toHaveClass('text-blue-600', 'bg-blue-50');
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Open menu
    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('has enhanced mobile menu styling', () => {
    renderWithRouter(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(mobileMenuButton);
    
    // Check for enhanced mobile menu elements - look for the container with the specific classes
    const mobileMenuContainer = screen.getByText('Navigation').parentElement?.parentElement;
    expect(mobileMenuContainer).toHaveClass('w-64', 'h-full', 'bg-white', 'shadow-xl');
  });

  it('shows mobile menu header and footer', () => {
    renderWithRouter(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(mobileMenuButton);
    
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Swipe left to close')).toBeInTheDocument();
  });

  it('prevents body scroll when mobile menu is open', () => {
    renderWithRouter(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    
    // Open menu
    fireEvent.click(mobileMenuButton);
    expect(document.body.style.overflow).toBe('hidden');
    
    // Close menu
    fireEvent.click(mobileMenuButton);
    expect(document.body.style.overflow).toBe('unset');
  });
});
