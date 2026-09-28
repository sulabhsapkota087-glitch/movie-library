import { NavLink } from 'react-router-dom'

export default function Navbar({ watchlistCount }) {
  return (
    <header className="navbar">
      <span className="brand">Reel Shelf</span>
      <nav>
        <NavLink to="/" end>
          Search
        </NavLink>
        <NavLink to="/watchlist">
          Watchlist <span className="badge">{watchlistCount}</span>
        </NavLink>
      </nav>
    </header>
  )
}
