import { Menu, PlayCircle, Search } from "lucide-react";

export const Headers = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-2xl">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="#" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_25px_rgba(255,59,59,0.15)]">
                        <PlayCircle className="h-5 w-5 text-[#ff3b3b]" />
                    </div>
                    AuraMx
                </a>

                <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
                    {['Movies', 'TV Shows', 'Genres', 'New Releases'].map((item) => (
                        <a key={item} href="#" className="transition hover:text-[#ff3b3b]">
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/70 sm:flex">
                        <Search className="h-4 w-4 text-white/60" />
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-24 bg-transparent text-sm outline-none placeholder:text-white/40"
                        />
                    </div>

                    <button className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/15 md:hidden" aria-label="Menu">
                        <Menu className="h-4 w-4" />
                    </button>

                    <button className="rounded-full bg-[#ff3b3b] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(255,59,59,0.25)] transition hover:bg-[#ff4f4f]">
                        Sign In
                    </button>
                </div>
            </nav>
        </header>
    );
};