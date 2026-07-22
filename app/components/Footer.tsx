import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#131313] px-[5vw] py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <div className="font-[Libre Caslon Text] text-2xl text-white">
            CinéNoir
          </div>
          <p className="text-sm text-[#e5e2e1]/70">
            © 2024 CINÉNOIR STUDIOS. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div>
          <ol className="flex items-center justify-evenly gap-8 ">
            <Link to="/terms">
              <li className="text-sm text-[#e5e2e1]/60 hover:text-white cursor-pointer">
                Terms of Service
              </li>
            </Link>
            <Link to="/privacyPolicy">
              <li className="text-sm text-[#e5e2e1]/60 hover:text-white cursor-pointer">
                Privacy Policy
              </li>
            </Link>
            <Link to="/contact">
              <li className="text-sm text-[#e5e2e1]/60 hover:text-white cursor-pointer">
                Contact
              </li>
            </Link>
          </ol>
        </div>

        <div className="flex justify-center gap-6 text-[#e5e2e1]/60">
          <Link to="https://github.com/manasjha1">
            <span className="material-symbols-outlined hover:text-white transition-colors cursor-pointer">
              <Github />
            </span>
          </Link>
          <Link to="https://www.linkedin.com/in/manas-jha-0310mk/">
            <span className="material-symbols-outlined hover:text-white transition-colors cursor-pointer">
              <Linkedin />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
