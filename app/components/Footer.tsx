import { PlayCircle, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10">
              <PlayCircle className="h-5 w-5 text-[#ff3b3b]" />
            </div>
            Aurelia
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
            A premium cinematic destination for modern movie lovers, crafted with elegant visuals and immersive storytelling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
          <a href="#" className="transition hover:text-white">About</a>
          <a href="#" className="transition hover:text-white">Terms</a>
          <a href="#" className="transition hover:text-white">Privacy</a>
          <a href="#" className="transition hover:text-white">Contact</a>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2">
            <Sparkles className="h-4 w-4 text-[#3d8bff]" />
            Curated for premium streaming
          </div>
        </div>
      </div>
    </footer>
  );
};
