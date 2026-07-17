export const Headers = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#131313]/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-[5vw]">
                <div className="font-[Libre Caslon Text] text-[1.1rem] tracking-tighter text-white">CinéNoir</div>

                <div className="hidden items-center gap-8 text-[0.75rem] uppercase tracking-[0.35em] text-[#e5e2e1]/70 md:flex">
                    {['Discovery', 'Browse', 'My List', 'Originals'].map((item) => (
                        <a key={item} href="#" className="transition hover:text-white">
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#e5e2e1]/80 hover:text-white transition-colors cursor-pointer">
                        notifications
                    </span>
                    <div className="hidden h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-[#1a1a1a] md:block">
                        <img
                            className="h-full w-full object-cover"
                            alt="Profile"
                            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80"
                        />
                    </div>
                    <button className="hidden rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[0.75rem] uppercase tracking-[0.35em] text-white transition hover:bg-white/20 md:inline-flex">
                        Subscribe
                    </button>
                    <button className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/15 md:hidden" aria-label="Menu">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};