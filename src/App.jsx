import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import Hero from './components/Hero.jsx';
import SearchBar from './components/SearchBar.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';
import WhereToWatch from './components/WhereToWatch.jsx';
import SearchPage from './pages/SearchPage.jsx';
import { searchContent } from './data/searchContent.js';

const SEARCH_REVEAL_DISTANCE = 720;
const NAV_SOLID_DISTANCE = 40;

// Homepage Component
function HomePage() {
  const navigate = useNavigate(); // For redirecting to /search/QUERY

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNavSolid, setIsNavSolid] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  const [justRetried, setJustRetried] = useState(false);
  const lastQueryRef = useRef('');
  const resultsSectionRef = useRef(null);
  const watchSectionRef = useRef(null);
  const requestIdRef = useRef(0); // 👈 pour ignorer les résultats périmés

  // ✅ NEW: Search → Navigate to /search/QUERY page
  const handleSearch = useCallback((searchText) => {
    const q = searchText.trim();
    if (q) {
      navigate(`/search/${encodeURIComponent(q)}`); // Opens NEW clean URL!
    }
  }, [navigate]);

  const runSearch = useCallback(async (q) => {
<<<<<<< HEAD
    const requestId = ++requestIdRef.current;
    console.log('🔍 Searching for:', q || '(Homepage — Featured Movies)');
=======
>>>>>>> 9354a0aba46d2037f41bcaef64841dc166d32ce2
    setQuery(q);
    lastQueryRef.current = q;
    setHasSearched(q.trim().length > 0);
    setIsLoading(true);
    setHasError(false);
    setSelectedItem(null);
    try {
      const data = await searchContent(q);
<<<<<<< HEAD
      if (requestId !== requestIdRef.current) return; // une recherche plus récente a été lancée entre-temps
      console.log('✅ Got results:', data.length, 'movies');
      setResults(data);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      console.error('❌ Search error:', err);
=======
      setResults(data);
    } catch (err) {
>>>>>>> 9354a0aba46d2037f41bcaef64841dc166d32ce2
      setHasError(true);
      setResults([]);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // Load featured movies on homepage
  useEffect(() => {
    runSearch('');
  }, [runSearch]);

  // Scroll effects
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsNavSolid(y > NAV_SOLID_DISTANCE);
        setIsSearchVisible(y > SEARCH_REVEAL_DISTANCE);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Online/offline
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // 👇 Scroll automatique vers le lecteur dès qu'un film est sélectionné
  useEffect(() => {
    if (selectedItem && watchSectionRef.current) {
      watchSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedItem]);

  // 👇 Scroll automatique vers les résultats dès qu'une recherche est faite
  useEffect(() => {
    if (hasSearched) {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasSearched]);

  const handleRefresh = () => {
    window.location.href = '/';
  };

  const handleRetry = () => {
    setJustRetried(true);
    runSearch(lastQueryRef.current).finally(() => {
      setTimeout(() => setJustRetried(false), 600);
    });
  };

  const scrollToResults = () => {
    resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`site-nav${isNavSolid ? ' is-scrolled' : ''}`}>
        <button className="brand-button" onClick={handleRefresh} aria-label="Refresh movies_777_strem">
          movies_777_strem
        </button>
      </nav>

      {!isOnline && (
        <div className="status-banner is-visible" role="status">
          <span>You're offline — showing what's already loaded.</span>
          <button onClick={handleRetry}>{justRetried ? 'Checking…' : 'Retry'}</button>
        </div>
      )}

      <Hero>
        <p className="hero-kicker">Find something to watch tonight</p>
        <h1 className="hero-title">
          Every title, <span className="hero-accent">one search</span> away
        </h1>
        <button className="scroll-cue" onClick={scrollToResults}>
          Browse the Top Rated of All Time
        </button>
      </Hero>

      <div className={`search-reveal${isSearchVisible ? ' is-visible' : ''}`}>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      <section className="results-section" ref={resultsSectionRef}>
        <h2 className="results-heading">Top Rated Movies of All Time</h2>
        <p className="results-subheading">The greatest films, highest rated first.</p>

        {selectedItem && (
          <div ref={watchSectionRef}>
            <WhereToWatch item={selectedItem} onClose={() => setSelectedItem(null)} />
          </div>
        )}

        <ResultsGrid
          results={results}
          isLoading={isLoading}
          hasSearched={false}
          hasError={hasError}
          query=""
          onSelect={setSelectedItem}
          onRetry={handleRetry}
        />
      </section>
    </>
  );
}

// ✅ MAIN APP WITH ROUTES
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage = Top 150 Movies */}
        <Route path="/" element={<HomePage />} />
        
        {/* ✅ Search Page = CLEAN URL like /search/moviename */}
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}