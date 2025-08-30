import mermaid from 'mermaid';
import React, { useEffect, useState } from 'react';

export interface MermaidDiagramProps {
    chart: string;
    className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = '' }) => {
    const [error, setError] = useState<string | null>(null);
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        // Initialize Mermaid with theme configuration
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            themeVariables: {
                // Use VS Code theme colors for consistency
                primaryColor: '#007acc',
                primaryTextColor: '#cccccc',
                primaryBorderColor: '#007acc',
                lineColor: '#cccccc',
                secondaryColor: '#1e1e1e',
                tertiaryColor: '#252526',
                errorBkgColor: '#f48771',
                errorTextColor: '#ffffff',
                warningBkgColor: '#cca700',
                warningTextColor: '#ffffff',
                infoBkgColor: '#007acc',
                infoTextColor: '#ffffff',
                noteBkgColor: '#252526',
                noteTextColor: '#cccccc',
                noteBorderColor: '#007acc',
                successBkgColor: '#4caf50',
                successTextColor: '#ffffff',
                failureBkgColor: '#f44336',
                failureTextColor: '#ffffff',
                darkMode: true
            }
        });
    }, []);

    useEffect(() => {
        if (!chart) return;

        const renderDiagram = async () => {
            try {
                setError(null);

                // Use mermaid.render instead of mermaid.run for more reliable rendering
                const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
                setSvgContent(svg);
            } catch (err) {
                console.error('Error rendering Mermaid diagram:', err);
                setError(err instanceof Error ? err.message : 'Failed to render diagram');
            }
        };

        renderDiagram();
    }, [chart]);

    if (error) {
        return (
            <div className={`mermaid-error ${className}`.trim()}>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Diagram Error:</strong> {error}
                    <details className="mt-2">
                        <summary className="cursor-pointer text-sm">Show Mermaid Code</summary>
                        <pre className="mt-2 text-xs bg-red-50 p-2 rounded overflow-x-auto">
                            <code>{chart}</code>
                        </pre>
                    </details>
                </div>
            </div>
        );
    }

    if (!svgContent) {
        return (
            <div className={`mermaid-container ${className}`.trim()}>
                <div className="text-center text-gray-500">Rendering diagram...</div>
            </div>
        );
    }

    return (
        <div className={`mermaid-container ${className}`.trim()}>
            <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={{ textAlign: 'center' }}
            />
        </div>
    );
};

export default MermaidDiagram;
