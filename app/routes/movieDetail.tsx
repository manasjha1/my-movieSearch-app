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
import API_KEY from "../constantKey";

const WATCHLIST_STORAGE_KEY = "movie-watchlist";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>({});
    const [movieVideo, setMovieVideo] = useState<any>(null);
    const [credits, setCredits] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const [detailResponse, creditsResponse] = await Promise.all([
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
                    ),
                    // fetch(
                    //     `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
                    // ),
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
                    ),
                ]);

                const [detailData, creditsData] = await Promise.all([
                    detailResponse.json(),
                    creditsResponse.json(),
                ]);

                setMovie(detailData);
                setCredits(creditsData);
                console.log(
                    "data by it type---->>>>",
                    detailData,
                    // videoData,
                    creditsData,
                );
            } catch (error) {
                error;
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    const findtrailer = movieVideo?.results?.find(
        movieVideo?.results?.find(
            (video: any) => video.site === "YouTube" && video.type === "Trailer",
        ),
    );

    const youtubeVideo = movieVideo?.results?.find(
        (video: any) => video.site === "YouTube",
    );

    console.log(youtubeVideo);

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

    const cast = credits?.cast?.slice(0, 10) || [];

    useEffect(() => {
        try {
            const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as Array<{ id: number }>;
                setIsInWatchlist(parsed.some((item) => item.id === Number(id)));
            }
        } catch (error) {
            console.error("Unable to read watchlist", error);
        }
    }, [id]);

    const handleWatchlistToggle = () => {
        try {
            const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
            const current = saved ? (JSON.parse(saved) as Array<any>) : [];
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
            return error
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f10] text-white">
            <Headers />

            <main className="pt-20 pb-16">
                {loading ? (
                    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-[5vw] py-16">
                        <div className="h-80 animate-pulse rounded-[2rem] bg-white/10" />
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="h-64 animate-pulse rounded-[2rem] bg-white/10" />
                            <div className="h-64 animate-pulse rounded-[2rem] bg-white/10" />
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
                            className="relative h-screen w-full overflow-hidden"
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={backdropUrl}
                                    alt={movie.title || "Movie backdrop"}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-[#0f0f10] via-[#0f0f10]/85 to-[#0f0f10]/20" />
                                <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-[#131313]/80 to-transparent" />

                            </div>

                            <div className="relative mx-auto flex max-w-9xl flex-col gap-10 px-[5vw] py-20 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-3xl lg:h-20">
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/15"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to browse
                                    </Link>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-white/70">
                                            {movie.release_date?.slice(0, 4) || "New release"}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-white/70">
                                            {formatRuntime(movie.runtime)}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-white/70">
                                            {movie.vote_average?.toFixed(1)} / 10
                                        </span>
                                    </div>

                                    <h1 className="mt-6 font-[Libre Caslon Text] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                                        {movie.title}
                                    </h1>
                                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75 truncate">
                                        {movie.overview ||
                                            "A cinematic experience awaits, and the full synopsis will appear here soon."}
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-[#0f0f10] transition hover:bg-[#e5e2e1]">
                                            <Play className="h-4 w-4" />
                                            Watch trailer
                                        </button>
                                        <button
                                            onClick={handleWatchlistToggle}
                                            className={`rounded-full border px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] transition ${isInWatchlist
                                                ? "border-[#ffb703] bg-[#ffb703]/15 text-[#ffb703] hover:bg-[#ffb703]/20"
                                                : "border-white/20 bg-transparent text-white hover:bg-white/10"
                                                }`}
                                        >
                                            {isInWatchlist ? "Saved to watchlist" : "Add to watchlist"}
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full max-w-sm rounded-[2rem] p-6 shadow-2xl ">
                                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                                        <Ticket className="h-4 w-4" />
                                        At a glance
                                    </div>

                                    <div className="mt-6 space-y-4 text-sm text-white/80">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                            <span className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-[#ffb703]" />
                                                Release
                                            </span>
                                            <span>{formatDate(movie.release_date)}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                            <span className="flex items-center gap-2">
                                                <Clock3 className="h-4 w-4 text-[#ffb703]" />
                                                Runtime
                                            </span>
                                            <span>{formatRuntime(movie.runtime)}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                            <span className="flex items-center gap-2">
                                                <Star className="h-4 w-4 text-[#ffb703]" />
                                                Rating
                                            </span>
                                            <span>{movie.vote_average?.toFixed(1)} / 10</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Ticket className="h-4 w-4 text-[#ffb703]" />
                                                Popularity
                                            </span>
                                            <span>{Math.round(movie.popularity || 0)}</span>
                                        </div>
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
                                            Meet the crew
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex gap-8 overflow-x-auto hide-scrollbar snap-x pb-6">
                                    {cast.length > 0 ? (
                                        cast.map((person: any) => (
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
                                                    className="flex h-60 w-fit overflow-hidden rounded-sm"
                                                />

                                                <div>
                                                    <h3 className="font-medium text-lg text-white">
                                                        {person.name}
                                                    </h3>
                                                    <p className="text-sm text-white/60">
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
                            <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-8 shadow-2xl shadow-black/20">
                                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.75fr]">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-white/10 p-3">
                                                <Star className="h-5 w-5 text-[#ffb703]" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                                    Popularity insight
                                                </p>
                                                <h2 className="font-[Libre Caslon Text] text-2xl">
                                                    What makes this movie stand out
                                                </h2>
                                            </div>
                                        </div>

                                        <p className="text-lg leading-8 text-white/70">
                                            {movie.tagline ||
                                                "A high-impact story that resonates with audiences through strong characters, striking visuals, and a memorable emotional arc."}
                                        </p>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="p-4">
                                                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                                    Release date
                                                </p>
                                                <p className="mt-2 text-base text-white">
                                                    {formatDate(movie.release_date)}
                                                </p>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                                    Runtime
                                                </p>
                                                <p className="mt-2 text-base text-white">
                                                    {formatRuntime(movie.runtime)}
                                                </p>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                                    Rating
                                                </p>
                                                <p className="mt-2 text-base text-white">
                                                    {movie.vote_average?.toFixed(1) ?? "N/A"} / 10
                                                </p>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                                    Genres
                                                </p>
                                                <p className="mt-2 text-base text-white">
                                                    {movie.genres
                                                        ?.map((genre: any) => genre.name)
                                                        .join(" • ") || "Genre info unavailable"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-sm uppercase tracking-[0.35em] text-white/60">
                                                Overview
                                            </h3>
                                            <p className="mt-3 text-white/70 leading-7">
                                                {movie?.overview}{" "}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-black/20">
                                        <img
                                            src={posterUrl}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
