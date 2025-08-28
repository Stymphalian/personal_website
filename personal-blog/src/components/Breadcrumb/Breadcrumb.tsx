import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center text-vs-editor-text2 hover:text-vs-editor-text transition-colors p-1"
        aria-label="Go to home page"
      >
        <Home className="w-3 h-3 sm:w-4 sm:h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-vs-editor-text2" data-testid="chevron-right" />
          {item.isCurrent ? (
            <span className="text-vs-editor-text font-medium px-1" aria-current="page">
              {item.label}
            </span>
          ) : item.path ? (
            <Link
              to={item.path}
              className="text-vs-editor-text2 hover:text-vs-editor-text transition-colors px-1"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-vs-editor-text2 px-1">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
