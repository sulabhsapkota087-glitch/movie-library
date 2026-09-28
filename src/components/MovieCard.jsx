export default function MovieCard({ movie, isSaved, onSelect, onToggleSave }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <article className="movie-card">
      <button
        type="button"
        className="poster-button"
        onClick={() => onSelect(movie.imdbID)}
        aria-label={`View details for ${movie.Title}`}
      >
        {hasPoster ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} loading="lazy" />
        ) : (
          <div className="poster-fallback">No poster</div>
        )}
      </button>
      <div className="movie-card-body">
        <h3>{movie.Title}</h3>
        <p className="muted">{movie.Year}</p>
        <button
          type="button"
          className={`btn ${isSaved ? 'saved' : 'primary'}`}
          onClick={() => onToggleSave(movie)}
        >
          {isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
        </button>
      </div>
    </article>
  )
}
