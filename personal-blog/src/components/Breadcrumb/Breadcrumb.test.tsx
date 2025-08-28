import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb';

// Wrapper component to provide router context for tests
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Breadcrumb', () => {
  const mockItems: BreadcrumbItem[] = [
    { label: 'Projects', path: '/projects' },
    { label: 'Project Name', isCurrent: true }
  ];

  it('renders without crashing', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('renders home icon as first item', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    const homeLink = screen.getByLabelText('Go to home page');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders all breadcrumb items', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Project Name')).toBeInTheDocument();
  });

  it('renders clickable links for items with paths', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    const projectsLink = screen.getByText('Projects');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(projectsLink).toHaveClass('text-vs-editor-text2', 'hover:text-vs-editor-text', 'transition-colors');
  });

  it('renders current page item without link', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    const currentItem = screen.getByText('Project Name');
    expect(currentItem).toHaveClass('text-vs-editor-text', 'font-medium');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders separator chevrons between items', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    const chevrons = screen.getAllByTestId('chevron-right');
    expect(chevrons).toHaveLength(2); // One after home, one after Projects
  });

  it('handles empty items array', () => {
    renderWithRouter(<Breadcrumb items={[]} />);
    
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to home page')).toBeInTheDocument();
    // Should only show home icon with no separators
    expect(screen.queryByTestId('chevron-right')).not.toBeInTheDocument();
  });

  it('handles items without paths', () => {
    const itemsWithoutPaths: BreadcrumbItem[] = [
      { label: 'Section' },
      { label: 'Current Page', isCurrent: true }
    ];
    
    renderWithRouter(<Breadcrumb items={itemsWithoutPaths} />);
    
    const sectionItem = screen.getByText('Section');
    expect(sectionItem).toHaveClass('text-vs-editor-text2');
    expect(sectionItem).not.toHaveAttribute('href');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-breadcrumb-class';
    renderWithRouter(<Breadcrumb items={mockItems} className={customClass} />);
    
    const nav = screen.getByLabelText('Breadcrumb');
    expect(nav).toHaveClass('custom-breadcrumb-class');
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    const nav = screen.getByLabelText('Breadcrumb');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    
    const homeLink = screen.getByLabelText('Go to home page');
    expect(homeLink).toHaveAttribute('aria-label', 'Go to home page');
  });

  it('renders complex breadcrumb structure', () => {
    const complexItems: BreadcrumbItem[] = [
      { label: 'Category', path: '/category' },
      { label: 'Subcategory', path: '/category/subcategory' },
      { label: 'Item', path: '/category/subcategory/item' },
      { label: 'Current Page', isCurrent: true }
    ];
    
    renderWithRouter(<Breadcrumb items={complexItems} />);
    
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Subcategory')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
    
    // Should have 4 chevrons (after home, category, subcategory, item)
    const chevrons = screen.getAllByTestId('chevron-right');
    expect(chevrons).toHaveLength(4);
  });
});
