# Reel Shelf – Movie Library App

Reel Shelf is a single-page React app for searching movies through the OMDb API, reading full details, and building a personal watchlist. The watchlist is saved in the browser with `localStorage`, so it is still there after a refresh.

**Live demo:** _add your Vercel/Netlify link here_

## Features

- Search movies by title (OMDb API) and browse results in a responsive card grid (poster, title, year)
- "Load more" pagination for large result sets
- Movie details modal: plot, genre, runtime, director, cast and IMDb rating
- Add / remove movies from a watchlist, persisted with `localStorage`
- Loading, empty and error states (no results, network error, invalid API key)
- Separate `/watchlist` page using React Router
- Personal 1–5 star rating and notes for each saved movie
- Sort the watchlist by date added, title or year
- Live watchlist count in the navigation bar
- Responsive layout for desktop and mobile

## Technologies

- React 18 (functional components and hooks only)
- React Router v6
- Vite
- OMDb API
- Plain CSS

## Project structure

```
src/
  api/          omdb.js               API helper functions
  components/   Navbar, SearchBar, MovieCard, MovieGrid,
                MovieDetails, WatchlistItem, StatusMessage
  hooks/        useLocalStorage.js    custom hook (useState + useEffect)
  pages/        SearchPage, WatchlistPage
  App.jsx       routes + watchlist state
```

## Setup

1. Get a free API key at <https://www.omdbapi.com/apikey.aspx>.
2. Install and configure:

   ```bash
   npm install
   cp .env.example .env      # then put your key in .env
   npm run dev
   ```

3. Open the local URL printed by Vite (usually <http://localhost:5173>).

To create a production build, run `npm run build`.

## Screenshots

Add 2–3 screenshots of your running app to a `screenshots/` folder and link them here:

| Search | Details | Watchlist |
| --- | --- | --- |
| ![Search](screenshots/search.png) | ![Details](screenshots/details.png) | ![Watchlist](screenshots/watchlist.png) |

## Known limitations

- OMDb returns 10 results per page and has a free daily request limit.
- Some movies have no poster; a placeholder is shown instead.
- The watchlist lives in one browser only (no accounts or sync).
- Only movies are supported (no books or TV series).
