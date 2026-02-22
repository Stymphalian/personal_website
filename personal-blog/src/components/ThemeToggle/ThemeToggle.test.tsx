import { fireEvent, render, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Reset html class and localStorage before each test
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('renders with moon icon when in light mode', () => {
    document.documentElement.classList.remove('dark');
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('renders with sun icon when in dark mode', () => {
    document.documentElement.classList.add('dark');
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('toggles from dark to light on click', () => {
    document.documentElement.classList.add('dark');
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('toggles from light to dark on click', () => {
    document.documentElement.classList.remove('dark');
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('persists dark preference to localStorage', () => {
    document.documentElement.classList.add('dark');
    render(<ThemeToggle />);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('persists light preference to localStorage after toggle', () => {
    document.documentElement.classList.add('dark');
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('removes dark class from html element when switching to light', () => {
    document.documentElement.classList.add('dark');
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('adds dark class to html element when switching to dark', () => {
    document.documentElement.classList.remove('dark');
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
