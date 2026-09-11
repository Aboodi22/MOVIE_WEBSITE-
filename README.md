# Nova Reel

A React + Three.js front end for a movie/show search site — purple theme,
animated 3D hero, search bar, and a results grid. No accounts, no backend.

This is a **front-end shell only**. It ships with mock data so it runs and
looks complete out of the box, but it does not connect to any streaming or
embed API. That part is intentionally left for you to wire up with a
licensed data source.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a static production version:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx                  – page layout, wires search state together
  main.jsx                 – entry point, loads global styles
  components/
    Hero.jsx                – Three.js animated hero background
    SearchBar.jsx            – search input
    ResultsGrid.jsx          – result cards, loading + empty states
  data/
    searchContent.js        – ⭐ THE ONLY FILE YOU NEED TO EDIT ⭐
  styles/                   – plain CSS, one file per area
```

## Connecting a real, legal data source

Open `src/data/searchContent.js`. It exports one function:

```js
export async function searchContent(query) {
  // currently returns mock data
}
```

Everything else in the app calls this function and expects an array of
objects shaped like:

```js
{ id, title, year, rating, type: 'movie' | 'tv', poster: 'https://...' | null }
```

Replace the body with a `fetch()` call to whatever legal source you're
using — for example [TMDB's API](https://developer.themoviedb.org/docs)
for metadata/posters, paired with a licensed streaming provider if you
want actual playback. An example TMDB implementation is sketched in the
comments at the top of the file.

No other file needs to change — the UI, loading states, and empty states
all already work against that same shape.
