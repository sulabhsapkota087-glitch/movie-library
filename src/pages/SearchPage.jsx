import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { searchMovies } from '../api/omdb.js'

export default function SearchPage({ savedIds, onSelect, onToggleSave }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!query) return

    let cancelled = false
    setStatus('loading')
    setError('')

    searchMovies(query, page)
      .then(({ movies: found, total: totalResults }) => {
        if (cancelled) return
        setMovies((previous) => (page === 1 ? found : [...previous, ...found]))
        setTotal(totalResults)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [query, page])

  function handleSearch(newQuery) {
    setMovies([])
    setTotal(0)
    setPage(1)
    setQuery(newQuery)
  }

  const isFirstLoad = status === 'loading' && page === 1
  const canLoadMore = status === 'success' && movies.length < total

  return (
    <section>
      <h1>Find your next movie</h1>
      <SearchBar onSearch={handleSearch} />

      {status === 'idle' && (
        <StatusMessage type="empty" title="Nothing searched yet">
          Type a title above to start building your watchlist.
        </StatusMessage>
      )}

      {isFirstLoad && <StatusMessage type="loading" title="Searching…" />}

      {status === 'error' && (
        <StatusMessage type="error" title="Search failed">
          {error}
        </StatusMessage>
      )}

      {status === 'success' && movies.length === 0 && (
        <StatusMessage type="empty" title={`No results for “${query}”`}>
          Check the spelling or try a shorter title.
        </StatusMessage>
      )}

      {movies.length > 0 && (
        <>
          <p className="muted result-count">
            Showing {movies.length} of {total} results for “{query}”
          </p>
          <MovieGrid
            movies={movies}
            savedIds={savedIds}
            onSelect={onSelect}
            onToggleSave={onToggleSave}
          />
        </>
      )}

      {status === 'loading' && page > 1 && <StatusMessage type="loading" title="Loading more…" />}

      {canLoadMore && (
        <div className="center">
          <button type="button" className="btn primary" onClick={() => setPage((p) => p + 1)}>
            Load more
          </button>
        </div>
      )}
    </section>
  )
}
