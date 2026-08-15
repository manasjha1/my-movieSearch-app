import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    Play,
    Star,
    Ticket,
    UserRound,
} from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";
import type {
    CastMember,
    MovieType,
    WatchlistMovie,
} from "~/types/movie.types";
import API_KEY from "../constantKey";
import Trailer from "~/components/Trailer";

const WATCHLIST_STORAGE_KEY = "movie-watchlist";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [movieVideo, setMovieVideo] = useState<any>(null);
    const [credits, setCredits] = useState<{ cast?: CastMember[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const [detailResponse, creditsResponse, videoResponse] =
                    await Promise.all([
                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
                        ),

                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
                        ),
                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
                        ),
                    ]);

                const [detailData, creditsData, videoData] = await Promise.all([
                    detailResponse.json() as Promise<MovieType>,
                    creditsResponse.json() as Promise<{ cast?: CastMember[] }>,
                    videoResponse.json(),
                ]);

                setMovie(detailData);
                setCredits(creditsData);
                setMovieVideo(videoData);
                console.log(
                    "data by it type---->>>>",
                    detailData,
                    creditsData,
                    "video data --> ",
                    videoData,
                );
            } catch (error) {
                error;
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    const findTrailer = movieVideo?.results?.find(
        (video: any) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true,
    );
    console.log("trailer type is --> ", findTrailer);

    const formatDate = (date?: string) => {
        if (!date) return "Coming soon";
        return new Date(date).toLocaleDateString("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatRuntime = (minutes?: number) => {
        if (!minutes) return "Runtime unavailable";
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}h ${mins}m`;
    };

    const backdropUrl = movie?.backdrop_path
        ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
        : movie?.poster_path
            ? `${POSTER_BASE_URL}${movie.poster_path}`
            : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80";

    const posterUrl = movie?.poster_path
        ? `${POSTER_BASE_URL}${movie.poster_path}`
        : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80";

    // const cast = credits?.cast?.slice(0, 10) || [];

    useEffect(() => {
        try {
            const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as WatchlistMovie[];
                setIsInWatchlist(parsed.some((item) => item.id === Number(id)));
            }
        } catch (error) {
            console.error("Unable to read watchlist", error);
        }
    }, [id]);

    const handleWatchlistToggle = () => {
        try {
            if (!movie) return;

            const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
            const current = saved ? (JSON.parse(saved) as WatchlistMovie[]) : [];
            const exists = current.some((item) => item.id === movie.id);

            const next = exists
                ? current.filter((item) => item.id !== movie.id)
                : [
                    ...current,
                    {
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path,
                        release_date: movie.release_date,
                        overview: movie.overview,
                        vote_average: movie.vote_average,
                    },
                ];

            localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(next));
            setIsInWatchlist(!exists);
        } catch (error) {
            return error;
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f10] text-white">
            <Headers />

            <main className="pt-20 pb-16">
                {loading ? (
                    <div className="mx-auto flex max-w-9xl flex-col gap-8 px-[5vw] py-16">
                        {/* Backdrop Hero Skeleton */}
                        <div className="h-screen w-full animate-pulse rounded-[2rem] bg-white/10" />

                        {/* Content Section Skeleton */}
                        <div className="grid gap-8 lg:grid-cols-[1fr_0.35fr]">
                            {/* Main Content Column */}
                            <div className="space-y-6">
                                {/* Back Button & Tags Skeleton */}
                                <div className="space-y-4">
                                    <div className="h-10 w-32 animate-pulse rounded-full bg-white/10" />
                                    <div className="flex flex-wrap gap-3">
                                        <div className="h-8 w-16 animate-pulse rounded-full bg-white/10" />
                                        <div className="h-8 w-20 animate-pulse rounded-full bg-white/10" />
                                        <div className="h-8 w-20 animate-pulse rounded-full bg-white/10" />
                                    </div>
                                </div>

                                {/* Title Skeleton */}
                                <div className="space-y-3">
                                    <div className="h-10 w-3/4 animate-pulse rounded-lg bg-white/10" />
                                    <div className="h-10 w-2/3 animate-pulse rounded-lg bg-white/10" />
                                </div>

                                {/* Overview Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-6 w-full animate-pulse rounded-lg bg-white/10" />
                                    <div className="h-6 w-5/6 animate-pulse rounded-lg bg-white/10" />
                                    <div className="h-6 w-4/5 animate-pulse rounded-lg bg-white/10" />
                                </div>

                                {/* Buttons Skeleton */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="h-12 w-40 animate-pulse rounded-full bg-white/10" />
                                    <div className="h-12 w-40 animate-pulse rounded-full bg-white/10" />
                                </div>
                            </div>

                            {/* Sidebar Info Box Skeleton */}
                            <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 animate-pulse">
                                <div className="h-6 w-24 rounded-lg bg-white/10" />
                                <div className="space-y-4">
                                    <div className="space-y-2 border-b border-white/10 pb-3">
                                        <div className="h-4 w-16 rounded bg-white/10" />
                                        <div className="h-4 w-24 rounded bg-white/10" />
                                    </div>
                                    <div className="space-y-2 border-b border-white/10 pb-3">
                                        <div className="h-4 w-16 rounded bg-white/10" />
                                        <div className="h-4 w-20 rounded bg-white/10" />
                                    </div>
                                    <div className="space-y-2 border-b border-white/10 pb-3">
                                        <div className="h-4 w-16 rounded bg-white/10" />
                                        <div className="h-4 w-12 rounded bg-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-20 rounded bg-white/10" />
                                        <div className="h-4 w-16 rounded bg-white/10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cast Section Skeleton */}
                        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-[#111111] p-8 animate-pulse">
                            <div className="h-6 w-40 rounded-lg bg-white/10" />
                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex-none">
                                        <div className="h-80 w-60 rounded-lg bg-white/10" />
                                        <div className="mt-2 h-4 w-40 rounded bg-white/10" />
                                        <div className="mt-1 h-3 w-32 rounded bg-white/10" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details Section Skeleton */}
                        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-[#111111] p-8 animate-pulse">
                            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.75fr]">
                                <div className="space-y-6">
                                    <div className="h-6 w-48 rounded-lg bg-white/10" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-full rounded bg-white/10" />
                                        <div className="h-4 w-5/6 rounded bg-white/10" />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="h-3 w-20 rounded bg-white/10" />
                                                <div className="h-4 w-32 rounded bg-white/10" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-96 w-full rounded-[2rem] bg-white/10" />
                            </div>
                        </div>
                    </div>
                ) : !movie ? (
                    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 px-8 py-20 text-center">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                            No movie selected
                        </p>
                        <h1 className="mt-4 text-3xl font-semibold">
                            We could not load this title.
                        </h1>
                        <p className="mt-3 text-white/70">
                            Try going back to browse and selecting a movie from the list.
                        </p>
                        <Link
                            to="/"
                            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Return home
                        </Link>
                    </div>
                ) : (
                    <>
                        <section
                            key={movie.id}
                            className="relative min-h-screen w-full overflow-hidden"
                        >
                            {/* Background Image with Gradient Overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={backdropUrl}
                                    alt={movie.title || "Movie backdrop"}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-[#0f0f10] via-[#0f0f10]/85 to-[#0f0f10]/20" />
                                <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-[#131313]/60 to-transparent" />
                            </div>

                            {/* Hero Content Container */}
                            <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:px-8">
                                <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.5fr] lg:gap-2">

                                    {/* Left Column: Movie Poster */}
                                    <div className="flex items-start justify-center md:justify-start">
                                        <div className="relative">
                                            <img
                                                src={posterUrl}
                                                alt={movie?.title}
                                                className="h-105 w-105 rounded-2xl object-cover shadow-2xl"
                                            />
                                            {/* Glow Effect */}
                                            <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-b from-cyan-500/20 via-blue-500/10 to-transparent blur-xl" />
                                        </div>
                                    </div>

                                    {/* Right Column: Movie Details */}
                                    <div className="flex flex-col p-2 justify-start">
                                        {/* Movie Title */}
                                        <div className="mb-6">
                                            <h1 className="font-[Libre Caslon Text] text-4xl font-bold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl">
                                                {movie.title}
                                            </h1>
                                            <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-amber-400/80">
                                                {movie?.release_date?.slice(0, 4) || "Upcoming"}
                                            </p>
                                        </div>

                                        {/* Tagline */}
                                        {movie.tagline && (
                                            <p className="mb-8 text-lg text-amber-300/90 uppercase tracking-[0.15em]">
                                                {movie.tagline}
                                            </p>
                                        )}

                                        {/* Metadata Grid */}
                                        <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                                            {/* Release Date */}
                                            <div>
                                                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                                                    <CalendarDays className="h-4 w-4 text-amber-400" />
                                                    Release Date
                                                </p>
                                                <p className="mt-3 text-sm text-white md:text-base">
                                                    {formatDate(movie.release_date)}
                                                </p>
                                            </div>

                                            {/* Runtime */}
                                            <div>
                                                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                                                    <Clock3 className="h-4 w-4 text-amber-400" />
                                                    Runtime
                                                </p>
                                                <p className="mt-3 text-sm text-white md:text-base">
                                                    {formatRuntime(movie.runtime)}
                                                </p>
                                            </div>

                                            {/* Rating */}
                                            <div>
                                                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                                                    <Star className="h-4 w-4 text-amber-400" />
                                                    Rating
                                                </p>
                                                <p className="mt-3 flex items-center gap-1 text-sm text-white md:text-base">
                                                    {movie.vote_average?.toFixed(1) ?? "N/A"}
                                                    <span className="text-xs text-white/60"></span>
                                                </p>
                                            </div>

                                            {/* Genres */}
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                                                    Genres
                                                </p>
                                                <p className="mt-3 text-sm text-white">
                                                    {movie.genres
                                                        ?.slice(0, 2)
                                                        .map((genre) => genre.name)
                                                        .join(", ") || "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Overview Section */}
                                        <div className="mb-8 border-t border-white/10 pt-6">
                                            <h3 className="text-xs uppercase tracking-[0.25em] text-white/60">
                                                Overview
                                            </h3>
                                            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-white/80 md:text-base">
                                                {movie?.overview}
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mb-8 flex flex-wrap gap-4">
                                            <button
                                                onClick={handleWatchlistToggle}
                                                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition duration-300 ${isInWatchlist
                                                    ? "border border-amber-500 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                                                    : "border border-white/80 bg-white text-[#0f0f10] hover:bg-white/80 cursor-pointer"
                                                    }`}
                                            >
                                                <Ticket className="h-4 w-4" />
                                                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                                            </button>
                                            <button onClick={() => scrollTo({ top: 1400, behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-white/20">
                                                <Play className="h-4 w-4" />
                                                Watch trailer
                                            </button>
                                        </div>

                                        {/* Genre Tags */}
                                        {movie.genres && movie.genres.length > 0 && (
                                            <div className="flex flex-wrap gap-3">
                                                {movie.genres.map((genre) => (
                                                    <span
                                                        key={genre.id}
                                                        className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs uppercase tracking-[0.15em] text-amber-300/80"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mx-auto mt-12 grid gap-8 px-[5vw]">
                            <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-8">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-white/10 p-3">
                                        <UserRound className="h-5 w-5 text-[#ffb703]" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                            Featured cast
                                        </p>
                                        <h2 className="font-[Libre Caslon Text] text-2xl">
                                            Meet the cast
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex gap-8 overflow-x-auto overflow-hidden w-7xl hide-scrollbar snap-x pb-6">
                                    {credits?.cast ? (
                                        credits?.cast?.slice(0, 10)?.map((person: CastMember) => (
                                            <div
                                                key={person.id}
                                                className="flex-none bg-accent border border-white/10 rounded-lg p-2 relative snap-start overflow-hidden group mt-6"
                                            >
                                                <img
                                                    src={
                                                        `${IMAGE_BASE_URL}${person.profile_path}`
                                                            ? `${IMAGE_BASE_URL}${person.profile_path}`
                                                            : `${person.name?.charAt(0) || "A"}`
                                                    }
                                                    className="flex h-80 w-60 overflow-hidden rounded-sm"
                                                />

                                                <div className="flex-1 justify-start pr-2">
                                                    <h3
                                                        className={`font-medium text-lg text-white ${person.name?.length > 5 ? "text-wrap" : "line-clamp-1"}`}
                                                    >
                                                        {person.name}
                                                    </h3>
                                                    <p className="text-sm text-white/60 truncate">
                                                        {person.character || "Cast member"}
                                                    </p>
                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white/70">
                                            Cast information is not available for this title yet.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Trailer findTrailer={findTrailer} />
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
