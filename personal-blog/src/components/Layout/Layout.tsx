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
    <div className={`min-h-screen bg-gray-50 pt-16 ${className}`}>
      {/* Page Header Section */}
      {showPageTitle && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {pageDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <main className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Content Container */}
          <div className="p-6 md:p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Page Footer Section */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              2025. Built with React & Tailwind & Cursor
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
