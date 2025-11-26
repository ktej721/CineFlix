const BASE_URL = 'http://webservice.fanart.tv/v3';
const API_KEY = process.env.EXPO_PUBLIC_FANART_API_KEY;

export const fetchMovieImages = async (tmdbId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/movies/${tmdbId}?api_key=${API_KEY}`);
        if (!response.ok) {
            // Fanart returns 404 if no images found, which is not an error in our app logic
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie images:', error);
        return null;
    }
};

export const fetchShowImages = async (tvdbId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/${tvdbId}?api_key=${API_KEY}`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching show images:', error);
        return null;
    }
};
