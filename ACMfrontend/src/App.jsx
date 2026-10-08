import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Shared Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingLogo from './components/layout/FloatingLogo';
import FloatingLogin from './components/layout/FloatingLogin';

// UI and Home Components (eagerly loaded for instant homepage render)
import Hero from './components/ui/Hero';
import OrbitShowcase from './components/ui/OrbitShowcase';
import About from './components/home/About';

// Lazy-loaded Page Components (prevents loading heavy packages on initial load)
const DocumentPage = lazy(() => import('./components/documents/DocumentPage'));
const EventsPage = lazy(() => import('./components/events/EventsPage'));
const ProjectProposalsPage = lazy(() => import('./components/projectProposals/ProjectProposalsPage'));
const ProjectExpoPage = lazy(() => import('./components/projectExpoPage/ProjectExpoPage'));
const BlogPage = lazy(() => import('./components/blog/BlogPage'));
const AcmNitkBlogPage = lazy(() => import('./components/blog/AcmNitkBlogPage'));

// --- DATA ARRAYS ---
const yantras = ["Sanganitra", "Karyavarta", "Vidyut", "Yantrika", "Sahiitya", "Abhivyakta", "Krutagnata", "ACMW"];

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
          <pre className="text-xs bg-gray-900 p-4 rounded max-w-xl overflow-auto mb-6 text-gray-300">
            {this.state.error?.message || "Unknown error"}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-brand-blue text-brand-navy font-semibold rounded-full hover:opacity-90"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function PageLoader() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// --- HOME PAGE WRAPPER ---
function HomePage() {
  return (
    <main className="flex-grow w-full">
      <Hero>
        <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-navy dark:text-white transition-colors duration-300">
          Building the community in
        </span>
        <div className="flex items-baseline justify-center">
          <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-navy dark:text-white transition-colors duration-300 mr-3">the</span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-blue drop-shadow-[0_0_30px_rgba(108,180,238,0.3)] dark:drop-shadow-[0_0_30px_rgba(108,180,238,0.6)]">
            ACM
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-navy dark:text-white transition-colors duration-300 ml-2">-way</span>
        </div>
      </Hero>

      <About />
      <OrbitShowcase title="Our Yantras" items={yantras} />
    </main>
  );
}

// --- MAIN APP ---
function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden bg-white dark:bg-black transition-colors duration-300">

          {/* Global Nav & UI */}
          <FloatingLogo />
          <FloatingLogin />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Page Routes with Suspense */}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/documents" element={<DocumentPage />} />
              <Route path="/documents/:id" element={<DocumentPage />} />
              <Route path="/project-proposal" element={<ProjectProposalsPage />} />
              <Route path="/project-proposals" element={<ProjectProposalsPage />} />
              <Route path="/project-expo" element={<ProjectExpoPage />} />
              <Route path="/projects" element={<ProjectExpoPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/acm-nitk" element={<AcmNitkBlogPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;