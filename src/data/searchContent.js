const OMDB_KEY = '390c6805';

// ✅ TOP RATED — Highest Rating First
const FEATURED = [
  { id: 'tt0111161', imdb_id: 'tt0111161', title: 'The Shawshank Redemption', year: '1994', rating: 9.3, type: 'movie' },
  { id: 'tt6751668', imdb_id: 'tt6751668', title: 'Parasite', year: '2019', rating: 8.5, type: 'movie' },
  { id: 'tt7286456', imdb_id: 'tt7286456', title: 'Joker', year: '2019', rating: 8.4, type: 'movie' },
  { id: 'tt4633694', imdb_id: 'tt4633694', title: 'Spider-Man: Into the Spider-Verse', year: '2018', rating: 8.4, type: 'movie' },
  { id: 'tt15398776', imdb_id: 'tt15398776', title: 'Oppenheimer', year: '2023', rating: 8.4, type: 'movie' },
  { id: 'tt6710474', imdb_id: 'tt6710474', title: 'Everything Everywhere All at Once', year: '2022', rating: 7.8, type: 'movie' },
  { id: 'tt6791350', imdb_id: 'tt6791350', title: 'Guardians of the Galaxy Vol. 3', year: '2023', rating: 7.9, type: 'movie' },
  { id: 'tt11655566', imdb_id: 'tt11655566', title: 'Puss in Boots: The Last Wish', year: '2022', rating: 7.9, type: 'movie' },
  { id: 'tt1630029', imdb_id: 'tt1630029', title: 'Avatar: The Way of Water', year: '2022', rating: 7.6, type: 'movie' },
  { id: 'tt1517268', imdb_id: 'tt1517268', title: 'Barbie', year: '2023', rating: 6.9, type: 'movie' },
];

// ✅ Sort by Highest Rating
function byRatingDescending(a, b) {
  return b.rating - a.rating;
}

// 🎯 THE BEST: Try OMDb Poster FIRST → Fallback to Beautiful Picsum Image
function getPoster(movie) {
  const imdbId = movie.imdb_id || movie.imdbID;

  // ✅ FIRST: Try OMDb image API (most reliable!)
  if (imdbId) {
    return `https://img.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbId}`;
  }

  // 🎲 FALLBACK: Beautiful random photography — SAME movie = SAME image!
  const seed = encodeURIComponent(imdbId || movie.title || 'movie');
  return `https://picsum.photos/seed/${seed}/300/450`;
}

export async function searchContent(query) {
  // ✅ HOMEPAGE — Top Rated with Posters
  if (!query.trim()) {
    return FEATURED.map((movie) => ({
      ...movie,
      poster: getPoster(movie)
    })).sort(byRatingDescending);
  }

  // ✅ SEARCH — Clean spaces still work
  const cleanQuery = query.trim().replace(/\s+/g, ' ');
  const encodedQuery = encodeURIComponent(cleanQuery);

  let res;
  try {
    res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodedQuery}&type=movie`
    );
  } catch (networkError) {
    throw new Error('network');
  }

  if (!res.ok) throw new Error('network');

  const json = await res.json();
  if (json.Response === 'False') return [];

  // ✅ SEARCH RESULTS — Poster OR Beautiful Fallback Image
  return json.Search.map((movie) => ({
    id: movie.imdbID,
    imdb_id: movie.imdbID,
    title: movie.Title,
    year: movie.Year.slice(0, 4),
    type: 'movie',
    // 🎯 TRY → FALLBACK — NEVER BLANK!
    poster: movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : `https://picsum.photos/seed/${movie.imdbID}/300/450`,
  }));
}