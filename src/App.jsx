import { useCallback, useEffect, useRef, useState } from 'react';
import Hero from './components/Hero.jsx';
import SearchBar from './components/SearchBar.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';
import WhereToWatch from './components/WhereToWatch.jsx';
import { searchContent } from './data/searchContent.js';

const NAV_SOLID_DISTANCE = 40;

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNavSolid, setIsNavSolid] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  const [justRetried, setJustRetried] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const lastQueryRef = useRef('');
  const resultsSectionRef = useRef(null);
  const watchSectionRef = useRef(null);
  const requestIdRef = useRef(0);

  const runSearch = useCallback(async (q) => {
    const requestId = ++requestIdRef.current;
    setQuery(q);
    lastQueryRef.current = q;
    setHasSearched(q.trim().length > 0);
    setIsLoading(true);
    setHasError(false);
    setSelectedItem(null);
    try {
      const data = await searchContent(q);
      if (requestId !== requestIdRef.current) return;
      setResults(data);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setHasError(true);
      setResults([]);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    runSearch('').catch(() => {
      setIsLoading(false);
      setHasError(true);
    });
  }, [runSearch]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsNavSolid(window.scrollY > NAV_SOLID_DISTANCE);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    if (selectedItem && watchSectionRef.current) {
      watchSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedItem]);

  useEffect(() => {
    if (hasSearched) {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasSearched]);

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

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <nav className={`site-nav${isNavSolid ? ' is-scrolled' : ''}`}>
       <button className="brand-button" onClick={handleRefresh} aria-label="Refresh movies_777_strem">
  <span className="brand-mark">777</span>
  <span className="visually-hidden">movies_777_strem</span>
</button>

        <div className="nav-search">
          <SearchBar onSearch={runSearch} isLoading={isLoading} />
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>

      {!isOnline && (
        <div className="status-banner is-visible" role="status">
          <span>You're offline — showing what's already loaded.</span>
          <button onClick={handleRetry}>{justRetried ? 'Checking…' : 'Retry'}</button>
        </div>
      )}

      <Hero theme={theme}>
        <p className="hero-kicker">Find something to watch tonight</p>
        <h1 className="hero-title">
          Every title, <span className="hero-accent">one search</span> away
        </h1>
        <button className="scroll-cue" onClick={scrollToResults}>
          Browse the newest releases
        </button>
      </Hero>

      <section className="results-section" ref={resultsSectionRef}>
        <h2 className="results-heading">
          {hasSearched ? `Results for "${query}"` : 'Top Rated Movies'}
        </h2>

        {!hasSearched && !hasError && (
          <p className="results-subheading">Highest rated of all time.</p>
        )}

        {selectedItem && (
          <div ref={watchSectionRef}>
            <WhereToWatch item={selectedItem} onClose={() => setSelectedItem(null)} />
          </div>
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