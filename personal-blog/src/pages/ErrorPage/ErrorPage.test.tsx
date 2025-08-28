import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
const mockUseRouteError = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useRouteError: () => mockUseRouteError()
}));

// Mock Headshot component
jest.mock('../../components/Headshot', () => ({
    Headshot: () => <div data-testid="headshot">Headshot</div>
}));

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('ErrorPage', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockUseRouteError.mockReturnValue(null);
    });

    describe('Default Error Page', () => {
        it('renders with default generic error content', () => {
            renderWithRouter(<ErrorPage />);

            expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
            expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument();
            expect(screen.getByText('❌')).toBeInTheDocument();
        });

        it('shows default suggestions for generic errors', () => {
            renderWithRouter(<ErrorPage />);

            expect(screen.getByText('Try refreshing the page')).toBeInTheDocument();
            expect(screen.getByText('Clear your browser cache')).toBeInTheDocument();
            expect(screen.getByText('Contact support if the problem persists')).toBeInTheDocument();
        });
    });

    describe('Error Types', () => {
        it('renders not-found error correctly', () => {
            renderWithRouter(<ErrorPage errorType="not-found" />);

            expect(screen.getByText('Page Not Found')).toBeInTheDocument();
            expect(screen.getByText('The page you\'re looking for doesn\'t exist.')).toBeInTheDocument();
            expect(screen.getByText('🔍')).toBeInTheDocument();
        });

        it('renders content-error correctly', () => {
            renderWithRouter(<ErrorPage errorType="content-error" />);

            expect(screen.getByText('Content Error')).toBeInTheDocument();
            expect(screen.getByText('There was a problem loading the requested content.')).toBeInTheDocument();
            expect(screen.getByText('📄')).toBeInTheDocument();
        });

        it('renders network-error correctly', () => {
            renderWithRouter(<ErrorPage errorType="network-error" />);

            expect(screen.getByText('Network Error')).toBeInTheDocument();
            expect(screen.getByText('Unable to connect to the server.')).toBeInTheDocument();
            expect(screen.getByText('🌐')).toBeInTheDocument();
        });

        it('renders malformed-content error correctly', () => {
            renderWithRouter(<ErrorPage errorType="malformed-content" />);

            expect(screen.getByText('Content Format Error')).toBeInTheDocument();
            expect(screen.getByText('The requested content has formatting issues.')).toBeInTheDocument();
            expect(screen.getByText('⚠️')).toBeInTheDocument();
        });
    });

    describe('Custom Error Messages', () => {
        it('renders custom title and message', () => {
            renderWithRouter(
                <ErrorPage
                    title="Custom Error Title"
                    message="Custom error message"
                />
            );

            expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
            expect(screen.getByText('Custom error message')).toBeInTheDocument();
        });

        it('overrides error type content with custom messages', () => {
            renderWithRouter(
                <ErrorPage
                    errorType="not-found"
                    title="Custom 404"
                    message="Custom 404 message"
                />
            );

            expect(screen.getByText('Custom 404')).toBeInTheDocument();
            expect(screen.getByText('Custom 404 message')).toBeInTheDocument();
        });
    });

    describe('Error Details Display', () => {
        it('shows error details when provided', () => {
            const errorMessage = 'Detailed error information';
            renderWithRouter(<ErrorPage error={errorMessage} />);

            expect(screen.getByText('Error Details:')).toBeInTheDocument();
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });

        it('shows error details from Error object', () => {
            const error = new Error('Test error message');
            renderWithRouter(<ErrorPage error={error} />);

            expect(screen.getByText('Error Details:')).toBeInTheDocument();
            expect(screen.getByText('Test error message')).toBeInTheDocument();
        });

        it('does not show error details when message matches default', () => {
            renderWithRouter(<ErrorPage error="An unexpected error occurred." />);

            expect(screen.queryByText('Error Details:')).not.toBeInTheDocument();
        });

        it('shows route error when available', () => {
            const routeError = 'Route error message';
            mockUseRouteError.mockReturnValue(routeError);

            renderWithRouter(<ErrorPage />);

            expect(screen.getByText('Error Details:')).toBeInTheDocument();
            expect(screen.getByText(routeError)).toBeInTheDocument();
        });
    });

    describe('Navigation Actions', () => {
        it('navigates to home when Go Home button is clicked', () => {
            renderWithRouter(<ErrorPage />);

            const homeButton = screen.getByText('Go Home');
            fireEvent.click(homeButton);

            expect(mockNavigate).toHaveBeenCalledWith('/');
        });

        it('navigates back when Go Back button is clicked', () => {
            renderWithRouter(<ErrorPage />);

            const backButton = screen.getByText('Go Back');
            fireEvent.click(backButton);

            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });

        it('navigates to contact page when Contact Support is clicked', () => {
            renderWithRouter(<ErrorPage />);

            const contactButton = screen.getByText('Contact Support');
            fireEvent.click(contactButton);

            expect(mockNavigate).toHaveBeenCalledWith('/contact');
        });
    });

    describe('Button Visibility', () => {
        it('shows both buttons by default', () => {
            renderWithRouter(<ErrorPage />);

            expect(screen.getByText('Go Back')).toBeInTheDocument();
            expect(screen.getByText('Go Home')).toBeInTheDocument();
        });

        it('hides Go Back button when showBackButton is false', () => {
            renderWithRouter(<ErrorPage showBackButton={false} />);

            expect(screen.queryByText('Go Back')).not.toBeInTheDocument();
            expect(screen.getByText('Go Home')).toBeInTheDocument();
        });

        it('hides Go Home button when showHomeButton is false', () => {
            renderWithRouter(<ErrorPage showHomeButton={false} />);

            expect(screen.getByText('Go Back')).toBeInTheDocument();
            expect(screen.queryByText('Go Home')).not.toBeInTheDocument();
        });

        it('hides both buttons when both are false', () => {
            renderWithRouter(
                <ErrorPage showBackButton={false} showHomeButton={false} />
            );

            expect(screen.queryByText('Go Back')).not.toBeInTheDocument();
            expect(screen.queryByText('Go Home')).not.toBeInTheDocument();
        });
    });

    describe('Custom Styling', () => {
        it('applies custom className', () => {
            renderWithRouter(<ErrorPage className="custom-class" />);

            const container = screen.getByText('Something Went Wrong').closest('.min-h-screen');
            expect(container).toHaveClass('custom-class');
        });
    });

    describe('Accessibility', () => {
        it('has proper heading structure', () => {
            renderWithRouter(<ErrorPage />);

            const h1 = screen.getByRole('heading', { level: 1 });
            expect(h1).toHaveTextContent('Something Went Wrong');

            const h3 = screen.getByRole('heading', { level: 3 });
            expect(h3).toHaveTextContent('Try these solutions:');
        });

        it('has clickable buttons', () => {
            renderWithRouter(<ErrorPage />);

            expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Go Home' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Contact Support' })).toBeInTheDocument();
        });
    });
});
