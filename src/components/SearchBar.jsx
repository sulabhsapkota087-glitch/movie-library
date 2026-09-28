import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="movie-search" className="visually-hidden">
        Movie title
      </label>
      <input
        id="movie-search"
        type="search"
        placeholder="Search for a movie title"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className="btn primary" disabled={!value.trim()}>
        Search
      </button>
    </form>
  )
}
