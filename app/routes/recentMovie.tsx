import type { UseQueryResult } from "@tanstack/react-query"
import { usePpopularMovies } from "~/hooks/queries"

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export type Movies = {
    popularMovies: unknown
}



export default function RecentMovie({ popularMovies }: Movies) {
    const { data } = usePpopularMovies()
    return (
        <div>
            <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-6">
                {popularMovies?.results?.map((movie: any) => (
                    <div
                        key={movie.id}
                        className="movie-card flex-none w-[60vw] md:w-[22vw] aspect-2/3 relative snap-start overflow-hidden group cursor-pointer"
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
                        <div className="movie-overlay absolute inset-0 bg-[#131313]/90 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6">
                            <h3 className="font-[Libre Caslon Text] text-[1rem]">
                                {movie.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
