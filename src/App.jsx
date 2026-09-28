import { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import SearchPage from './pages/SearchPage.jsx'
import WatchlistPage from './pages/WatchlistPage.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'

export default function App() {
  const [watchlist, setWatchlist] = useLocalStorage('reel-shelf-watchlist', [])
  const [selectedId, setSelectedId] = useState(null)

  const savedIds = useMemo(() => new Set(watchlist.map((item) => item.imdbID)), [watchlist])

  function toggleWatchlist(movie) {
    setWatchlist((current) => {
      if (current.some((item) => item.imdbID === movie.imdbID)) {
        return current.filter((item) => item.imdbID !== movie.imdbID)
      }
      const entry = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        addedAt: Date.now(),
        rating: 0,
        note: '',
      }
      return [...current, entry]
    })
  }

  function updateItem(imdbID, changes) {
    setWatchlist((current) =>
      current.map((item) => (item.imdbID === imdbID ? { ...item, ...changes } : item))
    )
  }

  function removeItem(imdbID) {
    setWatchlist((current) => current.filter((item) => item.imdbID !== imdbID))
  }

  return (
    <>
      <Navbar watchlistCount={watchlist.length} />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                savedIds={savedIds}
                onSelect={setSelectedId}
                onToggleSave={toggleWatchlist}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                watchlist={watchlist}
                onSelect={setSelectedId}
                onUpdate={updateItem}
                onRemove={removeItem}
              />
            }
          />
        </Routes>
      </main>

      {selectedId && (
        <MovieDetails
          movieId={selectedId}
          isSaved={savedIds.has(selectedId)}
          onToggleSave={toggleWatchlist}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  )
}
