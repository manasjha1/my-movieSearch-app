import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("movie/:id", "./routes/movieDetail.tsx"),
  route("top_rated-movie", "./routes/top_ratedMovie.tsx"),
  route("upcoming-movie", "./routes/upcomingMovie.tsx"),
  route("popular-movie", "./routes/popularMovie.tsx"),
  route("terms-of-service", "./routes/terms.tsx"),
  route("privacy-policy", "./routes/privacyPolicy.tsx"),
  route("contact", "./routes/contact.tsx"),
  route("watchlist", "./routes/watchlist.tsx"),
  route("cast&crew", "./routes/cast.tsx"),
] satisfies RouteConfig;
