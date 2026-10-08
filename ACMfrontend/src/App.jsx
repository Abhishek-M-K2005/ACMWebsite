import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Shared Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingLogo from './components/layout/FloatingLogo';

// UI and Home Components (eagerly loaded for instant homepage render)
import Hero from './components/ui/Hero';
import OrbitShowcase from './components/ui/OrbitShowcase';
import About from './components/home/About';
import HomeFeed from './components/home/HomeFeed';
import Loader from './components/ui/Loader';

// Lazy-loaded Page Components (prevents loading heavy packages on initial load)
const SigDetailsPage = lazy(() => import('./components/sigs/SigDetailsPage'));
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
  return <Loader text="Loading System Module..." />;
}

// Wrapper that ensures navigation between routes presents the sleek loader blurring the page background
function RouteChangeHandler({ children }) {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsNavigating(true);
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="relative w-full">
      {/* Background content gets blurred during loading transition */}
      <div className={`transition-all duration-300 ${isNavigating ? 'blur-md pointer-events-none select-none opacity-40 scale-[0.99]' : ''}`}>
        {children}
      </div>

      {/* Floating glassmorphic cyber loader upon blurred background */}
      {isNavigating && (
        <Loader text="Switching System Module..." overlay={true} />
      )}
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
      <HomeFeed />
    </main>
  );
}

// --- MAIN APP ---
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isInitialBoot, setIsInitialBoot] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Show the full cybernetic loader for 2.4s on initial website boot
    const bootTimer = setTimeout(() => {
      setIsInitialBoot(false);
    }, 2400);
    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden bg-white dark:bg-black transition-colors duration-300">

          {/* Initial boot loader overlay with backdrop blur */}
          {isInitialBoot ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
              <Loader text="Initializing ACM NITK Portal..." overlay={true} />
            </div>
          ) : (
            <>
              {/* Global Nav & UI */}
              <FloatingLogo />
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

              {/* Main Content mounted fresh after boot loader completes */}
              <Suspense fallback={<PageLoader />}>
                <RouteChangeHandler>
                  <Routes>
                    <Route path="/sigs/:id" element={<SigDetailsPage />} />
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
                </RouteChangeHandler>
              </Suspense>

              {/* Global Footer */}
              <Footer />
            </>
          )}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;