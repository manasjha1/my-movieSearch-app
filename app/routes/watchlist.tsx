import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CalendarDays, Film, Sparkles, Trash2 } from "lucide-react";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";
import type { WatchlistMovie } from "~/types/movie.types";

const WATCHLIST_STORAGE_KEY = "movie-watchlist";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as WatchlistMovie[];
                setWatchlist(parsed);
            }
        } catch (error) {
            console.error("Unable to load watchlist", error);
        } finally {
            setReady(true);
        }
    }, []);

    useEffect(() => {
        if (!ready) return;
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
    }, [ready, watchlist]);

    const removeMovie = (movieId: number) => {
        setWatchlist((current) => current.filter((movie) => movie.id !== movieId));
    };

    const formatDate = (date?: string) => {
        if (!date) return "Coming soon";
        return new Date(date).toLocaleDateString("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-[#0f0f10] text-white">
            <Headers />

            <main className="px-[5vw] pb-16 pt-24">
                <section className="rounded-[2rem] border border-white/10 bg-white/4 p-8 shadow-2xl shadow-black/20 sm:p-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffb703]/30 bg-[#ffb703]/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-[#ffb703]">
                                <Sparkles className="h-3.5 w-3.5" />
                                Your curated picks
                            </div>
                            <h1 className="mt-5 font-[Libre Caslon Text] text-3xl font-semibold sm:text-4xl">
                                Watchlist
                            </h1>
                            <p className="mt-3 text-base leading-7 text-white/70">
                                Keep track of the movies you want to revisit later. Every title you save appears here in one place.
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/15"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to browse
                        </Link>
                    </div>

                    {ready && watchlist.length === 0 ? (
                        <div className="mt-10 flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 px-6 py-16 text-center">
                            <div className="rounded-full bg-white/10 p-4">
                                <Film className="h-8 w-8 text-[#ffb703]" />
                            </div>
                            <h2 className="mt-5 text-2xl font-semibold">
                                Your watchlist is empty
                            </h2>
                            <p className="mt-3 max-w-md text-white/70">
                                Browse movies and tap “Add to watchlist” to save the ones you want to watch next.
                            </p>
                            <Link
                                to="/"
                                className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-[#0f0f10] transition hover:bg-[#e5e2e1]"
                            >
                                Discover movies
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {watchlist.map((movie) => (
                                <article
                                    key={movie.id}
                                    className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121212] shadow-lg shadow-black/20"
                                >
                                    <div className="relative h-fit overflow-hidden">
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                    : movie.backdrop_path
                                                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                                                        : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                                            }
                                            alt={movie.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <button
                                            onClick={() => removeMovie(movie.id)}
                                            className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/50 p-2 text-white transition hover:bg-black/70 cursor-pointer"
                                            aria-label={`Remove ${movie.title} from watchlist`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
                                            <CalendarDays className="h-3.5 w-3.5 text-[#ffb703]" />
                                            {formatDate(movie.release_date)}
                                        </div>

                                        <h3 className="mt-3 line-clamp-2 font-[Libre Caslon Text] text-xl font-semibold text-white">
                                            {movie.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">
                                            {movie.overview || "A cinematic experience you saved for later."}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between">
                                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/70">
                                                {movie.vote_average?.toFixed(1) ?? "New"} / 10
                                            </span>
                                            <Link
                                                to={`/movie/${movie.id}`}
                                                className="text-sm font-medium text-[#ffb703] transition hover:text-[#ffd166]"
                                            >
                                                View details
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
