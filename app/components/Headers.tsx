import { Link } from "react-router";
import { Button } from "./ui/button";
import { MoveRight, Plus, Search, Star, TrendingUp } from "lucide-react";
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
} from "~/components/ui/drawer"
import { Input } from "./ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "~/components/ui/input-group"
interface MovieProps {
    filterMovies: () => void;
    movies: null;
}

export const Headers = ({
    filterMovies,
    movies,
}: MovieProps) => {
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
                        <DrawerTrigger className={`bg-transparent hover:bg-transparent cursor-pointer hover:scale-95`} render={<Button variant="secondary"><Search className="size-6" /></Button>} />
                        <DrawerContent className={`px-2`}>
                            <DrawerHeader>
                                <DrawerTitle className={`text-2xl`}>Cinémax</DrawerTitle>
                                <DrawerDescription>Your Gateway to Movie Madness.</DrawerDescription>
                                <InputGroup>
                                    <InputGroupInput type="search" placeholder="Search a movie..." />
                                    <InputGroupAddon>
                                        <Search />
                                    </InputGroupAddon>
                                </InputGroup>
                            </DrawerHeader>
                            <section className="flex-col my-3">
                                <span className="text-left text-xl text-white font-heading font-medium flex items-center gap-2 mt-3
                                px-4">
                                    <TrendingUp /> Trending
                                </span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4">

                                    {movies?.results?.slice(0, 7)?.map((movie: any) => (
                                        <div
                                            key={movie.id}
                                            className={`px-4 py-2`}

                                        >
                                            <Link
                                                to={`/movie/${movie.id}`}
                                                className="flex relative overflow-hidden rounded-lg p-2 gap-2 border border-white/10 hover:bg-white/5  bg-ink shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                                            >
                                                <img
                                                    className="w-10 h-2 aspect-square rounded-sm object-cover"
                                                    src={
                                                        movie.poster_path
                                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                            : "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80"
                                                    }
                                                    alt={movie.title}
                                                />
                                                <div className="flex flex-col cursor-pointer w-120">
                                                    <h3 className="font-[Libre Caslon Text] text-base text-white sm:text-md truncate">
                                                        {movie.title}
                                                    </h3>
                                                    <p className="mt-1 font-[Libre Caslon Text] text-xs text-white/80 truncate">
                                                        {movie.overview}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs text-white/70 flex items-center gap-1">
                                                            {movie.vote_average?.toFixed(1) ?? "--"} <Star className="size-3" />
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <DrawerFooter>
                                <DrawerClose className={`cursor-pointer`} render={<Button>Close</Button>} />
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    {/* <span className="material-symbols-outlined text-[#e5e2e1]/80 hover:text-white transition-colors cursor-pointer">
                        search
                    </span>
                    // <div className="hidden h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-[#1a1a1a] md:block">
                    //     <img
                    //         className="h-full w-full object-cover"
                    //         alt="Profile"
                    //         src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80"
                    //     />
                    // </div> */}
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
