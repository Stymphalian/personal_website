import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { Contact, ErrorPage, Home, Projects } from './pages';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

// ScrollToTop component to handle scroll behavior on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);

    // Handle scroll restoration for browser back/forward navigation
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    const handleLoad = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-vs-editor-bg">
        <Navigation />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* <Route path="/blog/:slug" element={<BlogPostDetail />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage errorType="not-found" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;