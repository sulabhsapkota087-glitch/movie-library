const RATINGS = [1, 2, 3, 4, 5]

export default function WatchlistItem({ item, onSelect, onUpdate, onRemove }) {
  const hasPoster = item.Poster && item.Poster !== 'N/A'

  return (
    <li className="watchlist-item">
      <button
        type="button"
        className="poster-button small"
        onClick={() => onSelect(item.imdbID)}
        aria-label={`View details for ${item.Title}`}
      >
        {hasPoster ? (
          <img src={item.Poster} alt={`${item.Title} poster`} loading="lazy" />
        ) : (
          <div className="poster-fallback">No poster</div>
        )}
      </button>

      <div className="watchlist-body">
        <h3>
          {item.Title} <span className="muted">({item.Year})</span>
        </h3>

        <label className="field">
          My rating
          <select
            value={item.rating}
            onChange={(event) => onUpdate(item.imdbID, { rating: Number(event.target.value) })}
          >
            <option value={0}>Not rated</option>
            {RATINGS.map((n) => (
              <option key={n} value={n}>
                {'★'.repeat(n)} ({n}/5)
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          Notes
          <textarea
            rows={2}
            placeholder="Why do you want to watch this?"
            value={item.note}
            onChange={(event) => onUpdate(item.imdbID, { note: event.target.value })}
          />
        </label>

        <button type="button" className="btn danger" onClick={() => onRemove(item.imdbID)}>
          Remove
        </button>
      </div>
    </li>
  )
}
