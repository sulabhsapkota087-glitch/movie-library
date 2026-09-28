const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

async function request(params) {
  if (!API_KEY) {
    throw new Error('Missing API key. Add VITE_OMDB_API_KEY to your .env file.')
  }

  const query = new URLSearchParams({ apikey: API_KEY, ...params })
  let response
  try {
    response = await fetch(`${BASE_URL}?${query}`)
  } catch {
    throw new Error('Network error. Check your connection and try again.')
  }

  if (!response.ok) {
    throw new Error(`The movie service returned an error (${response.status}).`)
  }
  return response.json()
}

export async function searchMovies(title, page = 1) {
  const data = await request({ s: title, type: 'movie', page })

  if (data.Response === 'False') {
    if (data.Error === 'Movie not found!') return { movies: [], total: 0 }
    throw new Error(data.Error || 'Something went wrong.')
  }
  return { movies: data.Search, total: Number(data.totalResults) }
}

export async function getMovieDetails(imdbID) {
  const data = await request({ i: imdbID, plot: 'full' })

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Could not load this movie.')
  }
  return data
}
