import API_BOOK from "~/src/config/apiBook";
import { apiHandler } from "./httpHandler";

export const getPopularMovies = async () => {
  try {
    const response = await apiHandler({
      url: `${API_BOOK.MOVIES.POPULAR_MOVIES}`,
      method: "GET",
    });
    console.log("response by getPopular", response);

    return response.data;
  } catch (error) {
    return error;
  }
};

const getUpcomingMovies = async () => {
  try {
    const res = await apiHandler({
      url: `${API_BOOK.MOVIES.UPCOMING_MOVIES}`,
      method: "GET",
    });
    console.log("response by getUpcoming", res);

    return res;
  } catch (error) {
    return error;
  }
};
