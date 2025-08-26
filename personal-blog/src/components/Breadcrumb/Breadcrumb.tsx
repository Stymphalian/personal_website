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
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Go to home page"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" data-testid="chevron-right" />
          {item.isCurrent ? (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : item.path ? (
            <Link
              to={item.path}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
