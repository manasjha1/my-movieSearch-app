import { UNIQUE_KEY } from "~/src/api.ts/config/constant";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "~/src/api.ts/movieApi";

// ── Product query ──────────────────────────────────────────────────────────
export const usePpopularMovies = () => {
  return useQuery({
    queryKey: [UNIQUE_KEY.QUERY_KEY.POPULAR_MOVIES],
    queryFn: () => getPopularMovies(),
  });
};
