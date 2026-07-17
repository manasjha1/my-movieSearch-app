export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#131313] px-[5vw] py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <div className="font-[Libre Caslon Text] text-2xl text-white">CinéNoir</div>
          <p className="text-sm text-[#e5e2e1]/70">© 2024 CINÉNOIR STUDIOS. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-[#e5e2e1]/60">
          {['Terms of Service', 'Privacy Policy', 'Contact', 'Press Kit'].map((item) => (
            <a key={item} href="#" className="transition hover:text-white">
              {item}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-6 text-[#e5e2e1]/60">
          <span className="material-symbols-outlined hover:text-white transition-colors cursor-pointer">share</span>
          <span className="material-symbols-outlined hover:text-white transition-colors cursor-pointer">language</span>
        </div>
      </div>
    </footer>
  );
};
