import MovieCard from './MovieCard.jsx'

export default function MovieGrid({ movies, savedIds, onSelect, onToggleSave }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isSaved={savedIds.has(movie.imdbID)}
          onSelect={onSelect}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}
