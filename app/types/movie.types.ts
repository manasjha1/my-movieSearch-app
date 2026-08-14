export type MovieType = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  original_language?: string;
  popularity?: number;
  runtime?: number;
  tagline?: string;
  genres?: Array<{ id?: number; name: string }>;
};

export type MovieListResponse = {
  page?: number;
  total_pages?: number;
  results: MovieType[];
};

export type WatchlistMovie = {
  id: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  overview?: string;
  vote_average?: number;
};

export type CastMember = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};
