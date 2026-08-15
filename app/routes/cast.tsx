import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API_KEY from "~/constantKey";
import type { CastMember } from "~/types/movie.types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Cast() {
    const { id } = useParams()
    const [credits, setCredits] = useState<{ cast?: CastMember[] } | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const [creditsResponse] =
                    await Promise.all([

                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
                        ),

                    ]);

                const [creditsData] = await Promise.all([
                    creditsResponse.json() as Promise<{ cast?: CastMember[] }>,
                ]);

                setCredits(creditsData);
                console.log(
                    "data by it type---->>>>",
                    creditsData,
                );
            } catch (error) {
                error;
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    return (
        <div className="h-screen">
            {/* <h1>Hello</h1> */}
            <div className="flex-col md:grid md:grid-cols-2 bg-amber-700 lg:grid-cols-3 gap-2">
                {credits?.cast?.map((person) => (
                    <div className="bg-accent rounded-sm border border-white/50 p-2 flex flex-row items-center justify-start gap-2">
                        <img
                            src={
                                `${IMAGE_BASE_URL}${person.profile_path}`
                                    ? `${IMAGE_BASE_URL}${person.profile_path}`
                                    : `${person.name?.charAt(0) || "A"}`
                            }
                            className="flex h-10 w-10 overflow-hidden rounded-sm"
                        />
                        <div className="flex-1 justify-start pr-2">
                            <h3
                                className={`font-medium text-lg text-white ${person.name?.length > 5 ? "text-wrap" : "line-clamp-1"}`}
                            >
                                {person.name}
                            </h3>
                            <p className="text-sm text-white/60 truncate">
                                {person.character || "Cast member"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
