import { Menu, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Touch gesture handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe && isMenuOpen) {
      closeMenu();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 right-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Left side */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation - Right side */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Right side */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors active:bg-gray-200"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced with animations and touch gestures */}
      {isMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm transition-all duration-300 ease-in-out"
          onClick={closeMenu}
        >
          <div 
            className="absolute right-0 top-16 w-64 h-full bg-white shadow-2xl transform transition-all duration-500 ease-out"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-6 pb-8 space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3 transition-colors duration-300">
                Navigation
              </div>
              {navigationItems.map((item, index) => (
                <Link
                  key={`mobile-${item.path}`}
                  to={item.path}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-x-1 ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600 shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-md active:bg-gray-100 active:scale-95'
                  }`}
                  onClick={closeMenu}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile menu footer with enhanced styling */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/30">
              <div className="text-xs text-gray-500 text-center transition-colors duration-300 hover:text-blue-600">
                Swipe left to close
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
