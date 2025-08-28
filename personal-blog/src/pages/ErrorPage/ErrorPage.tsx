import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
    error?: Error | string;
    errorType?: 'not-found' | 'content-error' | 'network-error' | 'malformed-content' | 'generic';
    title?: string;
    message?: string;
    showHomeButton?: boolean;
    showBackButton?: boolean;
    className?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
    error,
    errorType = 'generic',
    title,
    message,
    showHomeButton = true,
    showBackButton = true,
    className = ''
}) => {
    const navigate = useNavigate();

    // Determine error details from props
    const errorDetails = error;
    const errorMessage = message || (errorDetails instanceof Error ? errorDetails.message : String(errorDetails));

    // Get error-specific content
    const getErrorContent = () => {
        switch (errorType) {
            case 'not-found':
                return {
                    title: title || 'Page Not Found',
                    message: message || 'The page you\'re looking for doesn\'t exist.',
                    icon: '🔍',
                    suggestions: [
                        'Check the URL for typos',
                        'Use the navigation menu to find what you need',
                        'Try searching for content'
                    ]
                };
            case 'content-error':
                return {
                    title: title || 'Content Error',
                    message: message || 'There was a problem loading the requested content.',
                    icon: '📄',
                    suggestions: [
                        'Try refreshing the page',
                        'Check your internet connection'
                    ]
                };
            case 'network-error':
                return {
                    title: title || 'Network Error',
                    message: message || 'Unable to connect to the server.',
                    icon: '🌐',
                    suggestions: [
                        'Check your internet connection',
                        'Try again in a few moments',
                        'Check if the service is available'
                    ]
                };
            case 'malformed-content':
                return {
                    title: title || 'Content Format Error',
                    message: message || 'The requested content has formatting issues.',
                    icon: '⚠️',
                    suggestions: [
                        'Try refreshing the page',
                        'Report this issue to support',
                        'Try accessing other content'
                    ]
                };
            default:
                return {
                    title: title || 'Something Went Wrong',
                    message: message || 'An unexpected error occurred.',
                    icon: '❌',
                    suggestions: [
                        'Try refreshing the page',
                        'Clear your browser cache'
                    ]
                };
        }
    };

    const errorContent = getErrorContent();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={`min-h-screen bg-vs-editor-bg flex items-center justify-center px-4 ${className}`}>
            <div className="max-w-md w-full bg-vs-editor-surface rounded-lg shadow-lg p-8 text-center">
                {/* Error Icon */}
                <div className="text-6xl mb-4">{errorContent.icon}</div>

                {/* Error Title */}
                <h1 className="text-2xl font-bold text-vs-editor-text mb-4">
                    {errorContent.title}
                </h1>

                {/* Error Message */}
                <p className="text-vs-editor-text2 mb-6">
                    {errorContent.message}
                </p>

                {/* Error Details (if available) */}
                {errorMessage && errorMessage !== errorContent.message && (
                    <div className="bg-vs-editor-surface2 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-vs-editor-text font-medium mb-2">Error Details:</p>
                        <p className="text-sm text-vs-editor-text2 font-mono break-words">
                            {errorMessage}
                        </p>
                    </div>
                )}

                {/* Suggestions */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-vs-editor-text mb-3">Try these solutions:</h3>
                    <ul className="text-sm text-vs-editor-text2 space-y-1">
                        {errorContent.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-center justify-center">
                                <span className="text-crystal-blue-400 mr-2">•</span>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {showBackButton && (
                        <button
                            onClick={handleGoBack}
                            className="px-4 py-2 bg-vs-editor-surface2 text-vs-editor-text rounded-lg hover:bg-vs-editor-hover transition-colors"
                        >
                            Go Back
                        </button>
                    )}
                    {showHomeButton && (
                        <button
                            onClick={handleGoHome}
                            className="px-4 py-2 bg-crystal-blue-600 text-white rounded-lg hover:bg-crystal-blue-700 transition-colors"
                        >
                            Go Home
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
