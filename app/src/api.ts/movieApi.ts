import { apiHandler } from "~/hooks/queries/httpHandler";
import API_URLS from "./config/apiBook";

export const getPopularMovies = async () => {
  try {
    const res = await apiHandler({
      url: `${API_URLS.MOVIES.GET_POPULAR_MOVIES}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    return error;
  }
};
