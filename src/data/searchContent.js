const OMDB_KEY = '390c6805';

// ✅ TOP RATED MOVIES — with auto-generated posters
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

// ✅ Generate RELIABLE poster URL
function addPoster(movie) {
  return {
    ...movie,
    poster: `https://img.omdbapi.com/?apikey=${OMDB_KEY}&i=${movie.imdb_id}`
  };
}

export async function searchContent(query) {
  // ✅ Homepage — Top Rated + Posters
  if (!query.trim()) {
    return FEATURED.map(addPoster).sort(byRatingDescending);
  }

  // ✅ PERFECT CLEAN — remove ALL extra spaces
  const cleanQuery = query.trim().replace(/\s+/g, ' '); // Remove leading/trailing + multiple spaces
  const encodedQuery = encodeURIComponent(cleanQuery);

  console.log('🔍 Searching for:', cleanQuery);

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
  if (json.Response === 'False') {
    console.log('❌ No results found');
    return [];
  }

  // ✅ SEARCH RESULTS — RELIABLE POSTERS GUARANTEED!
  return json.Search.map((movie) => {
    const imdbID = movie.imdbID; // THIS IS THE KEY — OMDb returns it as "imdbID"
    return {
      id: imdbID,
      imdb_id: imdbID,
      title: movie.Title,
      year: movie.Year.slice(0, 4),
      type: 'movie',
      // ✅ USE imdbID for poster — WORKS EVERYTIME!
      poster: `https://img.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}`,
    };
  });
}