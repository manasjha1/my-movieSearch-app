import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("top_ratedMovie", "./routes/top_ratedMovie.tsx"),
] satisfies RouteConfig;
