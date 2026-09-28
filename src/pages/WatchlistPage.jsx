import { useState } from 'react'
import WatchlistItem from '../components/WatchlistItem.jsx'
import StatusMessage from '../components/StatusMessage.jsx'

const SORTERS = {
  added: (a, b) => b.addedAt - a.addedAt,
  title: (a, b) => a.Title.localeCompare(b.Title),
  year: (a, b) => parseInt(b.Year, 10) - parseInt(a.Year, 10),
}

export default function WatchlistPage({ watchlist, onSelect, onUpdate, onRemove }) {
  const [sortBy, setSortBy] = useState('added')
  const sorted = [...watchlist].sort(SORTERS[sortBy])

  return (
    <section>
      <div className="page-header">
        <h1>My watchlist</h1>
        {watchlist.length > 0 && (
          <label className="field inline">
            Sort by
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="added">Date added</option>
              <option value="title">Title</option>
              <option value="year">Year</option>
            </select>
          </label>
        )}
      </div>

      {watchlist.length === 0 ? (
        <StatusMessage type="empty" title="Your watchlist is empty">
          Search for a movie on the Search page and add it to start your list.
        </StatusMessage>
      ) : (
        <ul className="watchlist">
          {sorted.map((item) => (
            <WatchlistItem
              key={item.imdbID}
              item={item}
              onSelect={onSelect}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
