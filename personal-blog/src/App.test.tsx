import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window.scrollTo for Jest environment
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Check for Navigation component instead of main role
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
