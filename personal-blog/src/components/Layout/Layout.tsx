import React, { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  showPageTitle?: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className = '',
  maxWidth = '2xl',
  padding = 'lg',
  showPageTitle = false,
  pageTitle = '',
  pageDescription = ''
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-6',
    md: 'px-6 py-8',
    lg: 'px-8 py-12',
    xl: 'px-12 py-16'
  };

  return (
    <div className={`min-h-screen bg-vs-editor-bg pt-16 ${className}`}>
      {/* Page Header Section */}
      {showPageTitle && (
        <div className="bg-vs-editor-surface border-b border-vs-editor-border shadow-sm">
          <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-vs-editor-text mb-2">
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-lg text-vs-editor-text2 max-w-2xl mx-auto">
                  {pageDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <main className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
        <div className="bg-vs-editor-surface rounded-lg shadow-sm border border-vs-editor-border overflow-hidden">
          {/* Content Container */}
          <div className="p-6 md:p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Page Footer Section */}
      <footer className="bg-vs-editor-surface border-t border-vs-editor-border mt-16">
        <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
          <div className="text-center py-8">
            <p className="text-vs-editor-text2 text-sm">
              2025. Built with React & Tailwind & Cursor
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
