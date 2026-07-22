import API_KEY from "./constantKey";

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL


const API_BOOK = {
    MOVIES: {
        POPULAR_MOVIES: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        UPCOMING_MOVIES: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
        TOP_RATED_MOVIES: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
    },
    IMAGE_URLS: {
        IMAGE: `${IMAGE_URL}`
    },

}



export default API_BOOK;





