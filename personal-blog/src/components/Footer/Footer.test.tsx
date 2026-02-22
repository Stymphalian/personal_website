import { fireEvent, render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders location text', () => {
    render(<Footer />);
    expect(screen.getByText('Vancouver, Canada')).toBeInTheDocument();
  });

  it('renders email link with correct href', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:jordanyu1992@gmail.com');
  });

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/jordanu92/'
    );
  });

  it('renders GitHub link with correct href', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/stymphalian'
    );
  });

  it('opens LinkedIn in a new tab', () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('opens GitHub in a new tab', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders tools button', () => {
    render(<Footer />);
    expect(screen.getByRole('button', { name: /tools/i })).toBeInTheDocument();
  });

  it('shows Graph Editor link when tools dropdown is opened', () => {
    render(<Footer />);
    const toolsBtn = screen.getByRole('button', { name: /tools/i });
    fireEvent.click(toolsBtn);
    const graphEditorLink = screen.getByRole('link', { name: /graph editor/i });
    expect(graphEditorLink).toHaveAttribute(
      'href',
      'https://blog.jordanyu.com/tools/graph_editor'
    );
    expect(graphEditorLink).toHaveAttribute('target', '_blank');
  });
});
