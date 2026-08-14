import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";
import { Button } from "~/components/ui/button";
import type { MovieListResponse, MovieType } from "~/types/movie.types";
import API_KEY from "../constantKey";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";

export default function UpcomingMovie() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [upcomingMovie, setUpcomingMovie] = useState<MovieListResponse>({ results: [] })
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || upcomingMovie?.page || 1;

    const nexPage = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page + 1}`,
            );

            const data = (await response.json()) as MovieListResponse;
            setUpcomingMovie(data)
            setSearchParams({ page: String(page + 1) })
            console.log("data of  pagination-->>", data);
        } catch (error) {
            return error;
        } finally {
            setLoading(false)
        }
    };

    const prevPage = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page - 1}`,
            );

            const data = (await response.json()) as MovieListResponse;
            setUpcomingMovie(data)
            setSearchParams({ page: String(page - 1) })
            console.log("data of  pagination-->>", data);
        } catch (error) {
            return error;
        } finally {
            setLoading(false)
        }
    };

    const getUpcomingMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
                // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            );
            const data = (await response.json()) as MovieListResponse;
            setUpcomingMovie(data);
            console.log("movies data--> ", data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUpcomingMovies();
    }, []);
    return (
        <div>
            <Headers movies={null} filterMovies={() => void {}} />
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <section className="p-4 sm:p-6 lg:p-8 mt-20">
                    <div className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,183,3,0.16),rgba(255,255,255,0.04))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,183,3,0.2),transparent_46%)]" />
                        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#ffb703]/30 bg-[#ffb703]/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#ffb703]">
                                    <span className="h-2 w-2 rounded-full bg-[#ffb703]" />
                                    Timeless picks
                                </div>
                                <h2 className="mt-4 font-[Libre Caslon Text] text-3xl font-semibold sm:text-4xl">
                                    Upcoming movies
                                </h2>
                                <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                                    Get a first look at the releases arriving soon, with the most exciting stories already on the horizon.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur">
                                    <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/40">
                                        Next up
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        Fresh arrivals
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur">
                                    <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/40">
                                        Mood
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        Anticipation builds
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse overflow-hidden border border-white/10 bg-white/5"
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
                            {upcomingMovie?.results?.map((movie: MovieType) => {
                                const releaseYear = movie.release_date?.split("-")[0] || "Coming soon";

                                return (
                                    <Link
                                        key={movie.id}
                                        to={`/movie/${movie.id}`}
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
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>
                <div className="my-5">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button disabled={page === 1} className={`hover:bg-accent cursor-pointer`}>
                                    <PaginationPrevious onClick={() => prevPage()} />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink isActive>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <Button className={`hover:bg-accent cursor-pointer`}>
                                    <PaginationNext
                                        onClick={() => nexPage()}
                                    />
                                </Button>

                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>{" "}
                </div>
            </div>
            <Footer />
        </div>
    )
}
