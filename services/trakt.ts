const BASE_URL = 'https://api.trakt.tv';
const CLIENT_ID = process.env.EXPO_PUBLIC_TRAKT_CLIENT_ID; // Trakt Client ID

const headers = {
  'Content-Type': 'application/json',
  'trakt-api-version': '2',
  'trakt-api-key': CLIENT_ID,
};

export const fetchPopularMovies = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/movies/popular?page=${page}&limit=${limit}&extended=full`, {
      headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movies/${id}?extended=full`, {
      headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchShowDetails = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${id}?extended=full`, {
      headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch show details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching show details:', error);
    return null;
  }
};

export const searchContent = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie,show?query=${encodeURIComponent(query)}&extended=full`, {
      headers,
    });
    if (!response.ok) {
      throw new Error('Failed to search content');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
};
