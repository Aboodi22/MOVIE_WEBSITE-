function initials(title) {
  return title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function Card({ item, onSelect }) {
  return (
    <div 
      className="card" 
      onClick={() => onSelect && onSelect(item)} 
      style={{ cursor: onSelect ? 'pointer' : 'default' }}
    >
      <div className="card-poster">
        {item.poster ? (
          <img src={item.poster} alt={item.title} loading="lazy" />
        ) : (
          <span className="card-poster-fallback">{initials(item.title)}</span>
        )}
        <span className="card-type">{item.type === 'tv' ? 'Series' : 'Film'}</span>
      </div>
      <div className="card-body">
        <h3>{item.title}</h3>
        <div className="card-meta">
          <span>{item.year}</span>
          {typeof item.rating === 'number' && (
            <span className="card-rating">★ {item.rating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="card card-skeleton">
      <div className="card-poster" />
      <div className="card-body">
        <div className="skeleton-line" style={{ width: '70%' }} />
        <div className="skeleton-line" style={{ width: '40%' }} />
      </div>
    </div>
  );
}

export default function ResultsGrid({ 
  results, 
  isLoading, 
  hasSearched, 
  hasError, 
  query, 
  onSelect, 
  onRetry 
}) {
  if (isLoading) {
    return (
      <div className="results-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="empty-state">
        <p>Couldn't load results.</p>
        <button onClick={onRetry}>Try Again</button>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="empty-state">
        <p>No matches for "{query}".</p>
        <p className="empty-state-sub">Try a different title or check the spelling.</p>
      </div>
    );
  }

  return (
    <div className="results-grid">
      {results.map((item) => (
        <Card key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}