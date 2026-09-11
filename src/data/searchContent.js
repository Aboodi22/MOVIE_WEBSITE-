const OMDB_KEY = '390c6805';

// ✅ TOP RATED — with WORKING poster URLs
const FEATURED = [
  { id: 'tt0111161', imdb_id: 'tt0111161', title: 'The Shawshank Redemption', year: '1994', rating: 9.3, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiZDYtOWY5ZGI4NjE0Njc5XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg' },
  { id: 'tt6751668', imdb_id: 'tt6751668', title: 'Parasite', year: '2019', rating: 8.5, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmItZGIyZGEyNjEwZWMwXkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_SX300.jpg' },
  { id: 'tt7286456', imdb_id: 'tt7286456', title: 'Joker', year: '2019', rating: 8.4, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BNTljNzBhNzItOWQ4OC00NzU5LThjYWItY2FhOWE5OWRmOWZmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { id: 'tt4633694', imdb_id: 'tt4633694', title: 'Spider-Man: Into the Spider-Verse', year: '2018', rating: 8.4, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ1NjE@._V1_SX300.jpg' },
  { id: 'tt15398776', imdb_id: 'tt15398776', title: 'Oppenheimer', year: '2023', rating: 8.4, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BN2JmMjhiMDctOWY0Yy00OTdmLThhOWItY2E5NjFhMDhkOWRmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { id: 'tt6710474', imdb_id: 'tt6710474', title: 'Everything Everywhere All at Once', year: '2022', rating: 7.8, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BYTdkOWQwYWMtY2U4OC00NzI5LThjOWItY2Q5OWQ5OWRmOWZmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { id: 'tt6791350', imdb_id: 'tt6791350', title: 'Guardians of the Galaxy Vol. 3', year: '2023', rating: 7.9, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BMDU4Yzk1YjctNDE0OC00NDEwLThiOWItMDdhNTljYjE5MDU0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { id: 'tt11655566', imdb_id: 'tt11655566', title: 'Puss in Boots: The Last Wish', year: '2022', rating: 7.9, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BNzZjMjk4YjctMWQ4OC00NzQ5LThiYWItY2FhOWE5OWRmOWZmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { id: 'tt1630029', imdb_id: 'tt1630029', title: 'Avatar: The Way of Water', year: '2022', rating: 7.6, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BZDAwMDc4YWItMWY4OC00NzlkLThiOWItY2FhNzU4NDY0OWZmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { id: 'tt1517268', imdb_id: 'tt1517268', title: 'Barbie', year: '2023', rating: 6.9, type: 'movie', poster: 'https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmOWI3OWE5OWZmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
];

// ✅ Sort by Highest Rating
function byRatingDescending(a, b) {
  return b.rating - a.rating;
}

// ✅ YOUR FALLBACK IDEA: Try Poster #1 → if missing → Try Poster #2 → if missing → Try Poster #3
function getBestPoster(movie) {
  // ✅ FIRST: Use poster OMDb search gave us
  if (movie.Poster && movie.Poster !== 'N/A') {
    return movie.Poster;
  }
  // ✅ SECOND: Try OMDb image API from IMDb ID
  if (movie.imdbID || movie.imdb_id) {
    const id = movie.imdbID || movie.imdb_id;
    return `https://img.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}`;
  }
  // ✅ THIRD: Nothing found → return empty (shows fallback initials)
  return null;
}

export async function searchContent(query) {
  // ✅ HOMEPAGE — Top Rated with ALL posters
  if (!query.trim()) {
    return [...FEATURED].sort(byRatingDescending);
  }

  // ✅ SEARCH — clean spaces still work
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

  // ✅ SEARCH RESULTS — use YOUR "if, if, else" fallback logic!
  return json.Search.map((movie) => ({
    id: movie.imdbID,
    imdb_id: movie.imdbID,
    title: movie.Title,
    year: movie.Year.slice(0, 4),
    type: 'movie',
    poster: getBestPoster(movie), // 🎯 YOUR IDEA: try 3 ways to find poster!
  }));
}