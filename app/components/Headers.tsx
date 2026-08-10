import { Link } from "react-router";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "~/components/ui/command";
import { useState } from "react";

export const Headers = () => {
    const [open, setOpen] = useState(false);
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
                    <button
                        onClick={() => setOpen(true)}
                        className="material-symbols-outlined search text-[#e5e2e1]/80 hover:text-white transition-colors cursor-pointer"
                    >
                        search
                    </button>
                    <CommandDialog open={open} onOpenChange={setOpen}>
                        <Command className="rounded-lg border">
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    <CommandItem>Calendar</CommandItem>
                                    <CommandItem>Search Emoji</CommandItem>
                                    <CommandItem>Calculator</CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Settings">
                                    <CommandItem>Profile</CommandItem>
                                    <CommandItem>Billing</CommandItem>
                                    <CommandItem>Settings</CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </CommandDialog>
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
