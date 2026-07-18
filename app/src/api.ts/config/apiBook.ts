import { env } from "./env";

const API_URLS = {
  MOVIES: {
    GET_POPULAR_MOVIES: `${env.BASE_URL}//movie/popular?api_key=${env.API_KEY}`,
  },
};

export default API_URLS;
