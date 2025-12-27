import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PromptProvider } from './context/PromptContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header, Footer } from './components/layout';
import { ErrorBoundary } from './components/common';
import './styles/globals.css';

const Home = lazy(() => import('./pages/Home'));
const Builder = lazy(() => import('./pages/Builder'));
const History = lazy(() => import('./pages/History'));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading page">
      <div className="loader-spinner" />
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PromptProvider>
          <Router>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" style={{ flex: 1 }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/builder" element={<Builder />} />
                  <Route path="/history" element={<History />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </Router>
        </PromptProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
