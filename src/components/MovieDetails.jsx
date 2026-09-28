import { useEffect, useState } from 'react'
import { getMovieDetails } from '../api/omdb.js'
import StatusMessage from './StatusMessage.jsx'

export default function MovieDetails({ movieId, isSaved, onToggleSave, onClose }) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    getMovieDetails(movieId)
      .then((data) => {
        if (!cancelled) setMovie(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [movieId])

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const hasPoster = movie && movie.Poster !== 'N/A'

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Movie details"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close details">
          ×
        </button>

        {loading && <StatusMessage type="loading" title="Loading details…" />}
        {error && (
          <StatusMessage type="error" title="Could not load details">
            {error}
          </StatusMessage>
        )}

        {movie && (
          <div className="details">
            {hasPoster ? (
              <img className="details-poster" src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div className="poster-fallback details-poster">No poster</div>
            )}
            <div className="details-info">
              <h2>{movie.Title}</h2>
              <p className="muted">
                {movie.Year} · {movie.Runtime} · {movie.Rated}
              </p>
              <p className="genres">{movie.Genre}</p>
              <p>{movie.Plot}</p>
              <dl>
                <dt>Director</dt>
                <dd>{movie.Director}</dd>
                <dt>Cast</dt>
                <dd>{movie.Actors}</dd>
                <dt>IMDb rating</dt>
                <dd>{movie.imdbRating}</dd>
              </dl>
              <button
                type="button"
                className={`btn ${isSaved ? 'saved' : 'primary'}`}
                onClick={() => onToggleSave(movie)}
              >
                {isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
