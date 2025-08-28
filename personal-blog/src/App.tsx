import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { Blog, BlogPostDetail, Contact, ErrorPage, Home, Projects } from './pages';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage errorType="not-found" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
