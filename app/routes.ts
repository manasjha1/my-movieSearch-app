import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("movie/:id", "./routes/movieDetail.tsx"),
  route("top_ratedMovie", "./routes/top_ratedMovie.tsx"),
  route("upcomingMovie", "./routes/upcomingMovie.tsx"),
  route("popularMovie", "./routes/popularMovie.tsx"),
  route("terms", "./routes/terms.tsx"),
  route("privacyPolicy", "./routes/privacyPolicy.tsx"),
  route("contact", "./routes/contact.tsx"),
] satisfies RouteConfig;
