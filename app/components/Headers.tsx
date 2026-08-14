import { Link } from "react-router";
import { Button } from "./ui/button";
import {
    AlertTriangle,
    MoveRight,
    Plus,
    Search,
    Star,
    TrendingUp,
} from "lucide-react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "~/components/ui/combobox";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { Input } from "./ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "~/components/ui/input-group";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { useEffect, useState } from "react";
import API_KEY from "../constantKey";
import type { MovieListResponse, MovieType } from "~/types/movie.types";

interface MovieProps {
    filterMovies?: () => void;
    movies?: MovieListResponse | null;
}

export const Headers = ({ filterMovies = () => { } }: MovieProps) => {
    const [query, setQuery] = useState("");
    const [movieSuggestion, setMovieSuggestion] =
        useState<MovieListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const movieSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            // If search is empty, show trending movies
            getMovieSuggestion();
            return;
        }

        try {
            setIsSearching(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`,
            );
            const data = (await response.json()) as MovieListResponse;
            setMovieSuggestion(data);
            console.log("search results--> ", data);
        } catch (error) {
            console.error("Search error:", error);
            setMovieSuggestion(null);
        } finally {
            setIsSearching(false);
        }
    };

    const getMovieSuggestion = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
            );
            const data = (await response.json()) as MovieListResponse;
            setMovieSuggestion(data);
            console.log("moviesuggetion data--> ", data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovieSuggestion();
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#131313]/80 backdrop-blur-sm transition-all duration-300`}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-[5vw]">
                <Link to="/">
                    <div className="font-[Libre Caslon Text] font-bold text-[1.6rem] tracking-tighter text-white">
                        Cinémax
                    </div>
                </Link>

                <div className="hidden items-center gap-8 text-[0.75rem] uppercase tracking-[0.35em] text-[#e5e2e1]/70 md:flex">
                    <ol className="flex items-center align-middle gap-6">
                        <Link to="/popular-movie">
                            <li className="transition hover:text-white cursor-pointer">
                                Popular
                            </li>
                        </Link>
                        <Link to="/upcoming-movie">
                            <li className="transition hover:text-white cursor-pointer">
                                Upcomig
                            </li>
                        </Link>
                        <Link to="/top_rated-movie">
                            <li className="transition hover:text-white cursor-pointer">
                                Top rated
                            </li>
                        </Link>
                    </ol>
                </div>

                <div className="flex items-center gap-4">
                    <Drawer showSwipeHandle>
                        <DrawerTrigger
                            className={`bg-transparent hover:bg-transparent cursor-pointer hover:scale-95`}
                            render={
                                <Button variant="secondary">
                                    <Search className="size-6" />
                                </Button>
                            }
                        />
                        <DrawerContent className={`px-2`}>
                            <DrawerHeader>
                                <DrawerTitle
                                    className={`text-3xl font-[Libre Caslon Text] tracking-tight`}
                                >
                                    Cinémax
                                </DrawerTitle>
                                <DrawerDescription className="text-base text-white/60">
                                    Your Gateway to Movie Madness.
                                </DrawerDescription>
                                <InputGroup>
                                    <InputGroupInput
                                        value={query}
                                        onChange={(e) => {
                                            (setQuery(e.target.value), movieSearch(e.target.value));
                                        }}
                                        id="inline-start-input"
                                        placeholder="Search..."
                                    />
                                    <InputGroupAddon align="inline-start">
                                        <Search className="text-muted-foreground" />
                                    </InputGroupAddon>
                                </InputGroup>
                            </DrawerHeader>
                            <section className="flex-col my-4">
                                <div className="px-4 mb-4">
                                    <span className="text-lg text-white font-heading font-semibold flex items-center gap-3">
                                        {query ? (
                                            <>
                                                <div className="p-2 rounded-lg bg-white/10">
                                                    <Search className="size-5" />
                                                </div>
                                                <div>
                                                    <div>Search Results</div>
                                                    {isSearching && (
                                                        <div className="text-xs text-white/50">
                                                            Finding movies...
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-2 rounded-lg bg-white/10">
                                                    <TrendingUp className="size-5" />
                                                </div>
                                                <div>Trending Now</div>
                                            </>
                                        )}
                                    </span>
                                </div>
                                <ScrollArea className="h-100 w-full rounded-lg bg-transparent">
                                    <div className="px-4">
                                        {movieSuggestion ? (
                                            <div className="grid grid-cols-1 gap-3 pb-4">
                                                {movieSuggestion?.results
                                                    ?.slice(0, 11)
                                                    ?.map((movie: MovieType) => (
                                                        <Link
                                                            key={movie.id}
                                                            to={`/movie/${movie.id}`}
                                                            className="group relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 p-3"
                                                        >
                                                            <div className="flex gap-3">
                                                                <div className="relative shrink-0">
                                                                    <img
                                                                        className="w-16 h-24 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                                                                        src={
                                                                            movie.poster_path
                                                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                                                : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                                                                        }
                                                                        alt={movie.title}
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col justify-between flex-1 min-w-0">
                                                                    <div>
                                                                        <h3 className="font-semibold text-white text-sm group-hover:text-white/90 transition-colors truncate">
                                                                            {movie.title}
                                                                        </h3>
                                                                        <p className="text-xs text-white/50 mt-1 line-clamp-2 group-hover:text-white/60 transition-colors">
                                                                            {movie.overview ||
                                                                                "No description available"}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center justify-between pt-2">
                                                                        <span className="text-xs text-white/60">
                                                                            {movie.release_date?.split("-")[0] ||
                                                                                "N/A"}
                                                                        </span>
                                                                        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg group-hover:bg-white/15 transition-colors">
                                                                            <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                                                            <span className="text-xs font-semibold text-yellow-400">
                                                                                {movie.vote_average?.toFixed(1) ?? "--"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-12">
                                                <div className="p-4 rounded-full bg-white/5 mb-4">
                                                    <AlertTriangle className="size-8 text-white/40" />
                                                </div>
                                                <p className="text-white/50 text-center text-sm font-medium">
                                                    No movies found
                                                </p>
                                                <p className="text-white/30 text-xs text-center mt-1">
                                                    Try searching for a different movie title
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </section>
                        </DrawerContent>
                    </Drawer>

                    <Link to="/watchlist">
                        <Button className="cursor-pointer hidden rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[0.75rem] uppercase tracking-[0.35em] text-white transition hover:bg-white/20 md:inline-flex">
                            <Plus /> watchlist
                        </Button>
                    </Link>

                    <button
                        className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/15 md:hidden"
                        aria-label="Menu"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};
