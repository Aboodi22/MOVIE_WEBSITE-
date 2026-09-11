import { useCallback, useEffect, useRef, useState } from 'react';
import Hero from './components/Hero.jsx';
import SearchBar from './components/SearchBar.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';
import WhereToWatch from './components/WhereToWatch.jsx';
import { searchContent } from './data/searchContent.js';

const SEARCH_REVEAL_DISTANCE = 720;
const NAV_SOLID_DISTANCE = 40;

export default function App() {
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

  const runSearch = useCallback(async (q) => {
    console.log('🔍 Searching for:', q || '(Homepage — Featured Movies)');
    setQuery(q);
    lastQueryRef.current = q;
    setHasSearched(q.trim().length > 0);
    setIsLoading(true);
    setHasError(false);
    setSelectedItem(null);
    try {
      const data = await searchContent(q);
      console.log('✅ Got results:', data.length, 'movies');
      setResults(data);
    } catch (err) {
      console.error('❌ Search error:', err);
      setHasError(true);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Load NEWEST movies on homepage — WITH ERROR HANDLER
  useEffect(() => {
    console.log('🚀 App started — loading featured movies...');
    runSearch('').catch((err) => {
      console.error('❌ Initial load failed:', err);
      setIsLoading(false);
      setHasError(true);
    });
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

  // Online/Offline detection
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

  const handleRefresh = () => {
    window.location.reload();
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
          Browse the newest releases
        </button>
      </Hero>

      <div className={`search-reveal${isSearchVisible ? ' is-visible' : ''}`}>
        <SearchBar onSearch={runSearch} isLoading={isLoading} />
      </div>

      <section className="results-section" ref={resultsSectionRef}>
        <h2 className="results-heading">
          {hasSearched ? `Results for "${query}"` : 'Top Rated Movies'}
        </h2>

        {!hasSearched && !hasError && (
        <p className="results-subheading">Highest rated of all time.</p>
        )}

        {selectedItem && (
          <WhereToWatch item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}

        <ResultsGrid
          results={results}
          isLoading={isLoading}
          hasSearched={hasSearched}
          hasError={hasError}
          query={query}
          onSelect={setSelectedItem}
          onRetry={handleRetry}
        />
      </section>
    </>
  );
}