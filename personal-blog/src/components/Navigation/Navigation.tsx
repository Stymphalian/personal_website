import { ChevronDown, Menu, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    // { path: '/blog', label: 'Blog' },
  ];

  const toolsItems = [
    { path: 'https://blog.jordanyu.com/tools/graph_editor', label: 'Graph Editor', external: true },
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

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
  };

  const closeToolsDropdown = () => {
    setIsToolsDropdownOpen(false);
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
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        closeToolsDropdown();
      }
    };

    if (isMenuOpen || isToolsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (isMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (isMenuOpen) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMenuOpen, isToolsDropdownOpen]);

  // Close menu and dropdowns on route change
  useEffect(() => {
    closeMenu();
    closeToolsDropdown();
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 right-0 z-50 w-full bg-vs-editor-surface/95 backdrop-blur-sm border-b border-vs-editor-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Left side */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-vs-editor-text hover:text-crystal-blue-400 transition-colors">
              Jordan Yu
            </Link>
          </div>

          {/* Desktop Navigation - Right side */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path)
                    ? 'text-crystal-blue-400 bg-vs-editor-selection'
                    : 'text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Tools Dropdown */}
              <div className="relative" ref={toolsDropdownRef}>
                <button
                  onClick={toggleToolsDropdown}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/tools') || isToolsDropdownOpen
                    ? 'text-crystal-blue-400 bg-vs-editor-selection'
                    : 'text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover'
                    }`}
                >
                  <span>Tools</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {isToolsDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-vs-editor-surface border border-vs-editor-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {toolsItems.map((tool) => (
                        tool.external ? (
                          <a
                            key={tool.path}
                            href={tool.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm transition-colors text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover"
                            onClick={closeToolsDropdown}
                          >
                            {tool.label}
                          </a>
                        ) : (
                          <Link
                            key={tool.path}
                            to={tool.path}
                            className={`block px-4 py-2 text-sm transition-colors ${isActive(tool.path)
                              ? 'text-crystal-blue-400 bg-vs-editor-selection'
                              : 'text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover'
                              }`}
                            onClick={closeToolsDropdown}
                          >
                            {tool.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Link */}
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contact')
                  ? 'text-crystal-blue-400 bg-vs-editor-selection'
                  : 'text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover'
                  }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button - Right side */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-crystal-blue-500 transition-colors active:bg-vs-editor-surface2"
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
            className="absolute right-0 top-16 w-64 h-full bg-vs-editor-surface shadow-2xl transform transition-all duration-500 ease-out"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-6 pb-8 space-y-2">
              <div className="text-xs font-semibold text-vs-editor-text2 uppercase tracking-wider mb-4 px-3 transition-colors duration-300">
                Navigation
              </div>
              {navigationItems.map((item, index) => (
                <Link
                  key={`mobile-${item.path}`}
                  to={item.path}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-x-1 ${isActive(item.path)
                    ? 'text-crystal-blue-400 bg-vs-editor-selection border-l-4 border-crystal-blue-400 shadow-md'
                    : 'text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover hover:shadow-md active:bg-vs-editor-surface2 active:scale-95'
                    }`}
                  onClick={closeMenu}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Tools Section */}
              <div className="pt-4 mt-4 border-t border-vs-editor-border">
                <div className="text-xs font-semibold text-vs-editor-text2 uppercase tracking-wider mb-4 px-3 transition-colors duration-300">
                  Tools
                </div>
                {toolsItems.map((tool, index) => (
                  tool.external ? (
                    <a
                      key={`mobile-${tool.path}`}
                      href={tool.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-x-1 text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover hover:shadow-md active:bg-vs-editor-surface2 active:scale-95"
                      onClick={closeMenu}
                      style={{
                        animationDelay: `${(navigationItems.length + index) * 100}ms`
                      }}
                    >
                      {tool.label}
                    </a>
                  ) : (
                    <Link
                      key={`mobile-${tool.path}`}
                      to={tool.path}
                      className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-x-1 ${isActive(tool.path)
                        ? 'text-crystal-blue-400 bg-vs-editor-selection border-l-4 border-crystal-blue-400 shadow-md'
                        : 'text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover hover:shadow-md active:bg-vs-editor-surface2 active:scale-95'
                        }`}
                      onClick={closeMenu}
                      style={{
                        animationDelay: `${(navigationItems.length + index) * 100}ms`
                      }}
                    >
                      {tool.label}
                    </Link>
                  )
                ))}
              </div>

              {/* Contact Link */}
              <Link
                to="/contact"
                className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-x-1 ${isActive('/contact')
                  ? 'text-crystal-blue-400 bg-vs-editor-selection border-l-4 border-crystal-blue-400 shadow-md'
                  : 'text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover hover:shadow-md active:bg-vs-editor-surface2 active:scale-95'
                  }`}
                onClick={closeMenu}
                style={{
                  animationDelay: `${(navigationItems.length + toolsItems.length) * 100}ms`
                }}
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu footer with enhanced styling */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-vs-editor-border bg-gradient-to-r from-vs-editor-surface to-vs-editor-surface2">
              <div className="text-xs text-vs-editor-text2 text-center transition-colors duration-300 hover:text-crystal-blue-400">
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
