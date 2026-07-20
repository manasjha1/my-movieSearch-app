import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";

const apiKey = "eaca397b12af42ca89067ac3c10ff934";

export default function RecentMovie() {
    const [popularMovie, setPopularMovie] = useState<any>({ results: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getPopularMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
            );
            const data = await response.json();
            setPopularMovie(data);
        } catch (error) {
            console.log(error);
            setError("We couldn't load the top rated movies right now.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPopularMovies();
    }, []);

    return (
        <div>
            <Headers />
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                {/* <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#ff6b6b]">
                                Movie collection
                            </p>
                            <h1 className="font-[Libre Caslon Text] text-3xl leading-tight sm:text-4xl lg:text-5xl">
                                Top rated films
                            </h1>
                            <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
                                Discover a refined selection of acclaimed stories, from emotional dramas to modern classics.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#11141d]/80 px-4 py-3 text-sm text-white/70">
                            <span className="block text-xs uppercase tracking-[0.3em] text-white/40">
                                Now showing
                            </span>
                            <span className="mt-1 block font-semibold text-white">
                                {popularMovie?.results?.length ?? 0} featured titles
                            </span>
                        </div>
                    </div>
                </header> */}

                <section className="p-4 sm:p-6 lg:p-8 mt-20">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                                Heighend picks
                            </p>
                            <h2 className="font-[Libre Caslon Text] text-2xl sm:text-3xl">
                                Top rated movies
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-white/60">
                            A polished browsing experience built to feel effortless.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
                                >
                                    <div className="aspect-2/3 bg-white/10" />
                                    <div className="space-y-2 p-4">
                                        <div className="h-3 w-3/4 rounded bg-white/10" />
                                        <div className="h-3 w-1/2 rounded bg-white/10" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70">
                            {error}
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {popularMovie?.results?.map((movie: any) => {
                                const releaseYear = movie.release_date?.split("-")[0] || "Coming soon";

                                return (
                                    <article
                                        key={movie.id}
                                        className="movie-card group relative overflow-hidden rounded-xs border border-white/10 bg-[#11141d] shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                                    >
                                        <img
                                            className="aspect-2/3 w-full object-cover"
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                    : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                                            }
                                            alt={movie.title}
                                        />
                                        <div className="movie-overlay absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#05070c] via-[#05070c]/80 to-transparent p-4 opacity-0 transition-all duration-500 sm:p-5 cursor-pointer">
                                            <div className="p-2">
                                                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#ff6b6b]">
                                                    {releaseYear}
                                                </p>
                                                <h3 className="mt-1 font-[Libre Caslon Text] text-base text-white sm:text-lg">
                                                    {movie.title}
                                                </h3>
                                                <p className="mt-1 font-[Libre Caslon Text] text-sm text-white/80 truncate">
                                                    {movie.overview}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="mt-2 text-sm text-white/70">
                                                        {movie.vote_average?.toFixed(1) ?? "--"} / 10 • {movie.original_language?.toUpperCase() ?? "EN"}
                                                    </p>
                                                    <MoveRight className="size-6 mt-3 text-white/70" />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </div>
    );
}
