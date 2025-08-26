import { render, screen } from '@testing-library/react';
import Headshot from './Headshot';

// Mock image loading
const mockImage = {
  complete: false,
  naturalWidth: 0,
  naturalHeight: 0,
  onload: null as any,
  onerror: null as any,
  src: '',
};

// Mock Image constructor
global.Image = class {
  complete = false;
  naturalWidth = 0;
  naturalHeight = 0;
  onload: any = null;
  onerror: any = null;
  src = '';
  
  constructor() {
    setTimeout(() => {
      if (this.onload) {
        this.onload();
      }
    }, 0);
    return mockImage;
  }
} as any;

describe('Headshot', () => {
  it('renders with default props', () => {
    render(<Headshot alt="Professional headshot" />);
    
    const fallback = screen.getByText('👨‍💻');
    expect(fallback).toBeInTheDocument();
  });

  it('displays fallback emoji when no image source is provided', () => {
    render(<Headshot alt="Professional headshot" />);
    
    const fallback = screen.getByText('👨‍💻');
    expect(fallback).toBeInTheDocument();
  });

  it('displays custom fallback emoji', () => {
    render(<Headshot alt="Professional headshot" fallbackEmoji="😊" />);
    
    const fallback = screen.getByText('😊');
    expect(fallback).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Headshot alt="Test" size="sm" />);
    let container = screen.getByText('👨‍💻').parentElement?.parentElement;
    expect(container).toHaveClass('w-24', 'h-24');

    rerender(<Headshot alt="Test" size="md" />);
    container = screen.getByText('👨‍💻').parentElement?.parentElement;
    expect(container).toHaveClass('w-32', 'h-32');

    rerender(<Headshot alt="Test" size="lg" />);
    container = screen.getByText('👨‍💻').parentElement?.parentElement;
    expect(container).toHaveClass('w-48', 'h-48');

    rerender(<Headshot alt="Test" size="xl" />);
    container = screen.getByText('👨‍💻').parentElement?.parentElement;
    expect(container).toHaveClass('w-64', 'h-64');
  });

  it('applies custom className', () => {
    render(<Headshot alt="Test" className="custom-class" />);
    
    const container = screen.getByText('👨‍💻').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('shows loading spinner when image is loading', () => {
    render(<Headshot alt="Test" src="/test-image.jpg" />);
    
    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
  });

  it('handles image load success', () => {
    render(<Headshot alt="Test" src="/test-image.jpg" />);
    
    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
  });

  it('handles image load error gracefully', () => {
    // Mock image error
    const originalImage = global.Image;
    global.Image = class {
      complete = false;
      naturalWidth = 0;
      naturalHeight = 0;
      onload: any = null;
      onerror: any = null;
      src = '';
      
      constructor() {
        setTimeout(() => {
          if (this.onerror) {
            this.onerror();
          }
        }, 0);
        return mockImage;
      }
    } as any;

    render(<Headshot alt="Test" src="/invalid-image.jpg" />);
    
    // Should show fallback after error
    const fallback = screen.getByText('👨‍💻');
    expect(fallback).toBeInTheDocument();

    // Restore original Image
    global.Image = originalImage;
  });

  it('has proper accessibility attributes', () => {
    render(<Headshot alt="Professional headshot" src="/test-image.jpg" />);
    
    const image = screen.getByAltText('Professional headshot');
    expect(image).toHaveAttribute('alt', 'Professional headshot');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('applies proper styling classes', () => {
    render(<Headshot alt="Test" />);
    
    const container = screen.getByText('👨‍💻').parentElement?.parentElement;
    expect(container).toHaveClass('relative');
    
    const innerDiv = screen.getByText('👨‍💻').parentElement;
    expect(innerDiv).toHaveClass('rounded-full', 'shadow-lg');
  });
});
