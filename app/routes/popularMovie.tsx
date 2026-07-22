import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";
import { Button } from "~/components/ui/button";
import { getPopularMovies } from "../services/index"


const apiKey = "eaca397b12af42ca89067ac3c10ff934";


export default function PopularMovie() {
    const [loading, setLoading] = useState(false);
    const [popularMovie, setPopularMovie] = useState<any>(getPopularMovies())
    console.log("popular movies", popularMovie);




    // const getPopularMovies = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch(
    //             `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
    //             // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    //         );
    //         const data = await response.json();
    //         setPopularMovie(data);
    //         console.log("movies data--> ", data, popularMovie);

    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     getPopularMovies();
    // }, []);
    return (
        <div>
            <Headers />
            <section className="px-[5vw] mt-20">
                <div className="flex justify-between items-baseline mb-4">
                    <h2 className="font-[Libre Caslon Text] font-bold text-[2rem] md:text-[3rem] tracking-[4px]">
                        Popular Movies
                    </h2>
                    <Link to="/popularMovie">
                        <Button className="font-[Manrope] text-[0.75rem] uppercase tracking-[0.35em] text-[#e5e2e1]/70 bg-transparent hover:bg-transparent transition hover:text-white cursor-pointer">
                            VIEW ALL
                        </Button>
                    </Link>
                </div>
                <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-6">
                    {popularMovie?.results?.map((movie: any) => (
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
                            <div className="absolute inset-0 bg-[#131313]/90 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6 group-hover:opacity-100">
                                <h3 className="font-[Libre Caslon Text] text-[1rem]">
                                    {movie.title}
                                </h3>
                                <p className="font-[Manrope] text-[0.75rem] text-[#e5e2e1]/70 mt-2 line-clamp-3">
                                    {movie.overview}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}
