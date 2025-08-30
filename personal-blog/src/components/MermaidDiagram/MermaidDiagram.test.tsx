import { render } from '@testing-library/react';
import MermaidDiagram from './MermaidDiagram';

// Mock mermaid
jest.mock('mermaid', () => ({
    initialize: jest.fn(),
    render: jest.fn().mockResolvedValue({ svg: '<svg>Test SVG</svg>' })
}));

describe('MermaidDiagram', () => {
    const mockChart = `
    graph TD
      A[Start] --> B[End]
  `;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        const { container } = render(<MermaidDiagram chart={mockChart} />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <MermaidDiagram chart={mockChart} className="custom-class" />
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('initializes mermaid with correct configuration', () => {
        const mermaid = require('mermaid');
        render(<MermaidDiagram chart={mockChart} />);

        expect(mermaid.initialize).toHaveBeenCalledWith({
            startOnLoad: false,
            theme: 'default',
            themeVariables: expect.objectContaining({
                primaryColor: '#007acc',
                darkMode: true
            })
        });
    });

    it('handles empty chart gracefully', () => {
        const { container } = render(<MermaidDiagram chart="" />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
