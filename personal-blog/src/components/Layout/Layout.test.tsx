import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders children content correctly', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default maxWidth and padding classes', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('max-w-2xl', 'px-8', 'py-12');
  });

  it('applies custom maxWidth classes correctly', () => {
    render(
      <Layout maxWidth="lg">
        <div>Content</div>
      </Layout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('max-w-lg');
  });

  it('applies custom padding classes correctly', () => {
    render(
      <Layout padding="xl">
        <div>Content</div>
      </Layout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('px-12', 'py-16');
  });

  it('shows page title when showPageTitle is true', () => {
    render(
      <Layout showPageTitle pageTitle="Test Page" pageDescription="Test Description">
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('does not show page title when showPageTitle is false', () => {
    render(
      <Layout pageTitle="Test Page" pageDescription="Test Description">
        <div>Content</div>
      </Layout>
    );

    expect(screen.queryByText('Test Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(
      <Layout className="custom-class">
        <div>Content</div>
      </Layout>
    );

    // The custom class is applied to the outermost div (Parent 4)
    const layoutDiv = screen.getByText('Content').closest('div')?.parentElement?.parentElement?.parentElement?.parentElement;
    expect(layoutDiv).toHaveClass('custom-class');
  });

  it('renders footer with correct text', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByText('2025. Built with React & Tailwind & Cursor')).toBeInTheDocument();
  });

  it('applies correct maxWidth classes for different sizes', () => {
    const { rerender } = render(
      <Layout maxWidth="sm">
        <div>Content</div>
      </Layout>
    );

    let mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('max-w-sm');

    rerender(
      <Layout maxWidth="full">
        <div>Content</div>
      </Layout>
    );

    mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('max-w-full');
  });

  it('applies correct padding classes for different sizes', () => {
    const { rerender } = render(
      <Layout padding="sm">
        <div>Content</div>
      </Layout>
    );

    let mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('px-4', 'py-6');

    rerender(
      <Layout padding="none">
        <div>Content</div>
      </Layout>
    );

    mainElement = screen.getByRole('main');
    expect(mainElement).not.toHaveClass('px-4', 'py-6');
  });

  it('renders page header with correct styling when enabled', () => {
    render(
      <Layout showPageTitle pageTitle="Test Page" pageDescription="Test Description">
        <div>Content</div>
      </Layout>
    );

    const pageTitle = screen.getByText('Test Page');
    const pageDescription = screen.getByText('Test Description');

    expect(pageTitle).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold', 'text-gray-900');
    expect(pageDescription).toHaveClass('text-lg', 'text-gray-600');
  });

  it('maintains consistent structure across different configurations', () => {
    render(
      <Layout maxWidth="xl" padding="md" showPageTitle pageTitle="Test">
        <div>Content</div>
      </Layout>
    );

    // Check that main content is properly contained
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('max-w-xl', 'px-6', 'py-8');

    // Check that content is wrapped in white container (Parent 1 with p-6 md:p-8)
    const contentContainer = screen.getByText('Content').parentElement;
    expect(contentContainer).toHaveClass('p-6', 'md:p-8');
  });
});
