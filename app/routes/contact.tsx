import { MoveLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function Contact() {
    return (
        <div className="min-h-screen bg-[#131313] px-6 py-16 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
                    <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
                        Contact us
                    </p>
                    <h1 className="mb-4 text-3xl font-semibold sm:text-4xl">
                        Let’s talk about your next favorite movie
                    </h1>
                    <p className="mb-6 text-sm leading-7 text-[#e5e2e1]/80">
                        Have questions, feedback, or a suggestion for our movie discovery
                        app? Reach out and we will be happy to help.
                    </p>

                    <div className="space-y-4 text-sm text-[#e5e2e1]/80">
                        <div>
                            <h2 className="mb-1 font-medium text-white">Email</h2>
                            <p>support@themoviedb.com</p>
                        </div>
                        <div>
                            <h2 className="mb-1 font-medium text-white">Phone</h2>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div>
                            <h2 className="mb-1 font-medium text-white">Location</h2>
                            <p>Remote • Available worldwide</p>
                        </div>
                    </div>
                </div>


            </div>
            <Link to="/">
                <Button
                    className={`text-black text-lg font-medium flex items-center justify-evenly border border-black/10 px-5 py-2.5 cursor-pointer absolute bottom-1 right-2`}
                >
                    <MoveLeft className="size-6" /> Back
                </Button>
            </Link>
        </div>
    );
}
