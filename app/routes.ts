import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("recentMovie", "./routes/recentMovie.tsx"),
] satisfies RouteConfig;
