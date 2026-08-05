import { useEffect, useMemo, useState } from "react";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";
import {
  MoveRight,
  Plus,
  Share2,
  View,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import API_KEY from "../src/config/constantKey";


const WATCHLIST_STORAGE_KEY = "movie-watchlist";


function Home() {
  // const { data: popularMovies } = usePpopularMovies()
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<any>([]);

  const featuredMovie = useMemo(() => movies?.results?.[16], [movies]);

  // Hero crossfade controls
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [slideCount, setSlideCount] = useState(8);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Array<{ id: number }>;
        setIsInWatchlist(parsed.some((item) => item.id === item.id));
      }
    } catch (error) {
      console.error("Unable to read watchlist", error);
    }
  }, []);

  const handleWatchlistToggle = () => {
    try {
      const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      const current = saved ? (JSON.parse(saved) as Array<any>) : [];
      const exists = current.some((item) => item.id === movies.id);

      const next = exists
        ? current.filter((item) => item.id !== movies.id)
        : [
          ...current,
          {
            id: movies.id,
            title: movies.title,
            poster_path: movies.poster_path,
            backdrop_path: movies.backdrop_path,
            release_date: movies.release_date,
            overview: movies.overview,
            vote_average: movies.vote_average,
          },
        ];

      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(next));
      setIsInWatchlist(!exists);
    } catch (error) {
      return error
    }
  };

  const getPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovies(data);
      console.log("movies data--> ", data, movies);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getPopularMovies();
  }, []);

  // Autoplay crossfade for hero
  useEffect(() => {
    const count = Math.min(slideCount, movies?.results?.length || 0);
    if (!autoplay || isHovering || count <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 3000);
    return () => clearInterval(id);
  }, [autoplay, isHovering, slideCount, movies]);

  // Reset index when movies or slideCount change
  useEffect(() => {
    setCurrentIndex(0);
  }, [movies, slideCount]);

  console.log();

  const formatDate = (date: string) => {
    if (!date) return "Coming soon";
    return new Date(date).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const currentMovie = movies?.results?.[currentIndex] || featuredMovie;
  const skeletonSections = [
    { label: "EDITOR'S PICK", title: "Popular Right Now" },
    { label: "COMING SOON", title: "Worth the Wait" },
    { label: "HIGHEST RATED", title: "Critics' Choice" },
  ];

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <Headers />
      <main>
        {loading ? (
          <>
            <section className="relative h-[85vh] w-full overflow-hidden bg-[#161616] pt-80">
              <div className="absolute inset-0 bg-[#0f0f0f]" />
              <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-[#131313]/80 to-transparent" />
              <div className="relative z-20 px-[5vw] pb-24 grid md:grid-cols-2 items-end gap-12">
                <div className="space-y-6 max-w-3xl">
                  <div className="h-9 w-44 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-24 w-full max-w-xl rounded-3xl bg-white/10 animate-pulse" />
                  <div className="h-5 w-96 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-5 w-72 rounded-full bg-white/10 animate-pulse" />
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="h-12 w-40 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-12 w-40 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-12 w-12 rounded-full bg-white/10 animate-pulse" />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-16 py-16 mt-10">
              {skeletonSections.map((section) => (
                <section className="px-[5vw]" key={section.title}>
                  <div className="flex justify-between items-baseline mb-8">
                    <div>
                      <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse mb-3" />
                      <div className="h-9 w-64 rounded-full bg-white/10 animate-pulse" />
                    </div>
                    <div className="h-10 w-28 rounded-full bg-white/10 animate-pulse" />
                  </div>
                  <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-6">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex-none w-[60vw] md:w-[22vw] snap-start overflow-hidden rounded-[1.25rem] bg-[#171717] p-4 animate-pulse"
                      >
                        <div className="h-64 w-full rounded-[1rem] bg-white/10 mb-4" />
                        <div className="h-4 w-2/3 rounded-full bg-white/10 mb-3" />
                        <div className="h-3 w-1/2 rounded-full bg-white/10" />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : (
          <>
            <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
              <div
                className="absolute inset-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="h-full relative">
                  {movies?.results
                    ?.slice(0, slideCount)
                    .map((movie: any, idx: number) => (
                      <div
                        key={movie.id}
                        className={`absolute inset-0 transition-opacity duration-700 ${currentIndex === idx
                          ? "opacity-100 z-20"
                          : "opacity-0 z-10"
                          }`}
                      >
                        <img
                          src={
                            movie.backdrop_path
                              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                              : movie.poster_path
                                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80"
                          }
                          alt={
                            movie.title ||
                            featuredMovie?.title ||
                            "CinéNoir hero image"
                          }
                          className={`h-full w-full object-cover grayscale-[0.2] contrast-[1.1]`}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-[#131313]/80 to-transparent" />
                      </div>
                    ))}

                  <div className="absolute left-1/2 -translate-x-1/2 top-190 z-40 flex gap-2">
                    {movies?.results
                      ?.slice(0, slideCount)
                      .map((_: any, i: number) => (
                        <button
                          key={`dot-${i}`}
                          onClick={() => setCurrentIndex(i)}
                          className={`h-2 w-8 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-white" : "bg-white/20"}`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="relative z-20 pb-25 px-[5vw] grid md:grid-cols-2 items-end gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/90">
                      FEATURE FILM
                    </span>
                    <span className="text-[0.75rem] uppercase tracking-[0.35em] text-[#e5e2e1]/70">
                      TRENDING • TOP RATED • UPCOMING
                    </span>
                  </div>

                  <h1 className="font-[Libre Caslon Text] font-semibold text-6xl leading-[0.9] md:text-[5rem] md:leading-[0.9]">
                    Every Story Starts Here
                  </h1>
                  <p className="mt-4 max-w-xl text-[1.125rem] leading-8 text-[#e5e2e1]/75 md:text-[1.125rem]">
                    Step into a world of unforgettable stories. Explore thousands of
                    films, discover what's trending, and build your personal
                    watchlist.{" "}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-6">
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() =>
                        window.scrollTo({ top: 750, behavior: "smooth" })
                      }
                      className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-[0.75rem] uppercase tracking-[0.35em] text-[#131313] transition hover:bg-[#e5e2e1]/90 cursor-pointer"
                    >
                      EXPLORE MOVIES
                      <MoveRight className="h-4 w-4" />
                    </button>
                    <Link to="/watchlist">
                      <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-10 py-4 text-[0.75rem] uppercase tracking-[0.35em] text-white transition hover:bg-white/10 cursor-pointer">
                        <View className="h-4 w-4" />
                        VIEW WATCHLIST
                      </button>
                    </Link>

                  </div>
                </div>
              </div>
            </section>
            {/* Popular Movies */}
            <div className="flex flex-col gap-16 py-16 mt-10">
              <section className="px-[5vw]">
                <div className="flex justify-between items-baseline mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                      EDITOR'S PICK
                    </p>
                    <h2 className="font-[Libre Caslon Text] font-semibold text-2xl sm:text-3xl">
                      Popular Right Now
                    </h2>
                  </div>
                  <Link to="/popular-movie">
                    <Button className="font-[Manrope] text-[0.75rem] uppercase tracking-[0.35em] text-[#e5e2e1]/70 bg-transparent hover:bg-transparent transition hover:text-white cursor-pointer">
                      VIEW ALL
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-6">

                  {movies?.results?.slice(0, 8)?.map((movie: any) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="flex-none w-[60vw] md:w-[22vw] snap-start">
                      <div
                        className="movie-card h-full relative overflow-hidden group cursor-pointer"
                      >

                        <img
                          className="w-full h-full object-cover"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                          }
                          alt={movie.title}
                        />
                        <div className="absolute inset-0 bg-[#131313]/90 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6 group-hover:opacity-100">

                          <h3 className="font-[Libre Caslon Text] text-[1rem]">
                            {movie.title}
                          </h3>
                          <p className="font-[Manrope] text-[0.75rem] text-[#e5e2e1]/70 mt-2 line-clamp-3">
                            {movie.overview}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}

                </div>
              </section>
              {/* Upcoming movies */}
              <section className="px-[5vw]">
                <div className="flex justify-between items-baseline mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                      COMING SOON

                    </p>
                    <h2 className="font-[Libre Caslon Text] font-semibold text-2xl sm:text-3xl">
                      Worth the Wait
                    </h2>
                  </div>
                  <Link to="/upcoming-movie">
                    <Button className="font-[Manrope] text-[0.75rem] uppercase tracking-[0.35em] text-[#e5e2e1]/70 bg-transparent hover:bg-transparent transition hover:text-white cursor-pointer">
                      VIEW ALL
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-6">
                  {movies?.results?.slice(10, 20)?.map((movie: any) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="flex-none w-[60vw] md:w-[22vw] snap-start">
                      <div className="movie-card h-full relative overflow-hidden group cursor-pointer">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                          }
                          alt={movie.title}
                        />
                        <div className="absolute inset-0 bg-[#131313]/90 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6 group-hover:opacity-100">
                          <h3 className="font-[Libre Caslon Text] text-[1rem]">
                            {movie.title}
                          </h3>
                          <p className="font-[Manrope] text-[0.75rem] text-[#e5e2e1]/70 mt-2 line-clamp-3">
                            {movie.overview}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              {/* Top rated movies */}
              <section className="px-[5vw]">
                <div className="flex justify-between items-baseline mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                      HIGHEST RATED

                    </p>
                    <h2 className="font-[Libre Caslon Text] font-semibold text-2xl sm:text-3xl">
                      Critics' Choice
                    </h2>
                  </div>
                  <Link to="/top_rated-movie">
                    <Button className="font-[Manrope] text-[0.75rem] uppercase tracking-[0.35em] text-[#e5e2e1]/70 bg-transparent hover:bg-transparent transition hover:text-white cursor-pointer">
                      VIEW ALL
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-6">
                  {movies?.results?.slice(9, 19)?.map((movie: any) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="flex-none w-[60vw] md:w-[22vw] snap-start">
                      <div className="movie-card h-full relative overflow-hidden group cursor-pointer">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                          }
                          alt={movie.title}
                        />
                        <div className="absolute inset-0 bg-[#131313]/90 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6 group-hover:opacity-100">
                          <h3 className="font-[Libre Caslon Text] text-[1rem]">
                            {movie.title}
                          </h3>
                          <p className="font-[Manrope] text-[0.75rem] text-[#e5e2e1]/70 mt-2 line-clamp-3">
                            {movie.overview}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              {/* director's cut */}
              <section className="px-[5vw]">
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                    SIGNATURE COLLECTION
                  </p>
                  <h2 className="font-[Libre Caslon Text] font-semibold text-2xl sm:text-3xl">
                    Director's cut
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2 relative group overflow-hidden rounded-[1.5rem] h-105">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={
                        featuredMovie?.backdrop_path
                          ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
                          : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80"
                      }
                      alt={featuredMovie?.title || "Director Cut"}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#131313]/90 via-transparent to-transparent" />
                    <div className="absolute top-50 p-10">
                      <span className="bg-white text-[#131313] px-3 py-1 font-[Manrope] text-[10px] tracking-[0.2em] uppercase inline-block mb-4">
                        EXCLUSIVE
                      </span>
                      <h3 className="font-[Libre Caslon Text] font-bold text-[2rem] leading-tight">
                        Visions of the Void
                      </h3>
                      <p className="font-[Manrope] font-medium text-[0.875rem] text-[#e5e2e1]/70 mt-2 max-w-sm">
                        A retrospective on minimalism in modern cinema by acclaimed
                        director Marcus Thorne.
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex gap-6">
                    {movies?.results?.slice(0, 2)?.map((movie: any) => (
                      <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card flex-none w-[60vw] md:w-[22vw] rounded-lg relative snap-start overflow-hidden group cursor-pointer">
                        <div className="h-full">
                          <img
                            className="w-full h-full object-cover"
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                            }
                            alt={movie.title}
                          />
                          <div className="absolute inset-0 bg-[#131313]/90 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6 group-hover:opacity-100">
                            <h3 className="font-[Libre Caslon Text] text-[1rem]">
                              {movie.title}
                            </h3>
                            <p className="font-[Manrope] text-[0.75rem] text-[#e5e2e1]/70 mt-2 line-clamp-3">
                              {movie.overview}
                            </p>

                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* 2nd section */}
                  <div className="md:col-span-4 flex gap-6">
                    {movies?.results?.slice(3, 5).map((movie: any) => (
                      <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        className="relative group overflow-hidden rounded-[1.5rem] h-60 flex-1"
                      >
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                          }
                          alt={movie.title}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#131313]/90 via-transparent to-transparent" />
                        <div className="absolute top-30 p-10">
                          <h3 className="font-[Libre Caslon Text] font-bold text-[2rem] leading-tight">
                            {movie?.title}
                          </h3>
                          <p className="font-[Manrope] text-[0.875rem] text-[#e5e2e1]/70 mt-2 max-w-sm truncate">
                            {movie?.overview}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>

      <Footer />

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-[#131313]/90 backdrop-blur-lg border-t border-white/5 md:hidden">
        {[
          { icon: "home", label: "Home" },
          { icon: "search", label: "Search" },
          { icon: "video_library", label: "Library" },
          { icon: "person", label: "Profile" },
        ].map((item) => (
          <a
            key={item.label}
            className="flex flex-col items-center justify-center text-white transition-transform active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-[Manrope] text-[0.625rem] mt-1 uppercase tracking-[0.25em]">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div >
  );
}

export default Home;
