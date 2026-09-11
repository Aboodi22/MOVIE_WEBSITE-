export default function WhereToWatch({ item, onClose }) {
  if (!item) return null;

  const imdbId = item.imdb_id || item.id;
  if (!imdbId) return <p style={{padding:'1rem'}}>⚠️ No IMDb ID available</p>;

  const domains = [
    'https://vsembed.ru',
    'https://vidsrc.to',
    'https://vidsrc.mov',
    'https://vsembed.su',
  ];

  const embedUrl = `${domains[0]}/embed/movie/${imdbId}`;

  return (
    <div style={{ margin: '2rem auto', maxWidth: '900px', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>▶ {item.title} ({item.year})</h3>
        {onClose && (
          <button 
            onClick={onClose}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: 'none' }}
          >
            ✕ Close
          </button>
        )}
      </div>
      <iframe
        src={embedUrl}
        width="100%"
        height="520"
        title="Video Player"
        allowFullScreen
        style={{ border: 'none', borderRadius: '8px', background: '#000', marginTop: '0.5rem' }}
      />
      <p style={{fontSize:'0.85rem',color:'#888',marginTop:'0.5rem'}}>
        IMDb: {imdbId} • If blank → try domain #{domains.indexOf(domains[0])+2} in code
      </p>
    </div>
  );
}