import { useEffect, useMemo, useState } from "react";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";
import {
  Calendar,
  ChevronRight,
  Clock3,
  Play,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { useSearchParams } from "react-router";

const apiKey = "eaca397b12af42ca89067ac3c10ff934";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<any>(null);

  const pages = Number(searchParams.get("page")) || movies?.page || 1;
  const limit = Number(searchParams.get("limit")) || movies?.results?.length || 20;

  const featuredMovie = useMemo(() => movies?.results?.[0], [movies]);

  const pagination = () => {
    const nextPage = pages + 1;
    setSearchParams({ page: String(nextPage), limit: String(limit) });
  };

  useEffect(() => {
    async function searchMovie() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    searchMovie();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "Coming soon";
    return new Date(date).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncate = (text: string, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,59,59,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(61,139,255,0.16),transparent_28%),linear-gradient(135deg,#05070c_0%,#0a0d16_100%)] text-white">
      <Headers />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/70">
                <Sparkles className="h-4 w-4 text-[#3d8bff]" />
                Premium streaming experience
              </div>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Discover timeless stories in a cinematic glow.
              </h1>
              <p className="mt-4 text-base leading-8 text-white/70 sm:text-lg">
                Explore the latest releases through a polished, immersive interface built around the same trusted movie catalog you already love.
              </p>
            </div>

            {/* <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <Search className="h-4 w-4 text-white/60" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your next favorite"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
              <button className="rounded-full bg-[#ff3b3b] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#ff4f4f]">
                Explore
              </button>
            </div> */}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6">
              <div className="flex items-center justify-between text-sm text-white/65">
                <span>Featured Premiere</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70">
                  Now streaming
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff3b3b]/30 bg-[#ff3b3b]/10">
                  <Play className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {featuredMovie?.title || "Popular release"}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    {featuredMovie?.release_date ? formatDate(featuredMovie.release_date) : "Fresh arrival"}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-8 text-white/70">
                {featuredMovie?.overview
                  ? truncate(featuredMovie.overview, 180)
                  : "A curated collection of standout stories, all presented with elegant motion and a premium feel."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/75">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                  TMDb {featuredMovie?.vote_average?.toFixed(1) || "8.8"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                  {featuredMovie?.vote_count ? `${featuredMovie.vote_count} reviews` : "Trending"}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
              <img
                src={
                  featuredMovie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`
                    : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                }
                alt={featuredMovie?.title || "Featured movie"}
                className="h-105 w-full rounded-[1.4rem] object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.3rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Featured highlight</span>
                  <span className="rounded-full bg-[#3d8bff]/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-[#8dc2ff]">
                    4K UHD
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white">{featuredMovie?.title || "Featured movie"}</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/45">Trending now</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Handpicked from the catalog
              </h2>
            </div>
            <a href="#" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 sm:flex">
              Browse all
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-[1.75rem] border border-white/10 bg-white/8 p-3">
                  <div className="h-64 rounded-[1.3rem] bg-white/10" />
                  <div className="mt-4 h-4 w-3/4 rounded-full bg-white/10" />
                  <div className="mt-3 h-3 w-1/2 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {movies?.results?.map((movie: any) => (
                <article
                  key={movie.id}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/8 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(0,0,0,0.3)]"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-full w-full rounded-[1.3rem] object-cover"
                  />
                  <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      Popular
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      New
                    </span>
                  </div>
                  <div className="relative mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{movie.title}</h3>

                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-white/80">
                      ★ {Math.round(movie.vote_average * 10) / 10}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/60">
                    {truncate(movie.overview, 90)}
                  </p>
                  <div className="relative mt-4 flex items-center justify-between text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#3d8bff]" />
                      <span>{movie.release_date ? formatDate(movie.release_date) : "Soon"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-[#ff3b3b]" />
                      <span>{Math.max(90, Math.round(movie.vote_count / 100))} min</span>
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between">
                    <button className="rounded-full bg-[#ff3b3b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ff4f4f]">
                      Watch now
                    </button>
                    <button className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/15">
                      Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/8 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{pages}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {pages}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{pages + 1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => pagination()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
