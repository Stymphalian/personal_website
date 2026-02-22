import { useEffect } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import { About, ErrorPage, Home } from './pages';
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
      <div className='min-h-screen bg-vs-editor-bg flex flex-col'>
        <Navigation />
        <ScrollToTop />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects/:projectId' element={<ProjectDetail />} />
            <Route path='*' element={<ErrorPage errorType='not-found' />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
