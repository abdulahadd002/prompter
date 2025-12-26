import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PromptProvider } from './context/PromptContext';
import { Header, Footer } from './components/layout';
import { Home, Builder, History } from './pages';
import './styles/globals.css';

export default function App() {
  return (
    <PromptProvider>
      <Router>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </PromptProvider>
  );
}
